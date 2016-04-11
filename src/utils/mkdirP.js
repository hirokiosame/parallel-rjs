'use strict';

import path from 'path';
import fs from 'fs';

export default function mkdirP(offset, dirPath) {

	var dirs = path.dirname(dirPath).split(path.sep),
		dir, built = offset;

	while (dir = dirs.shift()) {
		built = path.join(built, dir);
		try {
			fs.mkdirSync(built);
		} catch(e){
			if (e.code !== 'EEXIST') {
				throw e;
			}
		}
	}
}