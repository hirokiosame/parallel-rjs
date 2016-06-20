'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = spawnBuild;

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var workers = new Set();
var instances = 0;

function forkTask(request) {

	var worker = _child_process2.default.fork(__dirname + '/../Worker.js')

	// Exit with failure if fork fails minification
	.on('exit', function (exitCode) {

		// Propagate errors
		if (exitCode !== 0) {
			// console.log(arguments);
			process.exit(exitCode);
		}

		workers.delete(this);

		var completed = instances - workers.size;
		var percent = ~~(completed / instances * 100);

		(0, _log2.default)('Completed ' + completed + '/' + instances + ' (' + percent + '%) Remaining Workers: [' + Array.from(workers).map(function (w) {
			return w.pid;
		}) + ']\n');
	});

	instances++;

	workers.add(worker);

	worker.send(request);

	return worker;
}

function spawnUglification(buildConfig, config) {

	return forkTask({
		task: 'uglify2',
		config: {
			filePath: config.filePath,
			config: buildConfig.uglify2
		}
	});
}

function spawnBuild(cwd, buildConfig, optimize) {

	var worker = forkTask({
		task: 'build',
		cwd: cwd,
		buildConfig: buildConfig
	});

	if (optimize) {
		worker.on('message', spawnUglification.bind(this, buildConfig));
	}

	return worker;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9zcGF3bkJ1aWxkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztrQkFpRHdCLFU7O0FBL0N4Qjs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLFVBQVUsSUFBSSxHQUFKLEVBQWQ7QUFDQSxJQUFJLFlBQVksQ0FBaEI7O0FBRUEsU0FBUyxRQUFULENBQW1CLE9BQW5CLEVBQTJCOztBQUUxQixLQUFJLFNBQVMsd0JBQWMsSUFBZCxDQUFtQixZQUFZLGVBQS9COzs7QUFBQSxFQUdYLEVBSFcsQ0FHUixNQUhRLEVBR0EsVUFBUyxRQUFULEVBQWtCOzs7QUFHN0IsTUFBSSxhQUFhLENBQWpCLEVBQW9COztBQUVuQixXQUFRLElBQVIsQ0FBYSxRQUFiO0FBQ0E7O0FBRUQsVUFBUSxNQUFSLENBQWUsSUFBZjs7QUFFQSxNQUFJLFlBQVksWUFBWSxRQUFRLElBQXBDO0FBQ0EsTUFBSSxVQUFVLENBQUMsRUFBRSxZQUFVLFNBQVYsR0FBc0IsR0FBeEIsQ0FBZjs7QUFFQSxvQ0FBaUIsU0FBakIsU0FBOEIsU0FBOUIsVUFBNEMsT0FBNUMsK0JBQTZFLE1BQU0sSUFBTixDQUFXLE9BQVgsRUFBb0IsR0FBcEIsQ0FBd0I7QUFBQSxVQUFLLEVBQUUsR0FBUDtBQUFBLEdBQXhCLENBQTdFO0FBQ0EsRUFqQlcsQ0FBYjs7QUFtQkE7O0FBRUEsU0FBUSxHQUFSLENBQVksTUFBWjs7QUFFQSxRQUFPLElBQVAsQ0FBWSxPQUFaOztBQUVBLFFBQU8sTUFBUDtBQUNBOztBQUVELFNBQVMsaUJBQVQsQ0FBNEIsV0FBNUIsRUFBeUMsTUFBekMsRUFBaUQ7O0FBRWhELFFBQU8sU0FBUztBQUNmLFFBQU0sU0FEUztBQUVmLFVBQVE7QUFDUCxhQUFVLE9BQU8sUUFEVjtBQUVQLFdBQVEsWUFBWTtBQUZiO0FBRk8sRUFBVCxDQUFQO0FBT0E7O0FBRWMsU0FBUyxVQUFULENBQXFCLEdBQXJCLEVBQTBCLFdBQTFCLEVBQXVDLFFBQXZDLEVBQWlEOztBQUUvRCxLQUFJLFNBQVMsU0FBUztBQUNyQixRQUFNLE9BRGU7QUFFckIsVUFGcUI7QUFHckI7QUFIcUIsRUFBVCxDQUFiOztBQU1BLEtBQUksUUFBSixFQUFjO0FBQ2IsU0FBTyxFQUFQLENBQVUsU0FBVixFQUFxQixrQkFBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsRUFBNkIsV0FBN0IsQ0FBckI7QUFDQTs7QUFFRCxRQUFPLE1BQVA7QUFDQSIsImZpbGUiOiJzcGF3bkJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgY2hpbGRfcHJvY2VzcyBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2cnO1xuXG5sZXQgd29ya2VycyA9IG5ldyBTZXQoKTtcbmxldCBpbnN0YW5jZXMgPSAwO1xuXG5mdW5jdGlvbiBmb3JrVGFzayAocmVxdWVzdCl7XG5cblx0bGV0IHdvcmtlciA9IGNoaWxkX3Byb2Nlc3MuZm9yayhfX2Rpcm5hbWUgKyAnLy4uL1dvcmtlci5qcycpXG5cblx0XHQvLyBFeGl0IHdpdGggZmFpbHVyZSBpZiBmb3JrIGZhaWxzIG1pbmlmaWNhdGlvblxuXHRcdC5vbignZXhpdCcsIGZ1bmN0aW9uKGV4aXRDb2RlKXtcblxuXHRcdFx0Ly8gUHJvcGFnYXRlIGVycm9yc1xuXHRcdFx0aWYgKGV4aXRDb2RlICE9PSAwKSB7XG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKGFyZ3VtZW50cyk7XG5cdFx0XHRcdHByb2Nlc3MuZXhpdChleGl0Q29kZSk7XG5cdFx0XHR9XG5cblx0XHRcdHdvcmtlcnMuZGVsZXRlKHRoaXMpO1xuXG5cdFx0XHRsZXQgY29tcGxldGVkID0gaW5zdGFuY2VzIC0gd29ya2Vycy5zaXplO1xuXHRcdFx0bGV0IHBlcmNlbnQgPSB+fihjb21wbGV0ZWQvaW5zdGFuY2VzICogMTAwKTtcblxuXHRcdFx0bG9nKGBDb21wbGV0ZWQgJHtjb21wbGV0ZWR9LyR7aW5zdGFuY2VzfSAoJHtwZXJjZW50fSUpIFJlbWFpbmluZyBXb3JrZXJzOiBbJHtBcnJheS5mcm9tKHdvcmtlcnMpLm1hcCh3ID0+IHcucGlkKX1dXFxuYCk7XG5cdFx0fSk7XG5cblx0aW5zdGFuY2VzKys7XG5cblx0d29ya2Vycy5hZGQod29ya2VyKTtcblxuXHR3b3JrZXIuc2VuZChyZXF1ZXN0KTtcblxuXHRyZXR1cm4gd29ya2VyO1xufVxuXG5mdW5jdGlvbiBzcGF3blVnbGlmaWNhdGlvbiAoYnVpbGRDb25maWcsIGNvbmZpZykge1xuXG5cdHJldHVybiBmb3JrVGFzayh7XG5cdFx0dGFzazogJ3VnbGlmeTInLFxuXHRcdGNvbmZpZzoge1xuXHRcdFx0ZmlsZVBhdGg6IGNvbmZpZy5maWxlUGF0aCxcblx0XHRcdGNvbmZpZzogYnVpbGRDb25maWcudWdsaWZ5MlxuXHRcdH1cblx0fSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNwYXduQnVpbGQgKGN3ZCwgYnVpbGRDb25maWcsIG9wdGltaXplKSB7XG5cblx0bGV0IHdvcmtlciA9IGZvcmtUYXNrKHtcblx0XHR0YXNrOiAnYnVpbGQnLFxuXHRcdGN3ZCxcblx0XHRidWlsZENvbmZpZ1xuXHR9KTtcblxuXHRpZiAob3B0aW1pemUpIHtcblx0XHR3b3JrZXIub24oJ21lc3NhZ2UnLCBzcGF3blVnbGlmaWNhdGlvbi5iaW5kKHRoaXMsIGJ1aWxkQ29uZmlnKSk7XG5cdH1cblxuXHRyZXR1cm4gd29ya2VyO1xufVxuIl19