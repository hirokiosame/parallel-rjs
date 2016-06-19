'use strict';

// import 'babel-polyfill';
import 'source-map-support/register';

import { argv } from 'yargs';


import readBuildConfig from './utils/readBuildConfig';
import groupModulesByDep from './utils/groupModulesByDep';
import forkTask from './utils/forkTask';

import log from './utils/log';


import fs from 'fs-extra';
import path from 'path';

// Read r.js config file
let	buildConfig = readBuildConfig(argv._[0]);

// Unnecessary since we are deleting all non-entry points
buildConfig.removeCombined = false;

// Save optimize config and disable rjs so we can handle it
let optimize = buildConfig.optimize;
buildConfig.optimize = 'none';

// Create dest folder
fs.mkdirsSync(path.resolve(process.cwd(), buildConfig.dir));

// Multiple outputs
if (buildConfig.modules instanceof Array) {

	let moduleGroups = groupModulesByDep(buildConfig.modules);

	for (let moduleGroup of moduleGroups) {

		buildConfig.modules = moduleGroup;

		// Spawn fork and send task
		// Note: Consider only spawning only the number CPU the computer has to reduce intensiveness
		forkTask({
			task: 'build',
			config: buildConfig
		})

		// Completion
		.on('message', function(config){

			if ((argv.optimize || optimize) === 'uglify2') {

				forkTask({
					task: 'uglify2',
					config: {
						filePath: config.filePath,
						config: buildConfig.uglify2
					}
				});
			}
		});
	}
}

// Output is a file
else if (typeof buildConfig.out === 'string') {

	// console.log('1 file case');

} else {
	throw new Error('Properties \'modules\' or \'out\' not defined in the config file');
}

