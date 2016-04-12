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

var _log = require('./utils/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TMPDIR = process.env.TMPDIR || '/tmp';

function untilN(n, cb) {
	return function () {
		--n === 0 && cb();
	};
}

function executeBuild(buildConfig) {

	// Not really unique... optimize later
	var buildDir = buildConfig.dir,
	    tempBuildDir = buildConfig.dir = _path2.default.join(TMPDIR, 'rjsBuild' + process.pid.toString(36));

	// Make output directories
	buildConfig.modules.forEach(function (module) {
		return (0, _mkdirP2.default)(buildDir, module.name);
	});

	var optimize = buildConfig.optimize;
	buildConfig.optimize = 'none';

	var startTime = new Date();

	(0, _log2.default)('Starting build', JSON.stringify(buildConfig.modules, null, 4), 'in', tempBuildDir);

	_requirejs2.default.optimize(buildConfig, function () {

		var elapsedTime = (new Date() - startTime) / 1000;

		(0, _log2.default)('Successfully built in ' + elapsedTime + 's');

		var moved = untilN(buildConfig.modules.length, function cleanUp() {

			// Delete build directory (fs.rmdirSync complains about deleteing a directory with content)
			(0, _child_process.exec)('rm -rf ' + tempBuildDir, function (err) {
				if (err) {
					(0, _log2.default)(err);
				}

				process.exit(0);
			});
		});

		// Move built modules to right destination
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			var _loop = function _loop() {
				var module = _step.value;


				var buildPath = _path2.default.join(tempBuildDir, module.name + '.js');
				var destPath = _path2.default.join(buildDir, module.name + '.js');

				// Move to real output dir
				// fs.renameSync(buildPath, destPath); - makes the syscall 'rename'
				// Caused issues: Error: EXDEV, cross-device link not permitted '/tmp/tmp.Fsi71cf/rjsBuildcnjf/test.js'

				(0, _child_process.exec)('mv ' + buildPath + ' ' + destPath, function (err) {

					if (err) {
						throw (0, _log2.default)(err);
					}

					if (optimize === 'uglify2') {
						process.send({
							filePath: destPath,
							config: buildConfig.uglify2
						});
					}

					moved();
				});
			};

			for (var _iterator = buildConfig.modules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				_loop();
			}
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
	}, function (err) {
		throw err;
	});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leGVjdXRlQnVpbGQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O2tCQW9Cd0I7O0FBbEJ4Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7QUFHQSxJQUFNLFNBQVMsUUFBUSxHQUFSLENBQVksTUFBWixJQUFzQixNQUF0Qjs7QUFHZixTQUFTLE1BQVQsQ0FBZ0IsQ0FBaEIsRUFBbUIsRUFBbkIsRUFBdUI7QUFDdEIsUUFBTyxZQUFXO0FBQ2pCLElBQUcsQ0FBRixLQUFRLENBQVIsSUFBYyxJQUFmLENBRGlCO0VBQVgsQ0FEZTtDQUF2Qjs7QUFPZSxTQUFTLFlBQVQsQ0FBc0IsV0FBdEIsRUFBa0M7OztBQUdoRCxLQUFNLFdBQVcsWUFBWSxHQUFaO0tBQ2YsZUFBZSxZQUFZLEdBQVosR0FBa0IsZUFBSyxJQUFMLENBQVUsTUFBVixFQUFrQixhQUFhLFFBQVEsR0FBUixDQUFZLFFBQVosQ0FBcUIsRUFBckIsQ0FBYixDQUFwQzs7O0FBSitCLFlBUWhELENBQVksT0FBWixDQUFvQixPQUFwQixDQUE0QjtTQUFVLHNCQUFPLFFBQVAsRUFBaUIsT0FBTyxJQUFQO0VBQTNCLENBQTVCLENBUmdEOztBQVVoRCxLQUFJLFdBQVcsWUFBWSxRQUFaLENBVmlDO0FBV2hELGFBQVksUUFBWixHQUF1QixNQUF2QixDQVhnRDs7QUFjaEQsS0FBSSxZQUFZLElBQUksSUFBSixFQUFaLENBZDRDOztBQWdCaEQsb0JBQUksZ0JBQUosRUFBc0IsS0FBSyxTQUFMLENBQWUsWUFBWSxPQUFaLEVBQXFCLElBQXBDLEVBQTBDLENBQTFDLENBQXRCLEVBQW9FLElBQXBFLEVBQTBFLFlBQTFFLEVBaEJnRDs7QUFrQmhELHFCQUFVLFFBQVYsQ0FDQyxXQURELEVBR0MsWUFBVzs7QUFFVixNQUFJLGNBQWMsQ0FBQyxJQUFLLElBQUosRUFBRCxHQUFlLFNBQWYsQ0FBRCxHQUE2QixJQUE3QixDQUZSOztBQUlWLGdEQUE2QixpQkFBN0IsRUFKVTs7QUFNVixNQUFJLFFBQVEsT0FBTyxZQUFZLE9BQVosQ0FBb0IsTUFBcEIsRUFBNEIsU0FBUyxPQUFULEdBQWtCOzs7QUFHaEUsNEJBQUssWUFBWSxZQUFaLEVBQTBCLFVBQVMsR0FBVCxFQUFhO0FBQzNDLFFBQUksR0FBSixFQUFTO0FBQUUsd0JBQUksR0FBSixFQUFGO0tBQVQ7O0FBRUEsWUFBUSxJQUFSLENBQWEsQ0FBYixFQUgyQztJQUFiLENBQS9CLENBSGdFO0dBQWxCLENBQTNDOzs7QUFOTTs7Ozs7O1FBa0JEOzs7QUFFUixRQUFJLFlBQVksZUFBSyxJQUFMLENBQVUsWUFBVixFQUF3QixPQUFPLElBQVAsR0FBYyxLQUFkLENBQXBDO0FBQ0osUUFBSSxXQUFXLGVBQUssSUFBTCxDQUFVLFFBQVYsRUFBb0IsT0FBTyxJQUFQLEdBQWMsS0FBZCxDQUEvQjs7Ozs7O0FBTUoscUNBQVcsa0JBQWEsUUFBeEIsRUFBb0MsVUFBUyxHQUFULEVBQWE7O0FBRWhELFNBQUksR0FBSixFQUFTO0FBQUUsWUFBTSxtQkFBSSxHQUFKLENBQU4sQ0FBRjtNQUFUOztBQUVBLFNBQUksYUFBYSxTQUFiLEVBQXdCO0FBQzNCLGNBQVEsSUFBUixDQUFhO0FBQ1osaUJBQVUsUUFBVjtBQUNBLGVBQVEsWUFBWSxPQUFaO09BRlQsRUFEMkI7TUFBNUI7O0FBT0EsYUFYZ0Q7S0FBYixDQUFwQzs7O0FBVEQsd0JBQW1CLFlBQVksT0FBWiwwQkFBbkIsb0dBQXdDOztJQUF4Qzs7Ozs7Ozs7Ozs7Ozs7R0FsQlU7RUFBWCxFQTJDQyxlQUFPO0FBQUUsUUFBTSxHQUFOLENBQUY7RUFBUCxDQTlDRixDQWxCZ0Q7Q0FBbEMiLCJmaWxlIjoiZXhlY3V0ZUJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgcmVxdWlyZWpzIGZyb20gJ3JlcXVpcmVqcyc7XG5pbXBvcnQgbWtkaXJQIGZyb20gJy4vdXRpbHMvbWtkaXJQJztcbmltcG9ydCB7IGV4ZWMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCBsb2cgZnJvbSAnLi91dGlscy9sb2cnO1xuXG5cbmNvbnN0IFRNUERJUiA9IHByb2Nlc3MuZW52LlRNUERJUiB8fCAnL3RtcCc7XG5cblxuZnVuY3Rpb24gdW50aWxOKG4sIGNiKSB7XG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHQoLS1uID09PSAwKSAmJiBjYigpO1xuXHR9O1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4ZWN1dGVCdWlsZChidWlsZENvbmZpZyl7XG5cblx0Ly8gTm90IHJlYWxseSB1bmlxdWUuLi4gb3B0aW1pemUgbGF0ZXJcblx0Y29uc3RcdGJ1aWxkRGlyID0gYnVpbGRDb25maWcuZGlyLFxuXHRcdFx0dGVtcEJ1aWxkRGlyID0gYnVpbGRDb25maWcuZGlyID0gcGF0aC5qb2luKFRNUERJUiwgJ3Jqc0J1aWxkJyArIHByb2Nlc3MucGlkLnRvU3RyaW5nKDM2KSk7XG5cblxuXHQvLyBNYWtlIG91dHB1dCBkaXJlY3Rvcmllc1xuXHRidWlsZENvbmZpZy5tb2R1bGVzLmZvckVhY2gobW9kdWxlID0+IG1rZGlyUChidWlsZERpciwgbW9kdWxlLm5hbWUpKTtcblxuXHRsZXQgb3B0aW1pemUgPSBidWlsZENvbmZpZy5vcHRpbWl6ZTtcblx0YnVpbGRDb25maWcub3B0aW1pemUgPSAnbm9uZSc7XG5cblxuXHRsZXQgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcblxuXHRsb2coJ1N0YXJ0aW5nIGJ1aWxkJywgSlNPTi5zdHJpbmdpZnkoYnVpbGRDb25maWcubW9kdWxlcywgbnVsbCwgNCksICdpbicsIHRlbXBCdWlsZERpcik7XG5cblx0cmVxdWlyZWpzLm9wdGltaXplKFxuXHRcdGJ1aWxkQ29uZmlnLFxuXG5cdFx0ZnVuY3Rpb24gKCl7XG5cblx0XHRcdGxldCBlbGFwc2VkVGltZSA9ICgobmV3IERhdGUoKSkgLSBzdGFydFRpbWUpIC8gMTAwMDtcblxuXHRcdFx0bG9nKGBTdWNjZXNzZnVsbHkgYnVpbHQgaW4gJHtlbGFwc2VkVGltZX1zYCk7XG5cblx0XHRcdGxldCBtb3ZlZCA9IHVudGlsTihidWlsZENvbmZpZy5tb2R1bGVzLmxlbmd0aCwgZnVuY3Rpb24gY2xlYW5VcCgpe1xuXG5cdFx0XHRcdC8vIERlbGV0ZSBidWlsZCBkaXJlY3RvcnkgKGZzLnJtZGlyU3luYyBjb21wbGFpbnMgYWJvdXQgZGVsZXRlaW5nIGEgZGlyZWN0b3J5IHdpdGggY29udGVudClcblx0XHRcdFx0ZXhlYygncm0gLXJmICcgKyB0ZW1wQnVpbGREaXIsIGZ1bmN0aW9uKGVycil7XG5cdFx0XHRcdFx0aWYgKGVycikgeyBsb2coZXJyKTsgfVxuXG5cdFx0XHRcdFx0cHJvY2Vzcy5leGl0KDApO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cblx0XHRcdC8vIE1vdmUgYnVpbHQgbW9kdWxlcyB0byByaWdodCBkZXN0aW5hdGlvblxuXHRcdFx0Zm9yIChsZXQgbW9kdWxlIG9mIGJ1aWxkQ29uZmlnLm1vZHVsZXMpIHtcblxuXHRcdFx0XHRsZXQgYnVpbGRQYXRoID0gcGF0aC5qb2luKHRlbXBCdWlsZERpciwgbW9kdWxlLm5hbWUgKyAnLmpzJyk7XG5cdFx0XHRcdGxldCBkZXN0UGF0aCA9IHBhdGguam9pbihidWlsZERpciwgbW9kdWxlLm5hbWUgKyAnLmpzJyk7XG5cblx0XHRcdFx0Ly8gTW92ZSB0byByZWFsIG91dHB1dCBkaXJcblx0XHRcdFx0Ly8gZnMucmVuYW1lU3luYyhidWlsZFBhdGgsIGRlc3RQYXRoKTsgLSBtYWtlcyB0aGUgc3lzY2FsbCAncmVuYW1lJ1xuXHRcdFx0XHQvLyBDYXVzZWQgaXNzdWVzOiBFcnJvcjogRVhERVYsIGNyb3NzLWRldmljZSBsaW5rIG5vdCBwZXJtaXR0ZWQgJy90bXAvdG1wLkZzaTcxY2YvcmpzQnVpbGRjbmpmL3Rlc3QuanMnXG5cblx0XHRcdFx0ZXhlYyhgbXYgJHtidWlsZFBhdGh9ICR7ZGVzdFBhdGh9YCwgZnVuY3Rpb24oZXJyKXtcblxuXHRcdFx0XHRcdGlmIChlcnIpIHsgdGhyb3cgbG9nKGVycik7IH1cblxuXHRcdFx0XHRcdGlmIChvcHRpbWl6ZSA9PT0gJ3VnbGlmeTInKSB7XG5cdFx0XHRcdFx0XHRwcm9jZXNzLnNlbmQoe1xuXHRcdFx0XHRcdFx0XHRmaWxlUGF0aDogZGVzdFBhdGgsXG5cdFx0XHRcdFx0XHRcdGNvbmZpZzogYnVpbGRDb25maWcudWdsaWZ5MlxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0bW92ZWQoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdChlcnIgPT4geyB0aHJvdyBlcnI7IH0pXG5cdCk7XG59Il19