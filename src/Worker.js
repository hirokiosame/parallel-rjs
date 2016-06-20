'use strict';

import 'source-map-support/register';
import 'babel-polyfill';

import log from './utils/log';
import executeBuild from './executeBuild';
import uglifyFile from './uglifyFile';

// Forked worker: Wait for minification command
process.on('message', function(request){

	if (request.task === 'build') {
		log('Spawned r.js builder');
		executeBuild(request.cwd, request.buildConfig);
	}

	if (request.task === 'uglify2') {
		log('Spawned uglifier');
		uglifyFile(request.config);
	}
});
