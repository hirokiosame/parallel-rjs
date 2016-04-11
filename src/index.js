'use strict';

import 'babel-polyfill';
import 'source-map-support/register';

import cluster from 'cluster';

import readBuildConfig from './utils/readBuildConfig';
import groupModulesByDep from './utils/groupModulesByDep';

import executeBuild from './executeBuild';
import uglifyFile from './uglifyFile';



function forkTask(request){

	let child = cluster.fork()

		// Exit with failure if fork fails minification
		.on('exit', function(exitCode){

			// Propagate errors
			if (exitCode !== 0) {
				// console.log(arguments);
				process.exit(exitCode);
			}

		});

	child.send(request);

	return child;
}

// Forked worker: Wait for minification command
if (cluster.isWorker) {

	process.on('message', function(request){

		if (request.task === 'build') {
			executeBuild(request.config);
		}

		if (request.task === 'uglify2') {
			uglifyFile(request.config);
		}
	});
}

// Master: Parse config and delegate tasks
if (cluster.isMaster) {

	// Read r.js config file
	let	buildConfig = readBuildConfig(process.argv[2]);

	// Multiple outputs
	if (buildConfig.modules instanceof Array) {

		let moduleGroups = groupModulesByDep(buildConfig.modules/*.splice(0, 1)*/);

		for (let moduleGroup of moduleGroups) {

			buildConfig.modules = moduleGroup;

			// Spawn fork and send task
			// Note: Consider only spawning only the number CPU the computer has to reduce intensiveness
			forkTask({
				task: 'build',
				config: buildConfig
			})

			// Uglification request
			.on('message', function(config){

				forkTask({
					task: 'uglify2',
					config
				});
			});
		}
	}

	// Output is a file
	else if (typeof buildConfig.out === 'string') {

		// console.log('1 file case');

	} else {
		throw new Error('Properties \'modules\' or \'out\' not defined in the config file');
	}
}