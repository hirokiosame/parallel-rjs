'use strict';

// import 'babel-polyfill';

require('source-map-support/register');

var _yargs = require('yargs');

var _readBuildConfig = require('./utils/readBuildConfig');

var _readBuildConfig2 = _interopRequireDefault(_readBuildConfig);

var _groupModulesByDep = require('./utils/groupModulesByDep');

var _groupModulesByDep2 = _interopRequireDefault(_groupModulesByDep);

var _forkTask = require('./utils/forkTask');

var _forkTask2 = _interopRequireDefault(_forkTask);

var _log = require('./utils/log');

var _log2 = _interopRequireDefault(_log);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Read r.js config file
var buildConfig = (0, _readBuildConfig2.default)(_yargs.argv._[0]);

// Unnecessary since we are deleting all non-entry points
buildConfig.removeCombined = false;

// Save optimize config and disable rjs so we can handle it
var optimize = buildConfig.optimize;
buildConfig.optimize = 'none';

// Create dest folder
_fsExtra2.default.mkdirsSync(_path2.default.resolve(process.cwd(), buildConfig.dir));

// Multiple outputs
if (buildConfig.modules instanceof Array) {

	var moduleGroups = (0, _groupModulesByDep2.default)(buildConfig.modules);

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = moduleGroups[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var moduleGroup = _step.value;


			buildConfig.modules = moduleGroup;

			// Spawn fork and send task
			// Note: Consider only spawning only the number CPU the computer has to reduce intensiveness
			(0, _forkTask2.default)({
				task: 'build',
				config: buildConfig
			})

			// Completion
			.on('message', function (config) {

				if ((_yargs.argv.optimize || optimize) === 'uglify2') {

					(0, _forkTask2.default)({
						task: 'uglify2',
						config: {
							filePath: config.filePath,
							config: buildConfig.uglify2
						}
					});
				}
			});
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
}

// Output is a file
else if (typeof buildConfig.out === 'string') {

		// console.log('1 file case');

	} else {
			throw new Error('Properties \'modules\' or \'out\' not defined in the config file');
		}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQUdBOztBQUVBOztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBR0E7Ozs7QUFDQTs7Ozs7OztBQUdBLElBQUksY0FBYywrQkFBZ0IsWUFBSyxDQUFMLENBQU8sQ0FBUCxDQUFoQixDQUFsQjs7O0FBR0EsWUFBWSxjQUFaLEdBQTZCLEtBQTdCOzs7QUFHQSxJQUFJLFdBQVcsWUFBWSxRQUEzQjtBQUNBLFlBQVksUUFBWixHQUF1QixNQUF2Qjs7O0FBR0Esa0JBQUcsVUFBSCxDQUFjLGVBQUssT0FBTCxDQUFhLFFBQVEsR0FBUixFQUFiLEVBQTRCLFlBQVksR0FBeEMsQ0FBZDs7O0FBR0EsSUFBSSxZQUFZLE9BQVosWUFBK0IsS0FBbkMsRUFBMEM7O0FBRXpDLEtBQUksZUFBZSxpQ0FBa0IsWUFBWSxPQUE5QixDQUFuQjs7QUFGeUM7QUFBQTtBQUFBOztBQUFBO0FBSXpDLHVCQUF3QixZQUF4Qiw4SEFBc0M7QUFBQSxPQUE3QixXQUE2Qjs7O0FBRXJDLGVBQVksT0FBWixHQUFzQixXQUF0Qjs7OztBQUlBLDJCQUFTO0FBQ1IsVUFBTSxPQURFO0FBRVIsWUFBUTtBQUZBLElBQVQ7OztBQUFBLElBTUMsRUFORCxDQU1JLFNBTkosRUFNZSxVQUFTLE1BQVQsRUFBZ0I7O0FBRTlCLFFBQUksQ0FBQyxZQUFLLFFBQUwsSUFBaUIsUUFBbEIsTUFBZ0MsU0FBcEMsRUFBK0M7O0FBRTlDLDZCQUFTO0FBQ1IsWUFBTSxTQURFO0FBRVIsY0FBUTtBQUNQLGlCQUFVLE9BQU8sUUFEVjtBQUVQLGVBQVEsWUFBWTtBQUZiO0FBRkEsTUFBVDtBQU9BO0FBQ0QsSUFsQkQ7QUFtQkE7QUE3QndDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUE4QnpDOzs7QUE5QkQsS0FpQ0ssSUFBSSxPQUFPLFlBQVksR0FBbkIsS0FBMkIsUUFBL0IsRUFBeUM7Ozs7QUFJN0MsRUFKSSxNQUlFO0FBQ04sU0FBTSxJQUFJLEtBQUosQ0FBVSxrRUFBVixDQUFOO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8vIGltcG9ydCAnYmFiZWwtcG9seWZpbGwnO1xuaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuXG5pbXBvcnQgeyBhcmd2IH0gZnJvbSAneWFyZ3MnO1xuXG5cbmltcG9ydCByZWFkQnVpbGRDb25maWcgZnJvbSAnLi91dGlscy9yZWFkQnVpbGRDb25maWcnO1xuaW1wb3J0IGdyb3VwTW9kdWxlc0J5RGVwIGZyb20gJy4vdXRpbHMvZ3JvdXBNb2R1bGVzQnlEZXAnO1xuaW1wb3J0IGZvcmtUYXNrIGZyb20gJy4vdXRpbHMvZm9ya1Rhc2snO1xuXG5pbXBvcnQgbG9nIGZyb20gJy4vdXRpbHMvbG9nJztcblxuXG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbi8vIFJlYWQgci5qcyBjb25maWcgZmlsZVxubGV0XHRidWlsZENvbmZpZyA9IHJlYWRCdWlsZENvbmZpZyhhcmd2Ll9bMF0pO1xuXG4vLyBVbm5lY2Vzc2FyeSBzaW5jZSB3ZSBhcmUgZGVsZXRpbmcgYWxsIG5vbi1lbnRyeSBwb2ludHNcbmJ1aWxkQ29uZmlnLnJlbW92ZUNvbWJpbmVkID0gZmFsc2U7XG5cbi8vIFNhdmUgb3B0aW1pemUgY29uZmlnIGFuZCBkaXNhYmxlIHJqcyBzbyB3ZSBjYW4gaGFuZGxlIGl0XG5sZXQgb3B0aW1pemUgPSBidWlsZENvbmZpZy5vcHRpbWl6ZTtcbmJ1aWxkQ29uZmlnLm9wdGltaXplID0gJ25vbmUnO1xuXG4vLyBDcmVhdGUgZGVzdCBmb2xkZXJcbmZzLm1rZGlyc1N5bmMocGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIGJ1aWxkQ29uZmlnLmRpcikpO1xuXG4vLyBNdWx0aXBsZSBvdXRwdXRzXG5pZiAoYnVpbGRDb25maWcubW9kdWxlcyBpbnN0YW5jZW9mIEFycmF5KSB7XG5cblx0bGV0IG1vZHVsZUdyb3VwcyA9IGdyb3VwTW9kdWxlc0J5RGVwKGJ1aWxkQ29uZmlnLm1vZHVsZXMpO1xuXG5cdGZvciAobGV0IG1vZHVsZUdyb3VwIG9mIG1vZHVsZUdyb3Vwcykge1xuXG5cdFx0YnVpbGRDb25maWcubW9kdWxlcyA9IG1vZHVsZUdyb3VwO1xuXG5cdFx0Ly8gU3Bhd24gZm9yayBhbmQgc2VuZCB0YXNrXG5cdFx0Ly8gTm90ZTogQ29uc2lkZXIgb25seSBzcGF3bmluZyBvbmx5IHRoZSBudW1iZXIgQ1BVIHRoZSBjb21wdXRlciBoYXMgdG8gcmVkdWNlIGludGVuc2l2ZW5lc3Ncblx0XHRmb3JrVGFzayh7XG5cdFx0XHR0YXNrOiAnYnVpbGQnLFxuXHRcdFx0Y29uZmlnOiBidWlsZENvbmZpZ1xuXHRcdH0pXG5cblx0XHQvLyBDb21wbGV0aW9uXG5cdFx0Lm9uKCdtZXNzYWdlJywgZnVuY3Rpb24oY29uZmlnKXtcblxuXHRcdFx0aWYgKChhcmd2Lm9wdGltaXplIHx8IG9wdGltaXplKSA9PT0gJ3VnbGlmeTInKSB7XG5cblx0XHRcdFx0Zm9ya1Rhc2soe1xuXHRcdFx0XHRcdHRhc2s6ICd1Z2xpZnkyJyxcblx0XHRcdFx0XHRjb25maWc6IHtcblx0XHRcdFx0XHRcdGZpbGVQYXRoOiBjb25maWcuZmlsZVBhdGgsXG5cdFx0XHRcdFx0XHRjb25maWc6IGJ1aWxkQ29uZmlnLnVnbGlmeTJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cbi8vIE91dHB1dCBpcyBhIGZpbGVcbmVsc2UgaWYgKHR5cGVvZiBidWlsZENvbmZpZy5vdXQgPT09ICdzdHJpbmcnKSB7XG5cblx0Ly8gY29uc29sZS5sb2coJzEgZmlsZSBjYXNlJyk7XG5cbn0gZWxzZSB7XG5cdHRocm93IG5ldyBFcnJvcignUHJvcGVydGllcyBcXCdtb2R1bGVzXFwnIG9yIFxcJ291dFxcJyBub3QgZGVmaW5lZCBpbiB0aGUgY29uZmlnIGZpbGUnKTtcbn1cblxuIl19