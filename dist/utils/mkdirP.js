'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = mkdirP;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mkdirP(offset, dirPath) {

	var dirs = _path2.default.dirname(dirPath).split(_path2.default.sep),
	    dir,
	    built = offset;

	while (dir = dirs.shift()) {
		built = _path2.default.join(built, dir);
		try {
			_fs2.default.mkdirSync(built);
		} catch (e) {
			if (e.code !== 'EEXIST') {
				throw e;
			}
		}
	}
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9ta2RpclAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O2tCQUt3Qjs7QUFIeEI7Ozs7QUFDQTs7Ozs7O0FBRWUsU0FBUyxNQUFULENBQWdCLE1BQWhCLEVBQXdCLE9BQXhCLEVBQWlDOztBQUUvQyxLQUFJLE9BQU8sZUFBSyxPQUFMLENBQWEsT0FBYixFQUFzQixLQUF0QixDQUE0QixlQUFLLEdBQUwsQ0FBbkM7S0FDSCxHQUREO0tBQ00sUUFBUSxNQUFSLENBSHlDOztBQUsvQyxRQUFPLE1BQU0sS0FBSyxLQUFMLEVBQU4sRUFBb0I7QUFDMUIsVUFBUSxlQUFLLElBQUwsQ0FBVSxLQUFWLEVBQWlCLEdBQWpCLENBQVIsQ0FEMEI7QUFFMUIsTUFBSTtBQUNILGdCQUFHLFNBQUgsQ0FBYSxLQUFiLEVBREc7R0FBSixDQUVFLE9BQU0sQ0FBTixFQUFRO0FBQ1QsT0FBSSxFQUFFLElBQUYsS0FBVyxRQUFYLEVBQXFCO0FBQ3hCLFVBQU0sQ0FBTixDQUR3QjtJQUF6QjtHQURDO0VBSkg7Q0FMYyIsImZpbGUiOiJta2RpclAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWtkaXJQKG9mZnNldCwgZGlyUGF0aCkge1xuXG5cdHZhciBkaXJzID0gcGF0aC5kaXJuYW1lKGRpclBhdGgpLnNwbGl0KHBhdGguc2VwKSxcblx0XHRkaXIsIGJ1aWx0ID0gb2Zmc2V0O1xuXG5cdHdoaWxlIChkaXIgPSBkaXJzLnNoaWZ0KCkpIHtcblx0XHRidWlsdCA9IHBhdGguam9pbihidWlsdCwgZGlyKTtcblx0XHR0cnkge1xuXHRcdFx0ZnMubWtkaXJTeW5jKGJ1aWx0KTtcblx0XHR9IGNhdGNoKGUpe1xuXHRcdFx0aWYgKGUuY29kZSAhPT0gJ0VFWElTVCcpIHtcblx0XHRcdFx0dGhyb3cgZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0iXX0=