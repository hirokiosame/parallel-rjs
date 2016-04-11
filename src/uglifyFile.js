'use strict';

import fs from 'fs';
import uglifyjs from 'uglify-js';

export default function uglifyFile(request) {

	let { filePath, config } = request;

	// Log which file it's minifying
	console.log('Uglifying', filePath);

	// Minify
	try {
		fs.writeFileSync(filePath, uglifyjs.minify(filePath, config).code);
	}

	catch (e) {

		// Log error
		console.error('Error minifying:', filePath);
		console.error(e);

		// Exit with failure
		process.exit(1);
	}

	finally {
		process.exit(0);
	}
}