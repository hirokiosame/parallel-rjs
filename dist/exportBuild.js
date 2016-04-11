"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = executeBuild;
function executeBuild(data) {
	var buildConfig = data.buildConfig;


	console.log(buildConfig);

	// var buildID = (~~(Math.random() * 1000000000)).toString(36);
	// var buildConfigFile = '.' + buildID + '.js';

	// // Set config
	// buildConfig.modules = moduleGroup;
	// var tempBuildDir = buildConfig.dir = path.join(tmpdir, buildID);

	// fs.writeFileSync(buildConfigFile, JSON.stringify(buildConfig, 0, 4));

	// // Make output directories
	// moduleGroup.forEach(function(module){
	// 	mkDirP(buildDir, module.name);
	// });

	// var cmd = 'node "vendor/r.js" -o "' + buildConfigFile + '" optimize=none';

	// console.log('Executing', cmd);
	// exec(cmd, function(error, stdout, stderr) {

	// 	if (error) {
	// 		console.log(error);
	// 		console.log(stdout);
	// 		console.log(stderr);
	// 		throw error;
	// 	}

	// 	moduleGroup.forEach(function(module){

	// 		var buildPath = path.join(tempBuildDir, module.name + ".js");
	// 		var destPath = path.join(buildDir, module.name + ".js");

	// 		console.log("DONE!", buildPath, destPath);
	// 		// Move to real output dir
	// 		fs.renameSync(buildPath, destPath);
	// 	});

	// 	// console.log(buildPath);
	// 	// console.log(destPath);

	// 	// Cleanup
	// 	fs.unlinkSync(buildConfigFile);

	// 	// fs.rmdirSync(buildConfig.dir);
	// });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leHBvcnRCdWlsZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztrQkFBd0I7QUFBVCxTQUFTLFlBQVQsQ0FBc0IsSUFBdEIsRUFBMkI7S0FFbkMsY0FBZ0IsS0FBaEIsWUFGbUM7OztBQUl6QyxTQUFRLEdBQVIsQ0FBWSxXQUFaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSnlDLENBQTNCIiwiZmlsZSI6ImV4cG9ydEJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXhlY3V0ZUJ1aWxkKGRhdGEpe1xuXG5cdGxldCB7IGJ1aWxkQ29uZmlnIH0gPSBkYXRhO1xuXG5cdGNvbnNvbGUubG9nKGJ1aWxkQ29uZmlnKTtcblxuXHQvLyB2YXIgYnVpbGRJRCA9ICh+fihNYXRoLnJhbmRvbSgpICogMTAwMDAwMDAwMCkpLnRvU3RyaW5nKDM2KTtcblx0Ly8gdmFyIGJ1aWxkQ29uZmlnRmlsZSA9ICcuJyArIGJ1aWxkSUQgKyAnLmpzJztcblxuXHQvLyAvLyBTZXQgY29uZmlnXG5cdC8vIGJ1aWxkQ29uZmlnLm1vZHVsZXMgPSBtb2R1bGVHcm91cDtcblx0Ly8gdmFyIHRlbXBCdWlsZERpciA9IGJ1aWxkQ29uZmlnLmRpciA9IHBhdGguam9pbih0bXBkaXIsIGJ1aWxkSUQpO1xuXG5cdC8vIGZzLndyaXRlRmlsZVN5bmMoYnVpbGRDb25maWdGaWxlLCBKU09OLnN0cmluZ2lmeShidWlsZENvbmZpZywgMCwgNCkpO1xuXG5cblx0Ly8gLy8gTWFrZSBvdXRwdXQgZGlyZWN0b3JpZXNcblx0Ly8gbW9kdWxlR3JvdXAuZm9yRWFjaChmdW5jdGlvbihtb2R1bGUpe1xuXHQvLyBcdG1rRGlyUChidWlsZERpciwgbW9kdWxlLm5hbWUpO1xuXHQvLyB9KTtcblxuXHQvLyB2YXIgY21kID0gJ25vZGUgXCJ2ZW5kb3Ivci5qc1wiIC1vIFwiJyArIGJ1aWxkQ29uZmlnRmlsZSArICdcIiBvcHRpbWl6ZT1ub25lJztcblxuXHQvLyBjb25zb2xlLmxvZygnRXhlY3V0aW5nJywgY21kKTtcblx0Ly8gZXhlYyhjbWQsIGZ1bmN0aW9uKGVycm9yLCBzdGRvdXQsIHN0ZGVycikge1xuXG5cdC8vIFx0aWYgKGVycm9yKSB7XG5cdC8vIFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdC8vIFx0XHRjb25zb2xlLmxvZyhzdGRvdXQpO1xuXHQvLyBcdFx0Y29uc29sZS5sb2coc3RkZXJyKTtcblx0Ly8gXHRcdHRocm93IGVycm9yO1xuXHQvLyBcdH1cblxuXHQvLyBcdG1vZHVsZUdyb3VwLmZvckVhY2goZnVuY3Rpb24obW9kdWxlKXtcblxuXHQvLyBcdFx0dmFyIGJ1aWxkUGF0aCA9IHBhdGguam9pbih0ZW1wQnVpbGREaXIsIG1vZHVsZS5uYW1lICsgXCIuanNcIik7XG5cdC8vIFx0XHR2YXIgZGVzdFBhdGggPSBwYXRoLmpvaW4oYnVpbGREaXIsIG1vZHVsZS5uYW1lICsgXCIuanNcIik7XG5cblx0Ly8gXHRcdGNvbnNvbGUubG9nKFwiRE9ORSFcIiwgYnVpbGRQYXRoLCBkZXN0UGF0aCk7XG5cdC8vIFx0XHQvLyBNb3ZlIHRvIHJlYWwgb3V0cHV0IGRpclxuXHQvLyBcdFx0ZnMucmVuYW1lU3luYyhidWlsZFBhdGgsIGRlc3RQYXRoKTtcblx0Ly8gXHR9KTtcblxuXHQvLyBcdC8vIGNvbnNvbGUubG9nKGJ1aWxkUGF0aCk7XG5cdC8vIFx0Ly8gY29uc29sZS5sb2coZGVzdFBhdGgpO1xuXG5cdC8vIFx0Ly8gQ2xlYW51cFxuXHQvLyBcdGZzLnVubGlua1N5bmMoYnVpbGRDb25maWdGaWxlKTtcblxuXHQvLyBcdC8vIGZzLnJtZGlyU3luYyhidWlsZENvbmZpZy5kaXIpO1xuXHQvLyB9KTtcbn1cbiJdfQ==