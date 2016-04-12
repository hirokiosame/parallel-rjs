'use strict';

import fs from 'fs';
import uglifyjs from 'uglify-js';
import log from './utils/log';

export default function uglifyFile(request) {

	let { filePath, config } = request;

	// Log which file it's minifying
	log('Uglifying', filePath);

	// Minify
	try {
		fs.writeFileSync(filePath, uglifyjs.minify(filePath, config).code);
	}

	catch (e) {

		// Log error
		log('Error uglifying:', filePath, e);

		// Exit with failure
		process.exit(1);
	}

	finally {
		process.exit(0);
	}
}