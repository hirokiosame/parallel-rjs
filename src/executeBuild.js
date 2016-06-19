'use strict';

import fs from 'fs-extra';
import path from 'path';
import requirejs from 'requirejs';
import { exec } from 'child_process';
import log from './utils/log';


const TMPDIR = process.env.TMPDIR || '/tmp';


function untilN(n, cb) {
	return function() {
		(--n === 0) && cb();
	};
}


export default function executeBuild(buildConfig){

	const buildDir = buildConfig.dir;

	// Not really unique... optimize later
	const tempBuildDir = buildConfig.dir = path.join(TMPDIR, 'rjsBuild' + process.pid.toString(36));

	let startTime = new Date();

	log('Starting build', JSON.stringify(buildConfig.modules, null, 4), 'in', tempBuildDir);

	requirejs.optimize(
		buildConfig,

		function () {

			let elapsedTime = ((new Date()) - startTime) / 1000;

			log(`Successfully built in ${elapsedTime}s`);

			let moved = untilN(buildConfig.modules.length, function cleanUp(){

				// Delete build directory (fs.rmdirSync complains about deleteing a directory with content)
				// let delStart = new Date();
				// console.log('deleting')

				// fs.remove(tempBuildDir, function(err){
				// 	if (err) { log(err); }
				// 	console.log(((new Date()) - delStart)/1000);
				// 	console.log(arguments);
					process.exit(0);
				// });
			});

			// Move built modules to right destination
			for (let module of buildConfig.modules) {

				let buildPath = path.join(tempBuildDir, module.name + '.js');
				let destPath = path.join(buildDir, module.name + '.js');

				// Move to real output dir
				fs.move(buildPath, destPath, function (err) {
					if (err) {
						console.log('move err', err);
						process.exit(1);
					}
					// Signal completion
					process.send({ filePath: destPath });
					moved();
				})
			}
		},

		function (err) {
			console.log('rjs error', err);
			process.exit(1);
		}
	);
}