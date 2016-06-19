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

function executeBuild(cwd, buildConfig) {

	process.chdir(cwd);

	var buildPath = void 0,
	    finalBuildDir = void 0;

	if (buildConfig.dir) {
		finalBuildDir = _path2.default.resolve(buildConfig.dir);

		// Not really unique... optimize later
		buildPath = buildConfig.dir = _path2.default.join(TMPDIR, 'rjsBuild' + process.pid.toString(36));

		(0, _log2.default)('Starting build', JSON.stringify(buildConfig.modules, null, 4), 'in', buildPath);
	} else if (buildConfig.out) {
		buildPath = _path2.default.resolve(buildConfig.out);

		(0, _log2.default)('Starting build', buildPath);
	}

	var moved = untilN(buildConfig.modules ? buildConfig.modules.length : 1, function cleanUp() {

		// Delete build directory (fs.rmdirSync complains about deleteing a directory with content)
		// let delStart = new Date();
		// console.log('deleting')

		// fs.remove(buildPath, function(err){
		// 	if (err) { log(err); }
		// 	console.log(((new Date()) - delStart)/1000);
		// 	console.log(arguments);
		process.exit(0);
		// });
	});

	var startTime = new Date();

	_requirejs2.default.optimize(buildConfig, function () {

		var elapsedTime = (new Date() - startTime) / 1000;

		(0, _log2.default)('Successfully built in ' + elapsedTime + 's');

		if (!finalBuildDir) {

			// Signal completion
			process.send({ filePath: buildPath });

			return moved();
		}

		// Move built modules to right destination
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			var _loop = function _loop() {
				var module = _step.value;


				var srcPath = _path2.default.join(buildPath, module.name + '.js');
				var destPath = _path2.default.join(finalBuildDir, module.name + '.js');

				// Move to real output dir
				_fsExtra2.default.move(srcPath, destPath, { clobber: true }, function (err) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leGVjdXRlQnVpbGQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O2tCQW1Cd0IsWTs7QUFqQnhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7QUFHQSxJQUFNLFNBQVMsUUFBUSxHQUFSLENBQVksTUFBWixJQUFzQixNQUFyQzs7QUFHQSxTQUFTLE1BQVQsQ0FBZ0IsQ0FBaEIsRUFBbUIsRUFBbkIsRUFBdUI7QUFDdEIsUUFBTyxZQUFXO0FBQ2hCLElBQUUsQ0FBRixLQUFRLENBQVQsSUFBZSxJQUFmO0FBQ0EsRUFGRDtBQUdBOztBQUdjLFNBQVMsWUFBVCxDQUFzQixHQUF0QixFQUEyQixXQUEzQixFQUF1Qzs7QUFFckQsU0FBUSxLQUFSLENBQWMsR0FBZDs7QUFFQSxLQUFJLGtCQUFKO0FBQUEsS0FBZSxzQkFBZjs7QUFFQSxLQUFJLFlBQVksR0FBaEIsRUFBcUI7QUFDcEIsa0JBQWdCLGVBQUssT0FBTCxDQUFhLFlBQVksR0FBekIsQ0FBaEI7OztBQUdBLGNBQVksWUFBWSxHQUFaLEdBQWtCLGVBQUssSUFBTCxDQUFVLE1BQVYsRUFBa0IsYUFBYSxRQUFRLEdBQVIsQ0FBWSxRQUFaLENBQXFCLEVBQXJCLENBQS9CLENBQTlCOztBQUVBLHFCQUFJLGdCQUFKLEVBQXNCLEtBQUssU0FBTCxDQUFlLFlBQVksT0FBM0IsRUFBb0MsSUFBcEMsRUFBMEMsQ0FBMUMsQ0FBdEIsRUFBb0UsSUFBcEUsRUFBMEUsU0FBMUU7QUFDQSxFQVBELE1BU0ssSUFBSSxZQUFZLEdBQWhCLEVBQXFCO0FBQ3pCLGNBQVksZUFBSyxPQUFMLENBQWEsWUFBWSxHQUF6QixDQUFaOztBQUVBLHFCQUFJLGdCQUFKLEVBQXNCLFNBQXRCO0FBQ0E7O0FBRUQsS0FBSSxRQUFRLE9BQU8sWUFBWSxPQUFaLEdBQXNCLFlBQVksT0FBWixDQUFvQixNQUExQyxHQUFtRCxDQUExRCxFQUE2RCxTQUFTLE9BQVQsR0FBa0I7Ozs7Ozs7Ozs7QUFVekYsVUFBUSxJQUFSLENBQWEsQ0FBYjs7QUFFRCxFQVpXLENBQVo7O0FBY0EsS0FBSSxZQUFZLElBQUksSUFBSixFQUFoQjs7QUFFQSxxQkFBVSxRQUFWLENBQ0MsV0FERCxFQUdDLFlBQVk7O0FBRVgsTUFBSSxjQUFjLENBQUUsSUFBSSxJQUFKLEVBQUQsR0FBZSxTQUFoQixJQUE2QixJQUEvQzs7QUFFQSxnREFBNkIsV0FBN0I7O0FBRUEsTUFBSSxDQUFDLGFBQUwsRUFBb0I7OztBQUduQixXQUFRLElBQVIsQ0FBYSxFQUFFLFVBQVUsU0FBWixFQUFiOztBQUVBLFVBQU8sT0FBUDtBQUNBOzs7QUFaVTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLFFBZUYsTUFmRTs7O0FBaUJWLFFBQUksVUFBVSxlQUFLLElBQUwsQ0FBVSxTQUFWLEVBQXFCLE9BQU8sSUFBUCxHQUFjLEtBQW5DLENBQWQ7QUFDQSxRQUFJLFdBQVcsZUFBSyxJQUFMLENBQVUsYUFBVixFQUF5QixPQUFPLElBQVAsR0FBYyxLQUF2QyxDQUFmOzs7QUFHQSxzQkFBRyxJQUFILENBQVEsT0FBUixFQUFpQixRQUFqQixFQUEyQixFQUFFLFNBQVMsSUFBWCxFQUEzQixFQUE4QyxVQUFVLEdBQVYsRUFBZTtBQUM1RCxTQUFJLEdBQUosRUFBUztBQUNSLGNBQVEsR0FBUixDQUFZLFVBQVosRUFBd0IsR0FBeEI7QUFDQSxjQUFRLElBQVIsQ0FBYSxDQUFiO0FBQ0E7OztBQUdELGFBQVEsSUFBUixDQUFhLEVBQUUsVUFBVSxRQUFaLEVBQWI7QUFDQTtBQUNBLEtBVEQ7QUFyQlU7O0FBZVgsd0JBQW1CLFlBQVksT0FBL0IsOEhBQXdDO0FBQUE7QUFnQnZDO0FBL0JVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFnQ1gsRUFuQ0YsRUFxQ0MsVUFBVSxHQUFWLEVBQWU7QUFDZCxVQUFRLEdBQVIsQ0FBWSxXQUFaLEVBQXlCLEdBQXpCO0FBQ0EsVUFBUSxJQUFSLENBQWEsQ0FBYjtBQUNBLEVBeENGO0FBMENBIiwiZmlsZSI6ImV4ZWN1dGVCdWlsZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHJlcXVpcmVqcyBmcm9tICdyZXF1aXJlanMnO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IGxvZyBmcm9tICcuL3V0aWxzL2xvZyc7XG5cblxuY29uc3QgVE1QRElSID0gcHJvY2Vzcy5lbnYuVE1QRElSIHx8ICcvdG1wJztcblxuXG5mdW5jdGlvbiB1bnRpbE4obiwgY2IpIHtcblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdCgtLW4gPT09IDApICYmIGNiKCk7XG5cdH07XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXhlY3V0ZUJ1aWxkKGN3ZCwgYnVpbGRDb25maWcpe1xuXG5cdHByb2Nlc3MuY2hkaXIoY3dkKTtcblxuXHRsZXQgYnVpbGRQYXRoLCBmaW5hbEJ1aWxkRGlyO1xuXG5cdGlmIChidWlsZENvbmZpZy5kaXIpIHtcblx0XHRmaW5hbEJ1aWxkRGlyID0gcGF0aC5yZXNvbHZlKGJ1aWxkQ29uZmlnLmRpcik7XG5cblx0XHQvLyBOb3QgcmVhbGx5IHVuaXF1ZS4uLiBvcHRpbWl6ZSBsYXRlclxuXHRcdGJ1aWxkUGF0aCA9IGJ1aWxkQ29uZmlnLmRpciA9IHBhdGguam9pbihUTVBESVIsICdyanNCdWlsZCcgKyBwcm9jZXNzLnBpZC50b1N0cmluZygzNikpO1xuXG5cdFx0bG9nKCdTdGFydGluZyBidWlsZCcsIEpTT04uc3RyaW5naWZ5KGJ1aWxkQ29uZmlnLm1vZHVsZXMsIG51bGwsIDQpLCAnaW4nLCBidWlsZFBhdGgpO1xuXHR9XG5cblx0ZWxzZSBpZiAoYnVpbGRDb25maWcub3V0KSB7XG5cdFx0YnVpbGRQYXRoID0gcGF0aC5yZXNvbHZlKGJ1aWxkQ29uZmlnLm91dCk7XG5cblx0XHRsb2coJ1N0YXJ0aW5nIGJ1aWxkJywgYnVpbGRQYXRoKTtcblx0fVxuXG5cdGxldCBtb3ZlZCA9IHVudGlsTihidWlsZENvbmZpZy5tb2R1bGVzID8gYnVpbGRDb25maWcubW9kdWxlcy5sZW5ndGggOiAxLCBmdW5jdGlvbiBjbGVhblVwKCl7XG5cblx0XHQvLyBEZWxldGUgYnVpbGQgZGlyZWN0b3J5IChmcy5ybWRpclN5bmMgY29tcGxhaW5zIGFib3V0IGRlbGV0ZWluZyBhIGRpcmVjdG9yeSB3aXRoIGNvbnRlbnQpXG5cdFx0Ly8gbGV0IGRlbFN0YXJ0ID0gbmV3IERhdGUoKTtcblx0XHQvLyBjb25zb2xlLmxvZygnZGVsZXRpbmcnKVxuXG5cdFx0Ly8gZnMucmVtb3ZlKGJ1aWxkUGF0aCwgZnVuY3Rpb24oZXJyKXtcblx0XHQvLyBcdGlmIChlcnIpIHsgbG9nKGVycik7IH1cblx0XHQvLyBcdGNvbnNvbGUubG9nKCgobmV3IERhdGUoKSkgLSBkZWxTdGFydCkvMTAwMCk7XG5cdFx0Ly8gXHRjb25zb2xlLmxvZyhhcmd1bWVudHMpO1xuXHRcdFx0cHJvY2Vzcy5leGl0KDApO1xuXHRcdC8vIH0pO1xuXHR9KTtcblxuXHRsZXQgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcblxuXHRyZXF1aXJlanMub3B0aW1pemUoXG5cdFx0YnVpbGRDb25maWcsXG5cblx0XHRmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGxldCBlbGFwc2VkVGltZSA9ICgobmV3IERhdGUoKSkgLSBzdGFydFRpbWUpIC8gMTAwMDtcblxuXHRcdFx0bG9nKGBTdWNjZXNzZnVsbHkgYnVpbHQgaW4gJHtlbGFwc2VkVGltZX1zYCk7XG5cblx0XHRcdGlmICghZmluYWxCdWlsZERpcikge1xuXG5cdFx0XHRcdC8vIFNpZ25hbCBjb21wbGV0aW9uXG5cdFx0XHRcdHByb2Nlc3Muc2VuZCh7IGZpbGVQYXRoOiBidWlsZFBhdGggfSk7XG5cblx0XHRcdFx0cmV0dXJuIG1vdmVkKCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE1vdmUgYnVpbHQgbW9kdWxlcyB0byByaWdodCBkZXN0aW5hdGlvblxuXHRcdFx0Zm9yIChsZXQgbW9kdWxlIG9mIGJ1aWxkQ29uZmlnLm1vZHVsZXMpIHtcblxuXHRcdFx0XHRsZXQgc3JjUGF0aCA9IHBhdGguam9pbihidWlsZFBhdGgsIG1vZHVsZS5uYW1lICsgJy5qcycpO1xuXHRcdFx0XHRsZXQgZGVzdFBhdGggPSBwYXRoLmpvaW4oZmluYWxCdWlsZERpciwgbW9kdWxlLm5hbWUgKyAnLmpzJyk7XG5cblx0XHRcdFx0Ly8gTW92ZSB0byByZWFsIG91dHB1dCBkaXJcblx0XHRcdFx0ZnMubW92ZShzcmNQYXRoLCBkZXN0UGF0aCwgeyBjbG9iYmVyOiB0cnVlIH0sIGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnbW92ZSBlcnInLCBlcnIpO1xuXHRcdFx0XHRcdFx0cHJvY2Vzcy5leGl0KDEpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFNpZ25hbCBjb21wbGV0aW9uXG5cdFx0XHRcdFx0cHJvY2Vzcy5zZW5kKHsgZmlsZVBhdGg6IGRlc3RQYXRoIH0pO1xuXHRcdFx0XHRcdG1vdmVkKCk7XG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdyanMgZXJyb3InLCBlcnIpO1xuXHRcdFx0cHJvY2Vzcy5leGl0KDEpO1xuXHRcdH1cblx0KTtcbn0iXX0=