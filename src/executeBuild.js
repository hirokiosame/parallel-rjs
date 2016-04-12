'use strict';

import fs from 'fs';
import path from 'path';
import requirejs from 'requirejs';
import mkdirP from './utils/mkdirP';
import { exec } from 'child_process';
import log from './utils/log';


const TMPDIR = process.env.TMPDIR || '/tmp';


function untilN(n, cb) {
	return function() {
		(--n === 0) && cb();
	};
}


export default function executeBuild(buildConfig){

	// Not really unique... optimize later
	const	buildDir = buildConfig.dir,
			tempBuildDir = buildConfig.dir = path.join(TMPDIR, 'rjsBuild' + process.pid.toString(36));


	// Make output directories
	buildConfig.modules.forEach(module => mkdirP(buildDir, module.name));

	let optimize = buildConfig.optimize;
	buildConfig.optimize = 'none';


	let startTime = new Date();

	log('Starting build', JSON.stringify(buildConfig.modules, null, 4), 'in', tempBuildDir);

	requirejs.optimize(
		buildConfig,

		function (){

			let elapsedTime = ((new Date()) - startTime) / 1000;

			log(`Successfully built in ${elapsedTime}s`);

			let moved = untilN(buildConfig.modules.length, function cleanUp(){

				// Delete build directory (fs.rmdirSync complains about deleteing a directory with content)
				exec('rm -rf ' + tempBuildDir, function(err){
					if (err) { log(err); }

					process.exit(0);
				});
			});


			// Move built modules to right destination
			for (let module of buildConfig.modules) {

				let buildPath = path.join(tempBuildDir, module.name + '.js');
				let destPath = path.join(buildDir, module.name + '.js');

				// Move to real output dir
				// fs.renameSync(buildPath, destPath); - makes the syscall 'rename'
				// Caused issues: Error: EXDEV, cross-device link not permitted '/tmp/tmp.Fsi71cf/rjsBuildcnjf/test.js'

				exec(`mv ${buildPath} ${destPath}`, function(err){

					if (err) { throw log(err); }

					if (optimize === 'uglify2') {
						process.send({
							filePath: destPath,
							config: buildConfig.uglify2
						});
					}

					moved();
				});
			}
		},

		(err => { throw err; })
	);
}