'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = executeBuild;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _requirejs = require('requirejs');

var _requirejs2 = _interopRequireDefault(_requirejs);

var _mkdirP = require('./utils/mkdirP');

var _mkdirP2 = _interopRequireDefault(_mkdirP);

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TMPDIR = process.env.TMPDIR;

function executeBuild(buildConfig) {

	var buildID = (~ ~(Math.random() * 1000000000)).toString(36);

	// Not really unique... optimize later
	var buildDir = buildConfig.dir,
	    tempBuildDir = buildConfig.dir = _path2.default.join(TMPDIR, 'rjsBuild' + buildID);

	// Make output directories
	buildConfig.modules.forEach(function (module) {
		return (0, _mkdirP2.default)(buildDir, module.name);
	});

	var optimize = buildConfig.optimize;
	buildConfig.optimize = 'none';

	_requirejs2.default.optimize(buildConfig, function () {

		// Move built modules to right destination
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = buildConfig.modules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var module = _step.value;


				var buildPath = _path2.default.join(tempBuildDir, module.name + '.js');
				var destPath = _path2.default.join(buildDir, module.name + '.js');

				// Move to real output dir
				_fs2.default.renameSync(buildPath, destPath);

				if (optimize === 'uglify2') {
					process.send({
						filePath: destPath,
						config: buildConfig.uglify2
					});
				}
			}

			// Delete build directory (fs.rmdirSync complains about deleteing a directory with content)
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		(0, _child_process.exec)('rm -rf ' + tempBuildDir, function (err) {
			if (err) {
				console.error(err);
			}
			process.exit(0);
		});
	}, function (err) {
		throw err;
	});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leGVjdXRlQnVpbGQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O2tCQVd3Qjs7QUFUeEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBLElBQU0sU0FBUyxRQUFRLEdBQVIsQ0FBWSxNQUFaOztBQUVBLFNBQVMsWUFBVCxDQUFzQixXQUF0QixFQUFrQzs7QUFFaEQsS0FBTSxVQUFVLENBQUMsRUFBQyxFQUFFLEtBQUssTUFBTCxLQUFnQixVQUFoQixDQUFGLENBQUYsQ0FBaUMsUUFBakMsQ0FBMEMsRUFBMUMsQ0FBVjs7O0FBRjBDLEtBSzFDLFdBQVcsWUFBWSxHQUFaO0tBQ2YsZUFBZSxZQUFZLEdBQVosR0FBa0IsZUFBSyxJQUFMLENBQVUsTUFBVixFQUFrQixhQUFhLE9BQWIsQ0FBcEM7OztBQU4rQixZQVVoRCxDQUFZLE9BQVosQ0FBb0IsT0FBcEIsQ0FBNEI7U0FBVSxzQkFBTyxRQUFQLEVBQWlCLE9BQU8sSUFBUDtFQUEzQixDQUE1QixDQVZnRDs7QUFZaEQsS0FBSSxXQUFXLFlBQVksUUFBWixDQVppQztBQWFoRCxhQUFZLFFBQVosR0FBdUIsTUFBdkIsQ0FiZ0Q7O0FBZ0JoRCxxQkFBVSxRQUFWLENBQ0MsV0FERCxFQUdDLFlBQVc7Ozs7Ozs7O0FBR1Ysd0JBQW1CLFlBQVksT0FBWiwwQkFBbkIsb0dBQXdDO1FBQS9CLHFCQUErQjs7O0FBRXZDLFFBQUksWUFBWSxlQUFLLElBQUwsQ0FBVSxZQUFWLEVBQXdCLE9BQU8sSUFBUCxHQUFjLEtBQWQsQ0FBcEMsQ0FGbUM7QUFHdkMsUUFBSSxXQUFXLGVBQUssSUFBTCxDQUFVLFFBQVYsRUFBb0IsT0FBTyxJQUFQLEdBQWMsS0FBZCxDQUEvQjs7O0FBSG1DLGdCQU12QyxDQUFHLFVBQUgsQ0FBYyxTQUFkLEVBQXlCLFFBQXpCLEVBTnVDOztBQVF2QyxRQUFJLGFBQWEsU0FBYixFQUF3QjtBQUMzQixhQUFRLElBQVIsQ0FBYTtBQUNaLGdCQUFVLFFBQVY7QUFDQSxjQUFRLFlBQVksT0FBWjtNQUZULEVBRDJCO0tBQTVCO0lBUkQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FIVTs7QUFvQlYsMkJBQUssWUFBWSxZQUFaLEVBQTBCLFVBQVMsR0FBVCxFQUFhO0FBQzNDLE9BQUksR0FBSixFQUFTO0FBQ1IsWUFBUSxLQUFSLENBQWMsR0FBZCxFQURRO0lBQVQ7QUFHQSxXQUFRLElBQVIsQ0FBYSxDQUFiLEVBSjJDO0dBQWIsQ0FBL0IsQ0FwQlU7RUFBWCxFQTZCQyxlQUFPO0FBQUUsUUFBTSxHQUFOLENBQUY7RUFBUCxDQWhDRixDQWhCZ0Q7Q0FBbEMiLCJmaWxlIjoiZXhlY3V0ZUJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgcmVxdWlyZWpzIGZyb20gJ3JlcXVpcmVqcyc7XG5pbXBvcnQgbWtkaXJQIGZyb20gJy4vdXRpbHMvbWtkaXJQJztcbmltcG9ydCB7IGV4ZWMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcblxuXG5jb25zdCBUTVBESVIgPSBwcm9jZXNzLmVudi5UTVBESVI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4ZWN1dGVCdWlsZChidWlsZENvbmZpZyl7XG5cblx0Y29uc3RcdGJ1aWxkSUQgPSAofn4oTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMDApKS50b1N0cmluZygzNik7XG5cblx0Ly8gTm90IHJlYWxseSB1bmlxdWUuLi4gb3B0aW1pemUgbGF0ZXJcblx0Y29uc3RcdGJ1aWxkRGlyID0gYnVpbGRDb25maWcuZGlyLFxuXHRcdFx0dGVtcEJ1aWxkRGlyID0gYnVpbGRDb25maWcuZGlyID0gcGF0aC5qb2luKFRNUERJUiwgJ3Jqc0J1aWxkJyArIGJ1aWxkSUQpO1xuXG5cblx0Ly8gTWFrZSBvdXRwdXQgZGlyZWN0b3JpZXNcblx0YnVpbGRDb25maWcubW9kdWxlcy5mb3JFYWNoKG1vZHVsZSA9PiBta2RpclAoYnVpbGREaXIsIG1vZHVsZS5uYW1lKSk7XG5cblx0bGV0IG9wdGltaXplID0gYnVpbGRDb25maWcub3B0aW1pemU7XG5cdGJ1aWxkQ29uZmlnLm9wdGltaXplID0gJ25vbmUnO1xuXG5cblx0cmVxdWlyZWpzLm9wdGltaXplKFxuXHRcdGJ1aWxkQ29uZmlnLFxuXG5cdFx0ZnVuY3Rpb24gKCl7XG5cblx0XHRcdC8vIE1vdmUgYnVpbHQgbW9kdWxlcyB0byByaWdodCBkZXN0aW5hdGlvblxuXHRcdFx0Zm9yIChsZXQgbW9kdWxlIG9mIGJ1aWxkQ29uZmlnLm1vZHVsZXMpIHtcblxuXHRcdFx0XHRsZXQgYnVpbGRQYXRoID0gcGF0aC5qb2luKHRlbXBCdWlsZERpciwgbW9kdWxlLm5hbWUgKyAnLmpzJyk7XG5cdFx0XHRcdGxldCBkZXN0UGF0aCA9IHBhdGguam9pbihidWlsZERpciwgbW9kdWxlLm5hbWUgKyAnLmpzJyk7XG5cblx0XHRcdFx0Ly8gTW92ZSB0byByZWFsIG91dHB1dCBkaXJcblx0XHRcdFx0ZnMucmVuYW1lU3luYyhidWlsZFBhdGgsIGRlc3RQYXRoKTtcblxuXHRcdFx0XHRpZiAob3B0aW1pemUgPT09ICd1Z2xpZnkyJykge1xuXHRcdFx0XHRcdHByb2Nlc3Muc2VuZCh7XG5cdFx0XHRcdFx0XHRmaWxlUGF0aDogZGVzdFBhdGgsXG5cdFx0XHRcdFx0XHRjb25maWc6IGJ1aWxkQ29uZmlnLnVnbGlmeTJcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBEZWxldGUgYnVpbGQgZGlyZWN0b3J5IChmcy5ybWRpclN5bmMgY29tcGxhaW5zIGFib3V0IGRlbGV0ZWluZyBhIGRpcmVjdG9yeSB3aXRoIGNvbnRlbnQpXG5cdFx0XHRleGVjKCdybSAtcmYgJyArIHRlbXBCdWlsZERpciwgZnVuY3Rpb24oZXJyKXtcblx0XHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRwcm9jZXNzLmV4aXQoMCk7XG5cdFx0XHR9KTtcblxuXHRcdH0sXG5cblx0XHQoZXJyID0+IHsgdGhyb3cgZXJyOyB9KVxuXHQpO1xufSJdfQ==