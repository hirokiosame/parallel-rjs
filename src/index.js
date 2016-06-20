'use strict';

import 'source-map-support/register';
import 'babel-polyfill';

import { argv } from 'yargs';
import path from 'path';
import readBuildConfig from './utils/readBuildConfig';
import groupModulesByDep from './utils/groupModulesByDep';
import spawnBuild from './utils/spawnBuild';


for (let buildConfigPath of argv._) {

	let workingDir = path.dirname(buildConfigPath);

	// Read r.js config file
	let buildConfig = readBuildConfig(buildConfigPath);

	// Unnecessary since we are deleting all non-entry points
	buildConfig.removeCombined = false;

	// Save optimize config and disable rjs so we can handle it
	let optimizeConfig = (argv.optimize || buildConfig.optimize) === 'uglify2';
	buildConfig.optimize = 'none';


	// Multiple outputs
	if (buildConfig.modules instanceof Array) {

		let moduleGroups = groupModulesByDep(buildConfig.modules);

		for (let moduleGroup of moduleGroups) {

			buildConfig.modules = moduleGroup;

			spawnBuild(workingDir, buildConfig, optimizeConfig);
		}
	}

	// Output is a file
	else if (typeof buildConfig.out === 'string') {

		spawnBuild(workingDir, buildConfig, optimizeConfig);

	} else {
		throw new Error('Properties \'modules\' or \'out\' not defined in the config file');
	}
}
