'use strict';

import child_process from 'child_process';
import log from './log';

let workers = new Set();
let instances = 0;

function forkTask (request){

	let worker = child_process.fork(__dirname + '/../Worker.js')

		// Exit with failure if fork fails minification
		.on('exit', function(exitCode){

			// Propagate errors
			if (exitCode !== 0) {
				// console.log(arguments);
				process.exit(exitCode);
			}

			workers.delete(this);

			let completed = instances - workers.size;
			let percent = ~~(completed/instances * 100);

			log(`Completed ${completed}/${instances} (${percent}%) Remaining Workers: [${Array.from(workers).map(w => w.pid)}]\n`);
		});

	instances++;

	workers.add(worker);

	worker.send(request);

	return worker;
}

function spawnUglification (buildConfig, config) {

	return forkTask({
		task: 'uglify2',
		config: {
			filePath: config.filePath,
			config: buildConfig.uglify2
		}
	});
}

export default function spawnBuild (cwd, buildConfig, optimize) {

	let worker = forkTask({
		task: 'build',
		cwd,
		buildConfig
	});

	if (optimize) {
		worker.on('message', spawnUglification.bind(this, buildConfig));
	}

	return worker;
}
