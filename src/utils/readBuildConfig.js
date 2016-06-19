'use strict';

import fs from 'fs';
import path from 'path';

export default function readBuildConfig(buildConfigPath) {

	if (!buildConfigPath) {
		throw new Error('build-config.js for r.js not specififed!');
	}

	return eval(fs.readFileSync(path.resolve(process.cwd(), buildConfigPath)).toString());
}
