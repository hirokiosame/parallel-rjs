'use strict';

import 'babel-polyfill';
import 'source-map-support/register';

import { argv } from 'yargs';


import readBuildConfig from './utils/readBuildConfig';
import groupModulesByDep from './utils/groupModulesByDep';
import forkTask from './utils/forkTask';

import log from './utils/log';


import fs from 'fs-extra';
import path from 'path';
import util from 'util';



for (let buildConfigPath of argv._) {

	// Read r.js config file
	let buildConfig = readBuildConfig(buildConfigPath);

	// Unnecessary since we are deleting all non-entry points
	buildConfig.removeCombined = false;

	// Save optimize config and disable rjs so we can handle it
	let optimize = buildConfig.optimize;
	buildConfig.optimize = 'none';


	buildConfigPath = path.dirname(buildConfigPath);

	// Multiple outputs
	if (buildConfig.modules instanceof Array) {

		let moduleGroups = groupModulesByDep(buildConfig.modules);

		for (let moduleGroup of moduleGroups) {

			buildConfig.modules = moduleGroup;

			// Spawn fork and send task
			// Note: Consider only spawning only the number CPU the computer has to reduce intensiveness
			forkTask({
				task: 'build',
				cwd: buildConfigPath,
				config: buildConfig
			})

			// Completion
			.on('message', function(config){

				console.log('completed!', config, argv.optimize, optimize)
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

		forkTask({
			task: 'build',
			cwd: buildConfigPath,
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


	} else {
		throw new Error('Properties \'modules\' or \'out\' not defined in the config file');
	}
}