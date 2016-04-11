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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leHBvcnREZWZhdWx0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O2tCQUF3QjtBQUFULFNBQVMsWUFBVCxDQUFzQixJQUF0QixFQUEyQjtLQUVuQyxjQUFnQixLQUFoQixZQUZtQzs7O0FBSXpDLFNBQVEsR0FBUixDQUFZLFdBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFKeUMsQ0FBM0IiLCJmaWxlIjoiZXhwb3J0RGVmYXVsdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4ZWN1dGVCdWlsZChkYXRhKXtcblxuXHRsZXQgeyBidWlsZENvbmZpZyB9ID0gZGF0YTtcblxuXHRjb25zb2xlLmxvZyhidWlsZENvbmZpZyk7XG5cblx0Ly8gdmFyIGJ1aWxkSUQgPSAofn4oTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMDApKS50b1N0cmluZygzNik7XG5cdC8vIHZhciBidWlsZENvbmZpZ0ZpbGUgPSAnLicgKyBidWlsZElEICsgJy5qcyc7XG5cblx0Ly8gLy8gU2V0IGNvbmZpZ1xuXHQvLyBidWlsZENvbmZpZy5tb2R1bGVzID0gbW9kdWxlR3JvdXA7XG5cdC8vIHZhciB0ZW1wQnVpbGREaXIgPSBidWlsZENvbmZpZy5kaXIgPSBwYXRoLmpvaW4odG1wZGlyLCBidWlsZElEKTtcblxuXHQvLyBmcy53cml0ZUZpbGVTeW5jKGJ1aWxkQ29uZmlnRmlsZSwgSlNPTi5zdHJpbmdpZnkoYnVpbGRDb25maWcsIDAsIDQpKTtcblxuXG5cdC8vIC8vIE1ha2Ugb3V0cHV0IGRpcmVjdG9yaWVzXG5cdC8vIG1vZHVsZUdyb3VwLmZvckVhY2goZnVuY3Rpb24obW9kdWxlKXtcblx0Ly8gXHRta0RpclAoYnVpbGREaXIsIG1vZHVsZS5uYW1lKTtcblx0Ly8gfSk7XG5cblx0Ly8gdmFyIGNtZCA9ICdub2RlIFwidmVuZG9yL3IuanNcIiAtbyBcIicgKyBidWlsZENvbmZpZ0ZpbGUgKyAnXCIgb3B0aW1pemU9bm9uZSc7XG5cblx0Ly8gY29uc29sZS5sb2coJ0V4ZWN1dGluZycsIGNtZCk7XG5cdC8vIGV4ZWMoY21kLCBmdW5jdGlvbihlcnJvciwgc3Rkb3V0LCBzdGRlcnIpIHtcblxuXHQvLyBcdGlmIChlcnJvcikge1xuXHQvLyBcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHQvLyBcdFx0Y29uc29sZS5sb2coc3Rkb3V0KTtcblx0Ly8gXHRcdGNvbnNvbGUubG9nKHN0ZGVycik7XG5cdC8vIFx0XHR0aHJvdyBlcnJvcjtcblx0Ly8gXHR9XG5cblx0Ly8gXHRtb2R1bGVHcm91cC5mb3JFYWNoKGZ1bmN0aW9uKG1vZHVsZSl7XG5cblx0Ly8gXHRcdHZhciBidWlsZFBhdGggPSBwYXRoLmpvaW4odGVtcEJ1aWxkRGlyLCBtb2R1bGUubmFtZSArIFwiLmpzXCIpO1xuXHQvLyBcdFx0dmFyIGRlc3RQYXRoID0gcGF0aC5qb2luKGJ1aWxkRGlyLCBtb2R1bGUubmFtZSArIFwiLmpzXCIpO1xuXG5cdC8vIFx0XHRjb25zb2xlLmxvZyhcIkRPTkUhXCIsIGJ1aWxkUGF0aCwgZGVzdFBhdGgpO1xuXHQvLyBcdFx0Ly8gTW92ZSB0byByZWFsIG91dHB1dCBkaXJcblx0Ly8gXHRcdGZzLnJlbmFtZVN5bmMoYnVpbGRQYXRoLCBkZXN0UGF0aCk7XG5cdC8vIFx0fSk7XG5cblx0Ly8gXHQvLyBjb25zb2xlLmxvZyhidWlsZFBhdGgpO1xuXHQvLyBcdC8vIGNvbnNvbGUubG9nKGRlc3RQYXRoKTtcblxuXHQvLyBcdC8vIENsZWFudXBcblx0Ly8gXHRmcy51bmxpbmtTeW5jKGJ1aWxkQ29uZmlnRmlsZSk7XG5cblx0Ly8gXHQvLyBmcy5ybWRpclN5bmMoYnVpbGRDb25maWcuZGlyKTtcblx0Ly8gfSk7XG59XG4iXX0=