'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = mkdirP;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mkdirP(offset, dirPath) {

	var dirs = _path2.default.dirname(dirPath).split(_path2.default.sep),
	    dir = void 0,
	    built = offset;

	if (_path2.default.extname(dirPath) === '') {
		dirs.push(_path2.default.basename(dirPath));
	}

	while (dir = dirs.shift()) {
		built = _path2.default.join(built, dir);
		try {
			_fs2.default.mkdirSync(built);
		} catch (e) {
			if (e.code !== 'EEXIST') {
				(0, _log2.default)('Failed mkdir(\'' + built + '\')');
				throw e;
			}
		}
	}
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9ta2RpclAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O2tCQU13QixNOztBQUp4Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVlLFNBQVMsTUFBVCxDQUFnQixNQUFoQixFQUF3QixPQUF4QixFQUFpQzs7QUFFL0MsS0FBSSxPQUFPLGVBQUssT0FBTCxDQUFhLE9BQWIsRUFBc0IsS0FBdEIsQ0FBNEIsZUFBSyxHQUFqQyxDQUFYO0FBQUEsS0FDQyxZQUREO0FBQUEsS0FDTSxRQUFRLE1BRGQ7O0FBR0EsS0FBSSxlQUFLLE9BQUwsQ0FBYSxPQUFiLE1BQTBCLEVBQTlCLEVBQWtDO0FBQ2pDLE9BQUssSUFBTCxDQUFVLGVBQUssUUFBTCxDQUFjLE9BQWQsQ0FBVjtBQUNBOztBQUVELFFBQU8sTUFBTSxLQUFLLEtBQUwsRUFBYixFQUEyQjtBQUMxQixVQUFRLGVBQUssSUFBTCxDQUFVLEtBQVYsRUFBaUIsR0FBakIsQ0FBUjtBQUNBLE1BQUk7QUFDSCxnQkFBRyxTQUFILENBQWEsS0FBYjtBQUNBLEdBRkQsQ0FFRSxPQUFNLENBQU4sRUFBUTtBQUNULE9BQUksRUFBRSxJQUFGLEtBQVcsUUFBZixFQUF5QjtBQUN4QiwyQ0FBcUIsS0FBckI7QUFDQSxVQUFNLENBQU47QUFDQTtBQUNEO0FBQ0Q7QUFDRCIsImZpbGUiOiJta2RpclAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2cnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBta2RpclAob2Zmc2V0LCBkaXJQYXRoKSB7XG5cblx0bGV0IGRpcnMgPSBwYXRoLmRpcm5hbWUoZGlyUGF0aCkuc3BsaXQocGF0aC5zZXApLFxuXHRcdGRpciwgYnVpbHQgPSBvZmZzZXQ7XG5cblx0aWYgKHBhdGguZXh0bmFtZShkaXJQYXRoKSA9PT0gJycpIHtcblx0XHRkaXJzLnB1c2gocGF0aC5iYXNlbmFtZShkaXJQYXRoKSk7XG5cdH1cblxuXHR3aGlsZSAoZGlyID0gZGlycy5zaGlmdCgpKSB7XG5cdFx0YnVpbHQgPSBwYXRoLmpvaW4oYnVpbHQsIGRpcik7XG5cdFx0dHJ5IHtcblx0XHRcdGZzLm1rZGlyU3luYyhidWlsdCk7XG5cdFx0fSBjYXRjaChlKXtcblx0XHRcdGlmIChlLmNvZGUgIT09ICdFRVhJU1QnKSB7XG5cdFx0XHRcdGxvZyhgRmFpbGVkIG1rZGlyKCcke2J1aWx0fScpYCk7XG5cdFx0XHRcdHRocm93IGU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG4iXX0=