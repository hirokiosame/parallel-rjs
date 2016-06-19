'use strict';

require('babel-polyfill');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUdBOzs7O0FBQ0E7Ozs7Ozs7QUFHQSxJQUFJLGNBQWMsK0JBQWdCLFlBQUssQ0FBTCxDQUFPLENBQVAsQ0FBaEIsQ0FBbEI7OztBQUdBLFlBQVksY0FBWixHQUE2QixLQUE3Qjs7O0FBR0EsSUFBSSxXQUFXLFlBQVksUUFBM0I7QUFDQSxZQUFZLFFBQVosR0FBdUIsTUFBdkI7OztBQUdBLGtCQUFHLFVBQUgsQ0FBYyxlQUFLLE9BQUwsQ0FBYSxRQUFRLEdBQVIsRUFBYixFQUE0QixZQUFZLEdBQXhDLENBQWQ7OztBQUdBLElBQUksWUFBWSxPQUFaLFlBQStCLEtBQW5DLEVBQTBDOztBQUV6QyxLQUFJLGVBQWUsaUNBQWtCLFlBQVksT0FBOUIsQ0FBbkI7O0FBRnlDO0FBQUE7QUFBQTs7QUFBQTtBQUl6Qyx1QkFBd0IsWUFBeEIsOEhBQXNDO0FBQUEsT0FBN0IsV0FBNkI7OztBQUVyQyxlQUFZLE9BQVosR0FBc0IsV0FBdEI7Ozs7QUFJQSwyQkFBUztBQUNSLFVBQU0sT0FERTtBQUVSLFlBQVE7QUFGQSxJQUFUOzs7QUFBQSxJQU1DLEVBTkQsQ0FNSSxTQU5KLEVBTWUsVUFBUyxNQUFULEVBQWdCOztBQUU5QixRQUFJLENBQUMsWUFBSyxRQUFMLElBQWlCLFFBQWxCLE1BQWdDLFNBQXBDLEVBQStDOztBQUU5Qyw2QkFBUztBQUNSLFlBQU0sU0FERTtBQUVSLGNBQVE7QUFDUCxpQkFBVSxPQUFPLFFBRFY7QUFFUCxlQUFRLFlBQVk7QUFGYjtBQUZBLE1BQVQ7QUFPQTtBQUNELElBbEJEO0FBbUJBO0FBN0J3QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBOEJ6Qzs7O0FBOUJELEtBaUNLLElBQUksT0FBTyxZQUFZLEdBQW5CLEtBQTJCLFFBQS9CLEVBQXlDOzs7O0FBSTdDLEVBSkksTUFJRTtBQUNOLFNBQU0sSUFBSSxLQUFKLENBQVUsa0VBQVYsQ0FBTjtBQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJztcbmltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJztcblxuaW1wb3J0IHsgYXJndiB9IGZyb20gJ3lhcmdzJztcblxuXG5pbXBvcnQgcmVhZEJ1aWxkQ29uZmlnIGZyb20gJy4vdXRpbHMvcmVhZEJ1aWxkQ29uZmlnJztcbmltcG9ydCBncm91cE1vZHVsZXNCeURlcCBmcm9tICcuL3V0aWxzL2dyb3VwTW9kdWxlc0J5RGVwJztcbmltcG9ydCBmb3JrVGFzayBmcm9tICcuL3V0aWxzL2ZvcmtUYXNrJztcblxuaW1wb3J0IGxvZyBmcm9tICcuL3V0aWxzL2xvZyc7XG5cblxuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG4vLyBSZWFkIHIuanMgY29uZmlnIGZpbGVcbmxldFx0YnVpbGRDb25maWcgPSByZWFkQnVpbGRDb25maWcoYXJndi5fWzBdKTtcblxuLy8gVW5uZWNlc3Nhcnkgc2luY2Ugd2UgYXJlIGRlbGV0aW5nIGFsbCBub24tZW50cnkgcG9pbnRzXG5idWlsZENvbmZpZy5yZW1vdmVDb21iaW5lZCA9IGZhbHNlO1xuXG4vLyBTYXZlIG9wdGltaXplIGNvbmZpZyBhbmQgZGlzYWJsZSByanMgc28gd2UgY2FuIGhhbmRsZSBpdFxubGV0IG9wdGltaXplID0gYnVpbGRDb25maWcub3B0aW1pemU7XG5idWlsZENvbmZpZy5vcHRpbWl6ZSA9ICdub25lJztcblxuLy8gQ3JlYXRlIGRlc3QgZm9sZGVyXG5mcy5ta2RpcnNTeW5jKHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBidWlsZENvbmZpZy5kaXIpKTtcblxuLy8gTXVsdGlwbGUgb3V0cHV0c1xuaWYgKGJ1aWxkQ29uZmlnLm1vZHVsZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuXG5cdGxldCBtb2R1bGVHcm91cHMgPSBncm91cE1vZHVsZXNCeURlcChidWlsZENvbmZpZy5tb2R1bGVzKTtcblxuXHRmb3IgKGxldCBtb2R1bGVHcm91cCBvZiBtb2R1bGVHcm91cHMpIHtcblxuXHRcdGJ1aWxkQ29uZmlnLm1vZHVsZXMgPSBtb2R1bGVHcm91cDtcblxuXHRcdC8vIFNwYXduIGZvcmsgYW5kIHNlbmQgdGFza1xuXHRcdC8vIE5vdGU6IENvbnNpZGVyIG9ubHkgc3Bhd25pbmcgb25seSB0aGUgbnVtYmVyIENQVSB0aGUgY29tcHV0ZXIgaGFzIHRvIHJlZHVjZSBpbnRlbnNpdmVuZXNzXG5cdFx0Zm9ya1Rhc2soe1xuXHRcdFx0dGFzazogJ2J1aWxkJyxcblx0XHRcdGNvbmZpZzogYnVpbGRDb25maWdcblx0XHR9KVxuXG5cdFx0Ly8gQ29tcGxldGlvblxuXHRcdC5vbignbWVzc2FnZScsIGZ1bmN0aW9uKGNvbmZpZyl7XG5cblx0XHRcdGlmICgoYXJndi5vcHRpbWl6ZSB8fCBvcHRpbWl6ZSkgPT09ICd1Z2xpZnkyJykge1xuXG5cdFx0XHRcdGZvcmtUYXNrKHtcblx0XHRcdFx0XHR0YXNrOiAndWdsaWZ5MicsXG5cdFx0XHRcdFx0Y29uZmlnOiB7XG5cdFx0XHRcdFx0XHRmaWxlUGF0aDogY29uZmlnLmZpbGVQYXRoLFxuXHRcdFx0XHRcdFx0Y29uZmlnOiBidWlsZENvbmZpZy51Z2xpZnkyXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG4vLyBPdXRwdXQgaXMgYSBmaWxlXG5lbHNlIGlmICh0eXBlb2YgYnVpbGRDb25maWcub3V0ID09PSAnc3RyaW5nJykge1xuXG5cdC8vIGNvbnNvbGUubG9nKCcxIGZpbGUgY2FzZScpO1xuXG59IGVsc2Uge1xuXHR0aHJvdyBuZXcgRXJyb3IoJ1Byb3BlcnRpZXMgXFwnbW9kdWxlc1xcJyBvciBcXCdvdXRcXCcgbm90IGRlZmluZWQgaW4gdGhlIGNvbmZpZyBmaWxlJyk7XG59XG5cbiJdfQ==