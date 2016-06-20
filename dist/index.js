'use strict';

require('source-map-support/register');

require('babel-polyfill');

var _yargs = require('yargs');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _readBuildConfig = require('./utils/readBuildConfig');

var _readBuildConfig2 = _interopRequireDefault(_readBuildConfig);

var _groupModulesByDep = require('./utils/groupModulesByDep');

var _groupModulesByDep2 = _interopRequireDefault(_groupModulesByDep);

var _spawnBuild = require('./utils/spawnBuild');

var _spawnBuild2 = _interopRequireDefault(_spawnBuild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {

	for (var _iterator = _yargs.argv._[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var buildConfigPath = _step.value;


		var workingDir = _path2.default.dirname(buildConfigPath);

		// Read r.js config file
		var buildConfig = (0, _readBuildConfig2.default)(buildConfigPath);

		// Unnecessary since we are deleting all non-entry points
		buildConfig.removeCombined = false;

		// Save optimize config and disable rjs so we can handle it
		var optimizeConfig = (_yargs.argv.optimize || buildConfig.optimize) === 'uglify2';
		buildConfig.optimize = 'none';

		// Multiple outputs
		if (buildConfig.modules instanceof Array) {

			var moduleGroups = (0, _groupModulesByDep2.default)(buildConfig.modules);

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = moduleGroups[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var moduleGroup = _step2.value;


					buildConfig.modules = moduleGroup;

					(0, _spawnBuild2.default)(workingDir, buildConfig, optimizeConfig);
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}

		// Output is a file
		else if (typeof buildConfig.out === 'string') {

				(0, _spawnBuild2.default)(workingDir, buildConfig, optimizeConfig);
			} else {
				throw new Error('Properties \'modules\' or \'out\' not defined in the config file');
			}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBR0Esc0JBQTRCLFlBQUssQ0FBakMsOEhBQW9DO0FBQUEsTUFBM0IsZUFBMkI7OztBQUVuQyxNQUFJLGFBQWEsZUFBSyxPQUFMLENBQWEsZUFBYixDQUFqQjs7O0FBR0EsTUFBSSxjQUFjLCtCQUFnQixlQUFoQixDQUFsQjs7O0FBR0EsY0FBWSxjQUFaLEdBQTZCLEtBQTdCOzs7QUFHQSxNQUFJLGlCQUFpQixDQUFDLFlBQUssUUFBTCxJQUFpQixZQUFZLFFBQTlCLE1BQTRDLFNBQWpFO0FBQ0EsY0FBWSxRQUFaLEdBQXVCLE1BQXZCOzs7QUFJQSxNQUFJLFlBQVksT0FBWixZQUErQixLQUFuQyxFQUEwQzs7QUFFekMsT0FBSSxlQUFlLGlDQUFrQixZQUFZLE9BQTlCLENBQW5COztBQUZ5QztBQUFBO0FBQUE7O0FBQUE7QUFJekMsMEJBQXdCLFlBQXhCLG1JQUFzQztBQUFBLFNBQTdCLFdBQTZCOzs7QUFFckMsaUJBQVksT0FBWixHQUFzQixXQUF0Qjs7QUFFQSwrQkFBVyxVQUFYLEVBQXVCLFdBQXZCLEVBQW9DLGNBQXBDO0FBQ0E7QUFUd0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVV6Qzs7O0FBVkQsT0FhSyxJQUFJLE9BQU8sWUFBWSxHQUFuQixLQUEyQixRQUEvQixFQUF5Qzs7QUFFN0MsOEJBQVcsVUFBWCxFQUF1QixXQUF2QixFQUFvQyxjQUFwQztBQUVBLElBSkksTUFJRTtBQUNOLFVBQU0sSUFBSSxLQUFKLENBQVUsa0VBQVYsQ0FBTjtBQUNBO0FBQ0QiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJztcbmltcG9ydCAnYmFiZWwtcG9seWZpbGwnO1xuXG5pbXBvcnQgeyBhcmd2IH0gZnJvbSAneWFyZ3MnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgcmVhZEJ1aWxkQ29uZmlnIGZyb20gJy4vdXRpbHMvcmVhZEJ1aWxkQ29uZmlnJztcbmltcG9ydCBncm91cE1vZHVsZXNCeURlcCBmcm9tICcuL3V0aWxzL2dyb3VwTW9kdWxlc0J5RGVwJztcbmltcG9ydCBzcGF3bkJ1aWxkIGZyb20gJy4vdXRpbHMvc3Bhd25CdWlsZCc7XG5cblxuZm9yIChsZXQgYnVpbGRDb25maWdQYXRoIG9mIGFyZ3YuXykge1xuXG5cdGxldCB3b3JraW5nRGlyID0gcGF0aC5kaXJuYW1lKGJ1aWxkQ29uZmlnUGF0aCk7XG5cblx0Ly8gUmVhZCByLmpzIGNvbmZpZyBmaWxlXG5cdGxldCBidWlsZENvbmZpZyA9IHJlYWRCdWlsZENvbmZpZyhidWlsZENvbmZpZ1BhdGgpO1xuXG5cdC8vIFVubmVjZXNzYXJ5IHNpbmNlIHdlIGFyZSBkZWxldGluZyBhbGwgbm9uLWVudHJ5IHBvaW50c1xuXHRidWlsZENvbmZpZy5yZW1vdmVDb21iaW5lZCA9IGZhbHNlO1xuXG5cdC8vIFNhdmUgb3B0aW1pemUgY29uZmlnIGFuZCBkaXNhYmxlIHJqcyBzbyB3ZSBjYW4gaGFuZGxlIGl0XG5cdGxldCBvcHRpbWl6ZUNvbmZpZyA9IChhcmd2Lm9wdGltaXplIHx8IGJ1aWxkQ29uZmlnLm9wdGltaXplKSA9PT0gJ3VnbGlmeTInO1xuXHRidWlsZENvbmZpZy5vcHRpbWl6ZSA9ICdub25lJztcblxuXG5cdC8vIE11bHRpcGxlIG91dHB1dHNcblx0aWYgKGJ1aWxkQ29uZmlnLm1vZHVsZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuXG5cdFx0bGV0IG1vZHVsZUdyb3VwcyA9IGdyb3VwTW9kdWxlc0J5RGVwKGJ1aWxkQ29uZmlnLm1vZHVsZXMpO1xuXG5cdFx0Zm9yIChsZXQgbW9kdWxlR3JvdXAgb2YgbW9kdWxlR3JvdXBzKSB7XG5cblx0XHRcdGJ1aWxkQ29uZmlnLm1vZHVsZXMgPSBtb2R1bGVHcm91cDtcblxuXHRcdFx0c3Bhd25CdWlsZCh3b3JraW5nRGlyLCBidWlsZENvbmZpZywgb3B0aW1pemVDb25maWcpO1xuXHRcdH1cblx0fVxuXG5cdC8vIE91dHB1dCBpcyBhIGZpbGVcblx0ZWxzZSBpZiAodHlwZW9mIGJ1aWxkQ29uZmlnLm91dCA9PT0gJ3N0cmluZycpIHtcblxuXHRcdHNwYXduQnVpbGQod29ya2luZ0RpciwgYnVpbGRDb25maWcsIG9wdGltaXplQ29uZmlnKTtcblxuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcignUHJvcGVydGllcyBcXCdtb2R1bGVzXFwnIG9yIFxcJ291dFxcJyBub3QgZGVmaW5lZCBpbiB0aGUgY29uZmlnIGZpbGUnKTtcblx0fVxufVxuIl19