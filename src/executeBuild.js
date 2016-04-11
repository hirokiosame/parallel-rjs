'use strict';

import fs from 'fs';
import path from 'path';
import requirejs from 'requirejs';
import mkdirP from './utils/mkdirP';
import { exec } from 'child_process';


const TMPDIR = process.env.TMPDIR || '/tmp';

export default function executeBuild(buildConfig){

	const	buildID = (~~(Math.random() * 1000000000)).toString(36);

	// Not really unique... optimize later
	const	buildDir = buildConfig.dir,
			tempBuildDir = buildConfig.dir = path.join(TMPDIR, 'rjsBuild' + buildID);


	// Make output directories
	buildConfig.modules.forEach(module => mkdirP(buildDir, module.name));

	let optimize = buildConfig.optimize;
	buildConfig.optimize = 'none';


	requirejs.optimize(
		buildConfig,

		function (){

			// Move built modules to right destination
			for (let module of buildConfig.modules) {

				let buildPath = path.join(tempBuildDir, module.name + '.js');
				let destPath = path.join(buildDir, module.name + '.js');

				// Move to real output dir
				fs.renameSync(buildPath, destPath);

				if (optimize === 'uglify2') {
					process.send({
						filePath: destPath,
						config: buildConfig.uglify2
					});
				}
			}

			// Delete build directory (fs.rmdirSync complains about deleteing a directory with content)
			exec('rm -rf ' + tempBuildDir, function(err){
				if (err) {
					console.error(err);
				}
				process.exit(0);
			});

		},

		(err => { throw err; })
	);
}