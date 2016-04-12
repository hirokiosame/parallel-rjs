'use strict';

require('babel-polyfill');

require('source-map-support/register');

var _cluster = require('cluster');

var _cluster2 = _interopRequireDefault(_cluster);

var _readBuildConfig = require('./utils/readBuildConfig');

var _readBuildConfig2 = _interopRequireDefault(_readBuildConfig);

var _groupModulesByDep = require('./utils/groupModulesByDep');

var _groupModulesByDep2 = _interopRequireDefault(_groupModulesByDep);

var _executeBuild = require('./executeBuild');

var _executeBuild2 = _interopRequireDefault(_executeBuild);

var _uglifyFile = require('./uglifyFile');

var _uglifyFile2 = _interopRequireDefault(_uglifyFile);

var _log = require('./utils/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function forkTask(request) {

	var child = _cluster2.default.fork()

	// Exit with failure if fork fails minification
	.on('exit', function (exitCode) {

		// Propagate errors
		if (exitCode !== 0) {
			// console.log(arguments);
			process.exit(exitCode);
		}
	});

	child.send(request);

	return child;
}

// Forked worker: Wait for minification command
if (_cluster2.default.isWorker) {

	process.on('message', function (request) {

		if (request.task === 'build') {
			(0, _log2.default)('Spawned r.js builder');
			(0, _executeBuild2.default)(request.config);
		}

		if (request.task === 'uglify2') {
			(0, _log2.default)('Spawned uglifier');
			(0, _uglifyFile2.default)(request.config);
		}
	});
}

// Master: Parse config and delegate tasks
if (_cluster2.default.isMaster) {

	// Read r.js config file
	var buildConfig = (0, _readBuildConfig2.default)(process.argv[2]);

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
				forkTask({
					task: 'build',
					config: buildConfig
				})

				// Uglification request
				.on('message', function (config) {

					forkTask({
						task: 'uglify2',
						config: config
					});
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7QUFDQTs7QUFFQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQUdBLFNBQVMsUUFBVCxDQUFrQixPQUFsQixFQUEwQjs7QUFFekIsS0FBSSxRQUFRLGtCQUFRLElBQVI7OztFQUdWLEVBSFUsQ0FHUCxNQUhPLEVBR0MsVUFBUyxRQUFULEVBQWtCOzs7QUFHN0IsTUFBSSxhQUFhLENBQWIsRUFBZ0I7O0FBRW5CLFdBQVEsSUFBUixDQUFhLFFBQWIsRUFGbUI7R0FBcEI7RUFIVyxDQUhULENBRnFCOztBQWV6QixPQUFNLElBQU4sQ0FBVyxPQUFYLEVBZnlCOztBQWlCekIsUUFBTyxLQUFQLENBakJ5QjtDQUExQjs7O0FBcUJBLElBQUksa0JBQVEsUUFBUixFQUFrQjs7QUFFckIsU0FBUSxFQUFSLENBQVcsU0FBWCxFQUFzQixVQUFTLE9BQVQsRUFBaUI7O0FBRXRDLE1BQUksUUFBUSxJQUFSLEtBQWlCLE9BQWpCLEVBQTBCO0FBQzdCLHNCQUFJLHNCQUFKLEVBRDZCO0FBRTdCLCtCQUFhLFFBQVEsTUFBUixDQUFiLENBRjZCO0dBQTlCOztBQUtBLE1BQUksUUFBUSxJQUFSLEtBQWlCLFNBQWpCLEVBQTRCO0FBQy9CLHNCQUFJLGtCQUFKLEVBRCtCO0FBRS9CLDZCQUFXLFFBQVEsTUFBUixDQUFYLENBRitCO0dBQWhDO0VBUHFCLENBQXRCLENBRnFCO0NBQXRCOzs7QUFpQkEsSUFBSSxrQkFBUSxRQUFSLEVBQWtCOzs7QUFHckIsS0FBSSxjQUFjLCtCQUFnQixRQUFRLElBQVIsQ0FBYSxDQUFiLENBQWhCLENBQWQ7OztBQUhpQixLQU1qQixZQUFZLE9BQVosWUFBK0IsS0FBL0IsRUFBc0M7O0FBRXpDLE1BQUksZUFBZSxpQ0FBa0IsWUFBWSxPQUFaLENBQWpDLENBRnFDOzs7Ozs7O0FBSXpDLHdCQUF3QixzQ0FBeEIsb0dBQXNDO1FBQTdCLDBCQUE2Qjs7O0FBRXJDLGdCQUFZLE9BQVosR0FBc0IsV0FBdEI7Ozs7QUFGcUMsWUFNckMsQ0FBUztBQUNSLFdBQU0sT0FBTjtBQUNBLGFBQVEsV0FBUjtLQUZEOzs7S0FNQyxFQU5ELENBTUksU0FOSixFQU1lLFVBQVMsTUFBVCxFQUFnQjs7QUFFOUIsY0FBUztBQUNSLFlBQU0sU0FBTjtBQUNBLG9CQUZRO01BQVQsRUFGOEI7S0FBaEIsQ0FOZixDQU5xQztJQUF0Qzs7Ozs7Ozs7Ozs7Ozs7R0FKeUM7Ozs7QUFBMUMsTUEyQkssSUFBSSxPQUFPLFlBQVksR0FBWixLQUFvQixRQUEzQixFQUFxQzs7OztHQUF6QyxNQUlFO0FBQ04sVUFBTSxJQUFJLEtBQUosQ0FBVSxrRUFBVixDQUFOLENBRE07SUFKRjtDQWpDTiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICdiYWJlbC1wb2x5ZmlsbCc7XG5pbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG5cbmltcG9ydCBjbHVzdGVyIGZyb20gJ2NsdXN0ZXInO1xuXG5pbXBvcnQgcmVhZEJ1aWxkQ29uZmlnIGZyb20gJy4vdXRpbHMvcmVhZEJ1aWxkQ29uZmlnJztcbmltcG9ydCBncm91cE1vZHVsZXNCeURlcCBmcm9tICcuL3V0aWxzL2dyb3VwTW9kdWxlc0J5RGVwJztcblxuaW1wb3J0IGV4ZWN1dGVCdWlsZCBmcm9tICcuL2V4ZWN1dGVCdWlsZCc7XG5pbXBvcnQgdWdsaWZ5RmlsZSBmcm9tICcuL3VnbGlmeUZpbGUnO1xuXG5pbXBvcnQgbG9nIGZyb20gJy4vdXRpbHMvbG9nJztcblxuXG5mdW5jdGlvbiBmb3JrVGFzayhyZXF1ZXN0KXtcblxuXHRsZXQgY2hpbGQgPSBjbHVzdGVyLmZvcmsoKVxuXG5cdFx0Ly8gRXhpdCB3aXRoIGZhaWx1cmUgaWYgZm9yayBmYWlscyBtaW5pZmljYXRpb25cblx0XHQub24oJ2V4aXQnLCBmdW5jdGlvbihleGl0Q29kZSl7XG5cblx0XHRcdC8vIFByb3BhZ2F0ZSBlcnJvcnNcblx0XHRcdGlmIChleGl0Q29kZSAhPT0gMCkge1xuXHRcdFx0XHQvLyBjb25zb2xlLmxvZyhhcmd1bWVudHMpO1xuXHRcdFx0XHRwcm9jZXNzLmV4aXQoZXhpdENvZGUpO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0Y2hpbGQuc2VuZChyZXF1ZXN0KTtcblxuXHRyZXR1cm4gY2hpbGQ7XG59XG5cbi8vIEZvcmtlZCB3b3JrZXI6IFdhaXQgZm9yIG1pbmlmaWNhdGlvbiBjb21tYW5kXG5pZiAoY2x1c3Rlci5pc1dvcmtlcikge1xuXG5cdHByb2Nlc3Mub24oJ21lc3NhZ2UnLCBmdW5jdGlvbihyZXF1ZXN0KXtcblxuXHRcdGlmIChyZXF1ZXN0LnRhc2sgPT09ICdidWlsZCcpIHtcblx0XHRcdGxvZygnU3Bhd25lZCByLmpzIGJ1aWxkZXInKTtcblx0XHRcdGV4ZWN1dGVCdWlsZChyZXF1ZXN0LmNvbmZpZyk7XG5cdFx0fVxuXG5cdFx0aWYgKHJlcXVlc3QudGFzayA9PT0gJ3VnbGlmeTInKSB7XG5cdFx0XHRsb2coJ1NwYXduZWQgdWdsaWZpZXInKTtcblx0XHRcdHVnbGlmeUZpbGUocmVxdWVzdC5jb25maWcpO1xuXHRcdH1cblx0fSk7XG59XG5cbi8vIE1hc3RlcjogUGFyc2UgY29uZmlnIGFuZCBkZWxlZ2F0ZSB0YXNrc1xuaWYgKGNsdXN0ZXIuaXNNYXN0ZXIpIHtcblxuXHQvLyBSZWFkIHIuanMgY29uZmlnIGZpbGVcblx0bGV0XHRidWlsZENvbmZpZyA9IHJlYWRCdWlsZENvbmZpZyhwcm9jZXNzLmFyZ3ZbMl0pO1xuXG5cdC8vIE11bHRpcGxlIG91dHB1dHNcblx0aWYgKGJ1aWxkQ29uZmlnLm1vZHVsZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuXG5cdFx0bGV0IG1vZHVsZUdyb3VwcyA9IGdyb3VwTW9kdWxlc0J5RGVwKGJ1aWxkQ29uZmlnLm1vZHVsZXMpO1xuXG5cdFx0Zm9yIChsZXQgbW9kdWxlR3JvdXAgb2YgbW9kdWxlR3JvdXBzKSB7XG5cblx0XHRcdGJ1aWxkQ29uZmlnLm1vZHVsZXMgPSBtb2R1bGVHcm91cDtcblxuXHRcdFx0Ly8gU3Bhd24gZm9yayBhbmQgc2VuZCB0YXNrXG5cdFx0XHQvLyBOb3RlOiBDb25zaWRlciBvbmx5IHNwYXduaW5nIG9ubHkgdGhlIG51bWJlciBDUFUgdGhlIGNvbXB1dGVyIGhhcyB0byByZWR1Y2UgaW50ZW5zaXZlbmVzc1xuXHRcdFx0Zm9ya1Rhc2soe1xuXHRcdFx0XHR0YXNrOiAnYnVpbGQnLFxuXHRcdFx0XHRjb25maWc6IGJ1aWxkQ29uZmlnXG5cdFx0XHR9KVxuXG5cdFx0XHQvLyBVZ2xpZmljYXRpb24gcmVxdWVzdFxuXHRcdFx0Lm9uKCdtZXNzYWdlJywgZnVuY3Rpb24oY29uZmlnKXtcblxuXHRcdFx0XHRmb3JrVGFzayh7XG5cdFx0XHRcdFx0dGFzazogJ3VnbGlmeTInLFxuXHRcdFx0XHRcdGNvbmZpZ1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdC8vIE91dHB1dCBpcyBhIGZpbGVcblx0ZWxzZSBpZiAodHlwZW9mIGJ1aWxkQ29uZmlnLm91dCA9PT0gJ3N0cmluZycpIHtcblxuXHRcdC8vIGNvbnNvbGUubG9nKCcxIGZpbGUgY2FzZScpO1xuXG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdQcm9wZXJ0aWVzIFxcJ21vZHVsZXNcXCcgb3IgXFwnb3V0XFwnIG5vdCBkZWZpbmVkIGluIHRoZSBjb25maWcgZmlsZScpO1xuXHR9XG59Il19