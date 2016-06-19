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

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
	var _loop = function _loop() {
		var buildConfigPath = _step.value;


		// Read r.js config file
		var buildConfig = (0, _readBuildConfig2.default)(buildConfigPath);

		// Unnecessary since we are deleting all non-entry points
		buildConfig.removeCombined = false;

		// Save optimize config and disable rjs so we can handle it
		var optimize = buildConfig.optimize;
		buildConfig.optimize = 'none';

		buildConfigPath = _path2.default.dirname(buildConfigPath);

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

					// Spawn fork and send task
					// Note: Consider only spawning only the number CPU the computer has to reduce intensiveness
					(0, _forkTask2.default)({
						task: 'build',
						cwd: buildConfigPath,
						config: buildConfig
					})

					// Completion
					.on('message', function (config) {

						console.log('completed!', config, _yargs.argv.optimize, optimize);
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

				(0, _forkTask2.default)({
					task: 'build',
					cwd: buildConfigPath,
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
			} else {
				throw new Error('Properties \'modules\' or \'out\' not defined in the config file');
			}
	};

	for (var _iterator = _yargs.argv._[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O01BSVMsZTs7OztBQUdSLE1BQUksY0FBYywrQkFBZ0IsZUFBaEIsQ0FBbEI7OztBQUdBLGNBQVksY0FBWixHQUE2QixLQUE3Qjs7O0FBR0EsTUFBSSxXQUFXLFlBQVksUUFBM0I7QUFDQSxjQUFZLFFBQVosR0FBdUIsTUFBdkI7O0FBR0Esb0JBQWtCLGVBQUssT0FBTCxDQUFhLGVBQWIsQ0FBbEI7OztBQUdBLE1BQUksWUFBWSxPQUFaLFlBQStCLEtBQW5DLEVBQTBDOztBQUV6QyxPQUFJLGVBQWUsaUNBQWtCLFlBQVksT0FBOUIsQ0FBbkI7O0FBRnlDO0FBQUE7QUFBQTs7QUFBQTtBQUl6QywwQkFBd0IsWUFBeEIsbUlBQXNDO0FBQUEsU0FBN0IsV0FBNkI7OztBQUVyQyxpQkFBWSxPQUFaLEdBQXNCLFdBQXRCOzs7O0FBSUEsNkJBQVM7QUFDUixZQUFNLE9BREU7QUFFUixXQUFLLGVBRkc7QUFHUixjQUFRO0FBSEEsTUFBVDs7O0FBQUEsTUFPQyxFQVBELENBT0ksU0FQSixFQU9lLFVBQVMsTUFBVCxFQUFnQjs7QUFFOUIsY0FBUSxHQUFSLENBQVksWUFBWixFQUEwQixNQUExQixFQUFrQyxZQUFLLFFBQXZDLEVBQWlELFFBQWpEO0FBQ0EsVUFBSSxDQUFDLFlBQUssUUFBTCxJQUFpQixRQUFsQixNQUFnQyxTQUFwQyxFQUErQzs7QUFFOUMsK0JBQVM7QUFDUixjQUFNLFNBREU7QUFFUixnQkFBUTtBQUNQLG1CQUFVLE9BQU8sUUFEVjtBQUVQLGlCQUFRLFlBQVk7QUFGYjtBQUZBLFFBQVQ7QUFPQTtBQUNELE1BcEJEO0FBcUJBO0FBL0J3QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBZ0N6Qzs7O0FBaENELE9BbUNLLElBQUksT0FBTyxZQUFZLEdBQW5CLEtBQTJCLFFBQS9CLEVBQXlDOztBQUU3Qyw0QkFBUztBQUNSLFdBQU0sT0FERTtBQUVSLFVBQUssZUFGRztBQUdSLGFBQVE7QUFIQSxLQUFUOzs7QUFBQSxLQU9DLEVBUEQsQ0FPSSxTQVBKLEVBT2UsVUFBUyxNQUFULEVBQWdCOztBQUU5QixTQUFJLENBQUMsWUFBSyxRQUFMLElBQWlCLFFBQWxCLE1BQWdDLFNBQXBDLEVBQStDOztBQUU5Qyw4QkFBUztBQUNSLGFBQU0sU0FERTtBQUVSLGVBQVE7QUFDUCxrQkFBVSxPQUFPLFFBRFY7QUFFUCxnQkFBUSxZQUFZO0FBRmI7QUFGQSxPQUFUO0FBT0E7QUFDRCxLQW5CRDtBQXNCQSxJQXhCSSxNQXdCRTtBQUNOLFVBQU0sSUFBSSxLQUFKLENBQVUsa0VBQVYsQ0FBTjtBQUNBOzs7QUE3RUYsc0JBQTRCLFlBQUssQ0FBakMsOEhBQW9DO0FBQUE7QUE4RW5DIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJztcbmltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJztcblxuaW1wb3J0IHsgYXJndiB9IGZyb20gJ3lhcmdzJztcblxuXG5pbXBvcnQgcmVhZEJ1aWxkQ29uZmlnIGZyb20gJy4vdXRpbHMvcmVhZEJ1aWxkQ29uZmlnJztcbmltcG9ydCBncm91cE1vZHVsZXNCeURlcCBmcm9tICcuL3V0aWxzL2dyb3VwTW9kdWxlc0J5RGVwJztcbmltcG9ydCBmb3JrVGFzayBmcm9tICcuL3V0aWxzL2ZvcmtUYXNrJztcblxuaW1wb3J0IGxvZyBmcm9tICcuL3V0aWxzL2xvZyc7XG5cblxuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHV0aWwgZnJvbSAndXRpbCc7XG5cblxuXG5mb3IgKGxldCBidWlsZENvbmZpZ1BhdGggb2YgYXJndi5fKSB7XG5cblx0Ly8gUmVhZCByLmpzIGNvbmZpZyBmaWxlXG5cdGxldCBidWlsZENvbmZpZyA9IHJlYWRCdWlsZENvbmZpZyhidWlsZENvbmZpZ1BhdGgpO1xuXG5cdC8vIFVubmVjZXNzYXJ5IHNpbmNlIHdlIGFyZSBkZWxldGluZyBhbGwgbm9uLWVudHJ5IHBvaW50c1xuXHRidWlsZENvbmZpZy5yZW1vdmVDb21iaW5lZCA9IGZhbHNlO1xuXG5cdC8vIFNhdmUgb3B0aW1pemUgY29uZmlnIGFuZCBkaXNhYmxlIHJqcyBzbyB3ZSBjYW4gaGFuZGxlIGl0XG5cdGxldCBvcHRpbWl6ZSA9IGJ1aWxkQ29uZmlnLm9wdGltaXplO1xuXHRidWlsZENvbmZpZy5vcHRpbWl6ZSA9ICdub25lJztcblxuXG5cdGJ1aWxkQ29uZmlnUGF0aCA9IHBhdGguZGlybmFtZShidWlsZENvbmZpZ1BhdGgpO1xuXG5cdC8vIE11bHRpcGxlIG91dHB1dHNcblx0aWYgKGJ1aWxkQ29uZmlnLm1vZHVsZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuXG5cdFx0bGV0IG1vZHVsZUdyb3VwcyA9IGdyb3VwTW9kdWxlc0J5RGVwKGJ1aWxkQ29uZmlnLm1vZHVsZXMpO1xuXG5cdFx0Zm9yIChsZXQgbW9kdWxlR3JvdXAgb2YgbW9kdWxlR3JvdXBzKSB7XG5cblx0XHRcdGJ1aWxkQ29uZmlnLm1vZHVsZXMgPSBtb2R1bGVHcm91cDtcblxuXHRcdFx0Ly8gU3Bhd24gZm9yayBhbmQgc2VuZCB0YXNrXG5cdFx0XHQvLyBOb3RlOiBDb25zaWRlciBvbmx5IHNwYXduaW5nIG9ubHkgdGhlIG51bWJlciBDUFUgdGhlIGNvbXB1dGVyIGhhcyB0byByZWR1Y2UgaW50ZW5zaXZlbmVzc1xuXHRcdFx0Zm9ya1Rhc2soe1xuXHRcdFx0XHR0YXNrOiAnYnVpbGQnLFxuXHRcdFx0XHRjd2Q6IGJ1aWxkQ29uZmlnUGF0aCxcblx0XHRcdFx0Y29uZmlnOiBidWlsZENvbmZpZ1xuXHRcdFx0fSlcblxuXHRcdFx0Ly8gQ29tcGxldGlvblxuXHRcdFx0Lm9uKCdtZXNzYWdlJywgZnVuY3Rpb24oY29uZmlnKXtcblxuXHRcdFx0XHRjb25zb2xlLmxvZygnY29tcGxldGVkIScsIGNvbmZpZywgYXJndi5vcHRpbWl6ZSwgb3B0aW1pemUpXG5cdFx0XHRcdGlmICgoYXJndi5vcHRpbWl6ZSB8fCBvcHRpbWl6ZSkgPT09ICd1Z2xpZnkyJykge1xuXG5cdFx0XHRcdFx0Zm9ya1Rhc2soe1xuXHRcdFx0XHRcdFx0dGFzazogJ3VnbGlmeTInLFxuXHRcdFx0XHRcdFx0Y29uZmlnOiB7XG5cdFx0XHRcdFx0XHRcdGZpbGVQYXRoOiBjb25maWcuZmlsZVBhdGgsXG5cdFx0XHRcdFx0XHRcdGNvbmZpZzogYnVpbGRDb25maWcudWdsaWZ5MlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvLyBPdXRwdXQgaXMgYSBmaWxlXG5cdGVsc2UgaWYgKHR5cGVvZiBidWlsZENvbmZpZy5vdXQgPT09ICdzdHJpbmcnKSB7XG5cblx0XHRmb3JrVGFzayh7XG5cdFx0XHR0YXNrOiAnYnVpbGQnLFxuXHRcdFx0Y3dkOiBidWlsZENvbmZpZ1BhdGgsXG5cdFx0XHRjb25maWc6IGJ1aWxkQ29uZmlnXG5cdFx0fSlcblxuXHRcdC8vIENvbXBsZXRpb25cblx0XHQub24oJ21lc3NhZ2UnLCBmdW5jdGlvbihjb25maWcpe1xuXG5cdFx0XHRpZiAoKGFyZ3Yub3B0aW1pemUgfHwgb3B0aW1pemUpID09PSAndWdsaWZ5MicpIHtcblxuXHRcdFx0XHRmb3JrVGFzayh7XG5cdFx0XHRcdFx0dGFzazogJ3VnbGlmeTInLFxuXHRcdFx0XHRcdGNvbmZpZzoge1xuXHRcdFx0XHRcdFx0ZmlsZVBhdGg6IGNvbmZpZy5maWxlUGF0aCxcblx0XHRcdFx0XHRcdGNvbmZpZzogYnVpbGRDb25maWcudWdsaWZ5MlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblxuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcignUHJvcGVydGllcyBcXCdtb2R1bGVzXFwnIG9yIFxcJ291dFxcJyBub3QgZGVmaW5lZCBpbiB0aGUgY29uZmlnIGZpbGUnKTtcblx0fVxufSJdfQ==