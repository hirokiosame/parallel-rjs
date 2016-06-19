'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = executeBuild;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _requirejs = require('requirejs');

var _requirejs2 = _interopRequireDefault(_requirejs);

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

	var buildDir = buildConfig.dir;

	// Not really unique... optimize later
	var tempBuildDir = buildConfig.dir = _path2.default.join(TMPDIR, 'rjsBuild' + process.pid.toString(36));

	var startTime = new Date();

	(0, _log2.default)('Starting build', JSON.stringify(buildConfig.modules, null, 4), 'in', tempBuildDir);

	_requirejs2.default.optimize(buildConfig, function () {

		var elapsedTime = (new Date() - startTime) / 1000;

		(0, _log2.default)('Successfully built in ' + elapsedTime + 's');

		var moved = untilN(buildConfig.modules.length, function cleanUp() {

			// Delete build directory (fs.rmdirSync complains about deleteing a directory with content)
			// let delStart = new Date();
			// console.log('deleting')

			// fs.remove(tempBuildDir, function(err){
			// 	if (err) { log(err); }
			// 	console.log(((new Date()) - delStart)/1000);
			// 	console.log(arguments);
			process.exit(0);
			// });
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
				_fsExtra2.default.move(buildPath, destPath, function (err) {
					if (err) {
						console.log('move err', err);
						process.exit(1);
					}
					// Signal completion
					process.send({ filePath: destPath });
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
		console.log('rjs error', err);
		process.exit(1);
	});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leGVjdXRlQnVpbGQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O2tCQW1Cd0IsWTs7QUFqQnhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7QUFHQSxJQUFNLFNBQVMsUUFBUSxHQUFSLENBQVksTUFBWixJQUFzQixNQUFyQzs7QUFHQSxTQUFTLE1BQVQsQ0FBZ0IsQ0FBaEIsRUFBbUIsRUFBbkIsRUFBdUI7QUFDdEIsUUFBTyxZQUFXO0FBQ2hCLElBQUUsQ0FBRixLQUFRLENBQVQsSUFBZSxJQUFmO0FBQ0EsRUFGRDtBQUdBOztBQUdjLFNBQVMsWUFBVCxDQUFzQixXQUF0QixFQUFrQzs7QUFFaEQsS0FBTSxXQUFXLFlBQVksR0FBN0I7OztBQUdBLEtBQU0sZUFBZSxZQUFZLEdBQVosR0FBa0IsZUFBSyxJQUFMLENBQVUsTUFBVixFQUFrQixhQUFhLFFBQVEsR0FBUixDQUFZLFFBQVosQ0FBcUIsRUFBckIsQ0FBL0IsQ0FBdkM7O0FBRUEsS0FBSSxZQUFZLElBQUksSUFBSixFQUFoQjs7QUFFQSxvQkFBSSxnQkFBSixFQUFzQixLQUFLLFNBQUwsQ0FBZSxZQUFZLE9BQTNCLEVBQW9DLElBQXBDLEVBQTBDLENBQTFDLENBQXRCLEVBQW9FLElBQXBFLEVBQTBFLFlBQTFFOztBQUVBLHFCQUFVLFFBQVYsQ0FDQyxXQURELEVBR0MsWUFBWTs7QUFFWCxNQUFJLGNBQWMsQ0FBRSxJQUFJLElBQUosRUFBRCxHQUFlLFNBQWhCLElBQTZCLElBQS9DOztBQUVBLGdEQUE2QixXQUE3Qjs7QUFFQSxNQUFJLFFBQVEsT0FBTyxZQUFZLE9BQVosQ0FBb0IsTUFBM0IsRUFBbUMsU0FBUyxPQUFULEdBQWtCOzs7Ozs7Ozs7O0FBVS9ELFdBQVEsSUFBUixDQUFhLENBQWI7O0FBRUQsR0FaVyxDQUFaOzs7QUFOVztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLFFBcUJGLE1BckJFOzs7QUF1QlYsUUFBSSxZQUFZLGVBQUssSUFBTCxDQUFVLFlBQVYsRUFBd0IsT0FBTyxJQUFQLEdBQWMsS0FBdEMsQ0FBaEI7QUFDQSxRQUFJLFdBQVcsZUFBSyxJQUFMLENBQVUsUUFBVixFQUFvQixPQUFPLElBQVAsR0FBYyxLQUFsQyxDQUFmOzs7QUFHQSxzQkFBRyxJQUFILENBQVEsU0FBUixFQUFtQixRQUFuQixFQUE2QixVQUFVLEdBQVYsRUFBZTtBQUMzQyxTQUFJLEdBQUosRUFBUztBQUNSLGNBQVEsR0FBUixDQUFZLFVBQVosRUFBd0IsR0FBeEI7QUFDQSxjQUFRLElBQVIsQ0FBYSxDQUFiO0FBQ0E7O0FBRUQsYUFBUSxJQUFSLENBQWEsRUFBRSxVQUFVLFFBQVosRUFBYjtBQUNBO0FBQ0EsS0FSRDtBQTNCVTs7QUFxQlgsd0JBQW1CLFlBQVksT0FBL0IsOEhBQXdDO0FBQUE7QUFldkM7QUFwQ1U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXFDWCxFQXhDRixFQTBDQyxVQUFVLEdBQVYsRUFBZTtBQUNkLFVBQVEsR0FBUixDQUFZLFdBQVosRUFBeUIsR0FBekI7QUFDQSxVQUFRLElBQVIsQ0FBYSxDQUFiO0FBQ0EsRUE3Q0Y7QUErQ0EiLCJmaWxlIjoiZXhlY3V0ZUJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgcmVxdWlyZWpzIGZyb20gJ3JlcXVpcmVqcyc7XG5pbXBvcnQgeyBleGVjIH0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4vdXRpbHMvbG9nJztcblxuXG5jb25zdCBUTVBESVIgPSBwcm9jZXNzLmVudi5UTVBESVIgfHwgJy90bXAnO1xuXG5cbmZ1bmN0aW9uIHVudGlsTihuLCBjYikge1xuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0KC0tbiA9PT0gMCkgJiYgY2IoKTtcblx0fTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleGVjdXRlQnVpbGQoYnVpbGRDb25maWcpe1xuXG5cdGNvbnN0IGJ1aWxkRGlyID0gYnVpbGRDb25maWcuZGlyO1xuXG5cdC8vIE5vdCByZWFsbHkgdW5pcXVlLi4uIG9wdGltaXplIGxhdGVyXG5cdGNvbnN0IHRlbXBCdWlsZERpciA9IGJ1aWxkQ29uZmlnLmRpciA9IHBhdGguam9pbihUTVBESVIsICdyanNCdWlsZCcgKyBwcm9jZXNzLnBpZC50b1N0cmluZygzNikpO1xuXG5cdGxldCBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xuXG5cdGxvZygnU3RhcnRpbmcgYnVpbGQnLCBKU09OLnN0cmluZ2lmeShidWlsZENvbmZpZy5tb2R1bGVzLCBudWxsLCA0KSwgJ2luJywgdGVtcEJ1aWxkRGlyKTtcblxuXHRyZXF1aXJlanMub3B0aW1pemUoXG5cdFx0YnVpbGRDb25maWcsXG5cblx0XHRmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGxldCBlbGFwc2VkVGltZSA9ICgobmV3IERhdGUoKSkgLSBzdGFydFRpbWUpIC8gMTAwMDtcblxuXHRcdFx0bG9nKGBTdWNjZXNzZnVsbHkgYnVpbHQgaW4gJHtlbGFwc2VkVGltZX1zYCk7XG5cblx0XHRcdGxldCBtb3ZlZCA9IHVudGlsTihidWlsZENvbmZpZy5tb2R1bGVzLmxlbmd0aCwgZnVuY3Rpb24gY2xlYW5VcCgpe1xuXG5cdFx0XHRcdC8vIERlbGV0ZSBidWlsZCBkaXJlY3RvcnkgKGZzLnJtZGlyU3luYyBjb21wbGFpbnMgYWJvdXQgZGVsZXRlaW5nIGEgZGlyZWN0b3J5IHdpdGggY29udGVudClcblx0XHRcdFx0Ly8gbGV0IGRlbFN0YXJ0ID0gbmV3IERhdGUoKTtcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coJ2RlbGV0aW5nJylcblxuXHRcdFx0XHQvLyBmcy5yZW1vdmUodGVtcEJ1aWxkRGlyLCBmdW5jdGlvbihlcnIpe1xuXHRcdFx0XHQvLyBcdGlmIChlcnIpIHsgbG9nKGVycik7IH1cblx0XHRcdFx0Ly8gXHRjb25zb2xlLmxvZygoKG5ldyBEYXRlKCkpIC0gZGVsU3RhcnQpLzEwMDApO1xuXHRcdFx0XHQvLyBcdGNvbnNvbGUubG9nKGFyZ3VtZW50cyk7XG5cdFx0XHRcdFx0cHJvY2Vzcy5leGl0KDApO1xuXHRcdFx0XHQvLyB9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBNb3ZlIGJ1aWx0IG1vZHVsZXMgdG8gcmlnaHQgZGVzdGluYXRpb25cblx0XHRcdGZvciAobGV0IG1vZHVsZSBvZiBidWlsZENvbmZpZy5tb2R1bGVzKSB7XG5cblx0XHRcdFx0bGV0IGJ1aWxkUGF0aCA9IHBhdGguam9pbih0ZW1wQnVpbGREaXIsIG1vZHVsZS5uYW1lICsgJy5qcycpO1xuXHRcdFx0XHRsZXQgZGVzdFBhdGggPSBwYXRoLmpvaW4oYnVpbGREaXIsIG1vZHVsZS5uYW1lICsgJy5qcycpO1xuXG5cdFx0XHRcdC8vIE1vdmUgdG8gcmVhbCBvdXRwdXQgZGlyXG5cdFx0XHRcdGZzLm1vdmUoYnVpbGRQYXRoLCBkZXN0UGF0aCwgZnVuY3Rpb24gKGVycikge1xuXHRcdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdtb3ZlIGVycicsIGVycik7XG5cdFx0XHRcdFx0XHRwcm9jZXNzLmV4aXQoMSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIFNpZ25hbCBjb21wbGV0aW9uXG5cdFx0XHRcdFx0cHJvY2Vzcy5zZW5kKHsgZmlsZVBhdGg6IGRlc3RQYXRoIH0pO1xuXHRcdFx0XHRcdG1vdmVkKCk7XG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdyanMgZXJyb3InLCBlcnIpO1xuXHRcdFx0cHJvY2Vzcy5leGl0KDEpO1xuXHRcdH1cblx0KTtcbn0iXX0=