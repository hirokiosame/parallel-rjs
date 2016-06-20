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

var _log = require('./utils/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TMPDIR = process.env.TMPDIR || '/tmp';

function untilN(n, cb) {
	return function () {
		return --n === 0 && cb();
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

		// let delStart = new Date();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leGVjdXRlQnVpbGQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O2tCQWN3QixZOztBQVp4Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBR0EsSUFBTSxTQUFTLFFBQVEsR0FBUixDQUFZLE1BQVosSUFBc0IsTUFBckM7O0FBRUEsU0FBUyxNQUFULENBQWdCLENBQWhCLEVBQW1CLEVBQW5CLEVBQXVCO0FBQ3RCLFFBQU87QUFBQSxTQUFPLEVBQUUsQ0FBRixLQUFRLENBQVQsSUFBZSxJQUFyQjtBQUFBLEVBQVA7QUFDQTs7QUFFYyxTQUFTLFlBQVQsQ0FBc0IsR0FBdEIsRUFBMkIsV0FBM0IsRUFBdUM7O0FBRXJELFNBQVEsS0FBUixDQUFjLEdBQWQ7O0FBRUEsS0FBSSxrQkFBSjtBQUFBLEtBQWUsc0JBQWY7O0FBRUEsS0FBSSxZQUFZLEdBQWhCLEVBQXFCO0FBQ3BCLGtCQUFnQixlQUFLLE9BQUwsQ0FBYSxZQUFZLEdBQXpCLENBQWhCOzs7QUFHQSxjQUFZLFlBQVksR0FBWixHQUFrQixlQUFLLElBQUwsQ0FBVSxNQUFWLEVBQWtCLGFBQWEsUUFBUSxHQUFSLENBQVksUUFBWixDQUFxQixFQUFyQixDQUEvQixDQUE5Qjs7QUFFQSxxQkFBSSxnQkFBSixFQUFzQixLQUFLLFNBQUwsQ0FBZSxZQUFZLE9BQTNCLEVBQW9DLElBQXBDLEVBQTBDLENBQTFDLENBQXRCLEVBQW9FLElBQXBFLEVBQTBFLFNBQTFFO0FBQ0EsRUFQRCxNQVNLLElBQUksWUFBWSxHQUFoQixFQUFxQjtBQUN6QixjQUFZLGVBQUssT0FBTCxDQUFhLFlBQVksR0FBekIsQ0FBWjs7QUFFQSxxQkFBSSxnQkFBSixFQUFzQixTQUF0QjtBQUNBOztBQUVELEtBQUksUUFBUSxPQUFPLFlBQVksT0FBWixHQUFzQixZQUFZLE9BQVosQ0FBb0IsTUFBMUMsR0FBbUQsQ0FBMUQsRUFBNkQsU0FBUyxPQUFULEdBQW9COzs7Ozs7O0FBTzNGLFVBQVEsSUFBUixDQUFhLENBQWI7O0FBRUQsRUFUVyxDQUFaOztBQVdBLEtBQUksWUFBWSxJQUFJLElBQUosRUFBaEI7O0FBRUEscUJBQVUsUUFBVixDQUNDLFdBREQsRUFHQyxZQUFZOztBQUVYLE1BQUksY0FBYyxDQUFFLElBQUksSUFBSixFQUFELEdBQWUsU0FBaEIsSUFBNkIsSUFBL0M7O0FBRUEsZ0RBQTZCLFdBQTdCOztBQUVBLE1BQUksQ0FBQyxhQUFMLEVBQW9COzs7QUFHbkIsV0FBUSxJQUFSLENBQWEsRUFBRSxVQUFVLFNBQVosRUFBYjs7QUFFQSxVQUFPLE9BQVA7QUFDQTs7O0FBWlU7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxRQWVGLE1BZkU7OztBQWlCVixRQUFJLFVBQVUsZUFBSyxJQUFMLENBQVUsU0FBVixFQUFxQixPQUFPLElBQVAsR0FBYyxLQUFuQyxDQUFkO0FBQ0EsUUFBSSxXQUFXLGVBQUssSUFBTCxDQUFVLGFBQVYsRUFBeUIsT0FBTyxJQUFQLEdBQWMsS0FBdkMsQ0FBZjs7O0FBR0Esc0JBQUcsSUFBSCxDQUFRLE9BQVIsRUFBaUIsUUFBakIsRUFBMkIsRUFBRSxTQUFTLElBQVgsRUFBM0IsRUFBOEMsVUFBVSxHQUFWLEVBQWU7QUFDNUQsU0FBSSxHQUFKLEVBQVM7QUFDUixjQUFRLEdBQVIsQ0FBWSxVQUFaLEVBQXdCLEdBQXhCO0FBQ0EsY0FBUSxJQUFSLENBQWEsQ0FBYjtBQUNBOzs7QUFHRCxhQUFRLElBQVIsQ0FBYSxFQUFFLFVBQVUsUUFBWixFQUFiO0FBQ0E7QUFDQSxLQVREO0FBckJVOztBQWVYLHdCQUFtQixZQUFZLE9BQS9CLDhIQUF3QztBQUFBO0FBZ0J2QztBQS9CVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBZ0NYLEVBbkNGLEVBcUNDLFVBQVUsR0FBVixFQUFlO0FBQ2QsVUFBUSxHQUFSLENBQVksV0FBWixFQUF5QixHQUF6QjtBQUNBLFVBQVEsSUFBUixDQUFhLENBQWI7QUFDQSxFQXhDRjtBQTBDQSIsImZpbGUiOiJleGVjdXRlQnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCByZXF1aXJlanMgZnJvbSAncmVxdWlyZWpzJztcbmltcG9ydCBsb2cgZnJvbSAnLi91dGlscy9sb2cnO1xuXG5cbmNvbnN0IFRNUERJUiA9IHByb2Nlc3MuZW52LlRNUERJUiB8fCAnL3RtcCc7XG5cbmZ1bmN0aW9uIHVudGlsTihuLCBjYikge1xuXHRyZXR1cm4gKCkgPT4gKC0tbiA9PT0gMCkgJiYgY2IoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXhlY3V0ZUJ1aWxkKGN3ZCwgYnVpbGRDb25maWcpe1xuXG5cdHByb2Nlc3MuY2hkaXIoY3dkKTtcblxuXHRsZXQgYnVpbGRQYXRoLCBmaW5hbEJ1aWxkRGlyO1xuXG5cdGlmIChidWlsZENvbmZpZy5kaXIpIHtcblx0XHRmaW5hbEJ1aWxkRGlyID0gcGF0aC5yZXNvbHZlKGJ1aWxkQ29uZmlnLmRpcik7XG5cblx0XHQvLyBOb3QgcmVhbGx5IHVuaXF1ZS4uLiBvcHRpbWl6ZSBsYXRlclxuXHRcdGJ1aWxkUGF0aCA9IGJ1aWxkQ29uZmlnLmRpciA9IHBhdGguam9pbihUTVBESVIsICdyanNCdWlsZCcgKyBwcm9jZXNzLnBpZC50b1N0cmluZygzNikpO1xuXG5cdFx0bG9nKCdTdGFydGluZyBidWlsZCcsIEpTT04uc3RyaW5naWZ5KGJ1aWxkQ29uZmlnLm1vZHVsZXMsIG51bGwsIDQpLCAnaW4nLCBidWlsZFBhdGgpO1xuXHR9XG5cblx0ZWxzZSBpZiAoYnVpbGRDb25maWcub3V0KSB7XG5cdFx0YnVpbGRQYXRoID0gcGF0aC5yZXNvbHZlKGJ1aWxkQ29uZmlnLm91dCk7XG5cblx0XHRsb2coJ1N0YXJ0aW5nIGJ1aWxkJywgYnVpbGRQYXRoKTtcblx0fVxuXG5cdGxldCBtb3ZlZCA9IHVudGlsTihidWlsZENvbmZpZy5tb2R1bGVzID8gYnVpbGRDb25maWcubW9kdWxlcy5sZW5ndGggOiAxLCBmdW5jdGlvbiBjbGVhblVwICgpIHtcblxuXHRcdC8vIGxldCBkZWxTdGFydCA9IG5ldyBEYXRlKCk7XG5cdFx0Ly8gZnMucmVtb3ZlKGJ1aWxkUGF0aCwgZnVuY3Rpb24oZXJyKXtcblx0XHQvLyBcdGlmIChlcnIpIHsgbG9nKGVycik7IH1cblx0XHQvLyBcdGNvbnNvbGUubG9nKCgobmV3IERhdGUoKSkgLSBkZWxTdGFydCkvMTAwMCk7XG5cdFx0Ly8gXHRjb25zb2xlLmxvZyhhcmd1bWVudHMpO1xuXHRcdFx0cHJvY2Vzcy5leGl0KDApO1xuXHRcdC8vIH0pO1xuXHR9KTtcblxuXHRsZXQgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcblxuXHRyZXF1aXJlanMub3B0aW1pemUoXG5cdFx0YnVpbGRDb25maWcsXG5cblx0XHRmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGxldCBlbGFwc2VkVGltZSA9ICgobmV3IERhdGUoKSkgLSBzdGFydFRpbWUpIC8gMTAwMDtcblxuXHRcdFx0bG9nKGBTdWNjZXNzZnVsbHkgYnVpbHQgaW4gJHtlbGFwc2VkVGltZX1zYCk7XG5cblx0XHRcdGlmICghZmluYWxCdWlsZERpcikge1xuXG5cdFx0XHRcdC8vIFNpZ25hbCBjb21wbGV0aW9uXG5cdFx0XHRcdHByb2Nlc3Muc2VuZCh7IGZpbGVQYXRoOiBidWlsZFBhdGggfSk7XG5cblx0XHRcdFx0cmV0dXJuIG1vdmVkKCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE1vdmUgYnVpbHQgbW9kdWxlcyB0byByaWdodCBkZXN0aW5hdGlvblxuXHRcdFx0Zm9yIChsZXQgbW9kdWxlIG9mIGJ1aWxkQ29uZmlnLm1vZHVsZXMpIHtcblxuXHRcdFx0XHRsZXQgc3JjUGF0aCA9IHBhdGguam9pbihidWlsZFBhdGgsIG1vZHVsZS5uYW1lICsgJy5qcycpO1xuXHRcdFx0XHRsZXQgZGVzdFBhdGggPSBwYXRoLmpvaW4oZmluYWxCdWlsZERpciwgbW9kdWxlLm5hbWUgKyAnLmpzJyk7XG5cblx0XHRcdFx0Ly8gTW92ZSB0byByZWFsIG91dHB1dCBkaXJcblx0XHRcdFx0ZnMubW92ZShzcmNQYXRoLCBkZXN0UGF0aCwgeyBjbG9iYmVyOiB0cnVlIH0sIGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnbW92ZSBlcnInLCBlcnIpO1xuXHRcdFx0XHRcdFx0cHJvY2Vzcy5leGl0KDEpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFNpZ25hbCBjb21wbGV0aW9uXG5cdFx0XHRcdFx0cHJvY2Vzcy5zZW5kKHsgZmlsZVBhdGg6IGRlc3RQYXRoIH0pO1xuXHRcdFx0XHRcdG1vdmVkKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRmdW5jdGlvbiAoZXJyKSB7XG5cdFx0XHRjb25zb2xlLmxvZygncmpzIGVycm9yJywgZXJyKTtcblx0XHRcdHByb2Nlc3MuZXhpdCgxKTtcblx0XHR9XG5cdCk7XG59Il19