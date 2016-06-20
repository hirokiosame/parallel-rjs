'use strict';

import fs from 'fs-extra';
import path from 'path';
import requirejs from 'requirejs';
import log from './utils/log';


const TMPDIR = process.env.TMPDIR || '/tmp';

function untilN(n, cb) {
	return () => (--n === 0) && cb();
}

export default function executeBuild(cwd, buildConfig){

	process.chdir(cwd);

	let buildPath, finalBuildDir;

	if (buildConfig.dir) {
		finalBuildDir = path.resolve(buildConfig.dir);

		// Not really unique... optimize later
		buildPath = buildConfig.dir = path.join(TMPDIR, 'rjsBuild' + process.pid.toString(36));

		log('Starting build', JSON.stringify(buildConfig.modules, null, 4), 'in', buildPath);
	}

	else if (buildConfig.out) {
		buildPath = path.resolve(buildConfig.out);

		log('Starting build', buildPath);
	}

	let moved = untilN(buildConfig.modules ? buildConfig.modules.length : 1, function cleanUp () {

		// let delStart = new Date();
		// fs.remove(buildPath, function(err){
		// 	if (err) { log(err); }
		// 	console.log(((new Date()) - delStart)/1000);
		// 	console.log(arguments);
			process.exit(0);
		// });
	});

	let startTime = new Date();

	requirejs.optimize(
		buildConfig,

		function () {

			let elapsedTime = ((new Date()) - startTime) / 1000;

			log(`Successfully built in ${elapsedTime}s`);

			if (!finalBuildDir) {

				// Signal completion
				process.send({ filePath: buildPath });

				return moved();
			}

			// Move built modules to right destination
			for (let module of buildConfig.modules) {

				let srcPath = path.join(buildPath, module.name + '.js');
				let destPath = path.join(finalBuildDir, module.name + '.js');

				// Move to real output dir
				fs.move(srcPath, destPath, { clobber: true }, function (err) {
					if (err) {
						console.log('move err', err);
						process.exit(1);
					}

					// Signal completion
					process.send({ filePath: destPath });
					moved();
				});
			}
		},

		function (err) {
			console.log('rjs error', err);
			process.exit(1);
		}
	);
}