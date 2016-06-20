
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9mb3JrVGFzay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7Ozs7O2tCQWlEd0IsVTs7QUEvQ3hCOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUksVUFBVSxJQUFJLEdBQUosRUFBZDtBQUNBLElBQUksWUFBWSxDQUFoQjs7QUFFQSxTQUFTLFFBQVQsQ0FBbUIsT0FBbkIsRUFBMkI7O0FBRTFCLEtBQUksU0FBUyx3QkFBYyxJQUFkLENBQW1CLFlBQVksZUFBL0I7OztBQUFBLEVBR1gsRUFIVyxDQUdSLE1BSFEsRUFHQSxVQUFTLFFBQVQsRUFBa0I7OztBQUc3QixNQUFJLGFBQWEsQ0FBakIsRUFBb0I7O0FBRW5CLFdBQVEsSUFBUixDQUFhLFFBQWI7QUFDQTs7QUFFRCxVQUFRLE1BQVIsQ0FBZSxJQUFmOztBQUVBLE1BQUksWUFBWSxZQUFZLFFBQVEsSUFBcEM7QUFDQSxNQUFJLFVBQVUsQ0FBQyxFQUFFLFlBQVUsU0FBVixHQUFzQixHQUF4QixDQUFmOztBQUVBLG9DQUFpQixTQUFqQixTQUE4QixTQUE5QixVQUE0QyxPQUE1QywrQkFBNkUsTUFBTSxJQUFOLENBQVcsT0FBWCxFQUFvQixHQUFwQixDQUF3QjtBQUFBLFVBQUssRUFBRSxHQUFQO0FBQUEsR0FBeEIsQ0FBN0U7QUFDQSxFQWpCVyxDQUFiOztBQW1CQTs7QUFFQSxTQUFRLEdBQVIsQ0FBWSxNQUFaOztBQUVBLFFBQU8sSUFBUCxDQUFZLE9BQVo7O0FBRUEsUUFBTyxNQUFQO0FBQ0E7O0FBRUQsU0FBUyxpQkFBVCxDQUE0QixXQUE1QixFQUF5QyxNQUF6QyxFQUFpRDs7QUFFaEQsUUFBTyxTQUFTO0FBQ2YsUUFBTSxTQURTO0FBRWYsVUFBUTtBQUNQLGFBQVUsT0FBTyxRQURWO0FBRVAsV0FBUSxZQUFZO0FBRmI7QUFGTyxFQUFULENBQVA7QUFPQTs7QUFFYyxTQUFTLFVBQVQsQ0FBcUIsR0FBckIsRUFBMEIsV0FBMUIsRUFBdUMsUUFBdkMsRUFBaUQ7O0FBRS9ELEtBQUksU0FBUyxTQUFTO0FBQ3JCLFFBQU0sT0FEZTtBQUVyQixVQUZxQjtBQUdyQjtBQUhxQixFQUFULENBQWI7O0FBTUEsS0FBSSxRQUFKLEVBQWM7QUFDYixTQUFPLEVBQVAsQ0FBVSxTQUFWLEVBQXFCLGtCQUFrQixJQUFsQixDQUF1QixJQUF2QixFQUE2QixXQUE3QixDQUFyQjtBQUNBOztBQUVELFFBQU8sTUFBUDtBQUNBIiwiZmlsZSI6ImZvcmtUYXNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBjaGlsZF9wcm9jZXNzIGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZyc7XG5cbmxldCB3b3JrZXJzID0gbmV3IFNldCgpO1xubGV0IGluc3RhbmNlcyA9IDA7XG5cbmZ1bmN0aW9uIGZvcmtUYXNrIChyZXF1ZXN0KXtcblxuXHRsZXQgd29ya2VyID0gY2hpbGRfcHJvY2Vzcy5mb3JrKF9fZGlybmFtZSArICcvLi4vV29ya2VyLmpzJylcblxuXHRcdC8vIEV4aXQgd2l0aCBmYWlsdXJlIGlmIGZvcmsgZmFpbHMgbWluaWZpY2F0aW9uXG5cdFx0Lm9uKCdleGl0JywgZnVuY3Rpb24oZXhpdENvZGUpe1xuXG5cdFx0XHQvLyBQcm9wYWdhdGUgZXJyb3JzXG5cdFx0XHRpZiAoZXhpdENvZGUgIT09IDApIHtcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coYXJndW1lbnRzKTtcblx0XHRcdFx0cHJvY2Vzcy5leGl0KGV4aXRDb2RlKTtcblx0XHRcdH1cblxuXHRcdFx0d29ya2Vycy5kZWxldGUodGhpcyk7XG5cblx0XHRcdGxldCBjb21wbGV0ZWQgPSBpbnN0YW5jZXMgLSB3b3JrZXJzLnNpemU7XG5cdFx0XHRsZXQgcGVyY2VudCA9IH5+KGNvbXBsZXRlZC9pbnN0YW5jZXMgKiAxMDApO1xuXG5cdFx0XHRsb2coYENvbXBsZXRlZCAke2NvbXBsZXRlZH0vJHtpbnN0YW5jZXN9ICgke3BlcmNlbnR9JSkgUmVtYWluaW5nIFdvcmtlcnM6IFske0FycmF5LmZyb20od29ya2VycykubWFwKHcgPT4gdy5waWQpfV1cXG5gKTtcblx0XHR9KTtcblxuXHRpbnN0YW5jZXMrKztcblxuXHR3b3JrZXJzLmFkZCh3b3JrZXIpO1xuXG5cdHdvcmtlci5zZW5kKHJlcXVlc3QpO1xuXG5cdHJldHVybiB3b3JrZXI7XG59XG5cbmZ1bmN0aW9uIHNwYXduVWdsaWZpY2F0aW9uIChidWlsZENvbmZpZywgY29uZmlnKSB7XG5cblx0cmV0dXJuIGZvcmtUYXNrKHtcblx0XHR0YXNrOiAndWdsaWZ5MicsXG5cdFx0Y29uZmlnOiB7XG5cdFx0XHRmaWxlUGF0aDogY29uZmlnLmZpbGVQYXRoLFxuXHRcdFx0Y29uZmlnOiBidWlsZENvbmZpZy51Z2xpZnkyXG5cdFx0fVxuXHR9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3Bhd25CdWlsZCAoY3dkLCBidWlsZENvbmZpZywgb3B0aW1pemUpIHtcblxuXHRsZXQgd29ya2VyID0gZm9ya1Rhc2soe1xuXHRcdHRhc2s6ICdidWlsZCcsXG5cdFx0Y3dkLFxuXHRcdGJ1aWxkQ29uZmlnXG5cdH0pO1xuXG5cdGlmIChvcHRpbWl6ZSkge1xuXHRcdHdvcmtlci5vbignbWVzc2FnZScsIHNwYXduVWdsaWZpY2F0aW9uLmJpbmQodGhpcywgYnVpbGRDb25maWcpKTtcblx0fVxuXG5cdHJldHVybiB3b3JrZXI7XG59XG4iXX0=