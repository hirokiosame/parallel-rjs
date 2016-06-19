'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = groupModulesByDep;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var moduleAttrs = ['include', 'exclude', 'excludeShallow', 'insertRequire', 'override.deps'];

function getModuleDeps(module) {

	var deps = [];

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = moduleAttrs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var att = _step.value;


			var path = att.split('.'),
			    checkProp = module;

			while (path.length > 1) {
				checkProp = checkProp[path.shift()];
			}

			if (!checkProp || !(checkProp[path[0]] instanceof Array)) {
				continue;
			}

			deps.push.apply(deps, _toConsumableArray(checkProp[path[0]]));
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

	return deps;
}

function groupModulesByDep(modulesArr) {

	var moduleMap = {},
	    groupedModules = [];

	// Create map
	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = modulesArr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var module = _step2.value;


			console.assert(!moduleMap[module.name], 'Duplicate module name');

			groupedModules.push(moduleMap[module.name] = new Set([module]));
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

	var _iteratorNormalCompletion3 = true;
	var _didIteratorError3 = false;
	var _iteratorError3 = undefined;

	try {
		for (var _iterator3 = modulesArr[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
			var _module = _step3.value;


			var dependencies = getModuleDeps(_module);

			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;

			try {
				for (var _iterator4 = dependencies[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var dep = _step4.value;

					if (!moduleMap[dep]) {
						continue;
					}

					moduleMap[dep].add(_module);
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}
		}

		// Sort by largest
	} catch (err) {
		_didIteratorError3 = true;
		_iteratorError3 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion3 && _iterator3.return) {
				_iterator3.return();
			}
		} finally {
			if (_didIteratorError3) {
				throw _iteratorError3;
			}
		}
	}

	groupedModules.sort(function (a, b) {
		return b.size - a.size;
	});

	var _loop = function _loop(i) {

		for (var j = groupedModules.length - 1; -1 < j; j--) {

			if (i === j) {
				continue;
			}

			// Check if they have anything in common
			var intersection = new Set([].concat(_toConsumableArray(groupedModules[j])).filter(function (x) {
				return groupedModules[i].has(x);
			}));

			if (intersection.size > 0) {

				// Merge build groups
				var _iteratorNormalCompletion5 = true;
				var _didIteratorError5 = false;
				var _iteratorError5 = undefined;

				try {
					for (var _iterator5 = groupedModules[j][Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
						var el = _step5.value;

						groupedModules[i].add(el);
					}
				} catch (err) {
					_didIteratorError5 = true;
					_iteratorError5 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion5 && _iterator5.return) {
							_iterator5.return();
						}
					} finally {
						if (_didIteratorError5) {
							throw _iteratorError5;
						}
					}
				}

				groupedModules.splice(j, 1);
			}
		}
	};

	for (var i = 0; i < groupedModules.length; i++) {
		_loop(i);
	}

	return groupedModules.map(function (modules) {
		return Array.from(modules);
	});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9ncm91cE1vZHVsZXNCeURlcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7a0JBeUJ3QixpQjs7OztBQXZCeEIsSUFBTSxjQUFjLENBQUMsU0FBRCxFQUFZLFNBQVosRUFBdUIsZ0JBQXZCLEVBQXlDLGVBQXpDLEVBQTBELGVBQTFELENBQXBCOztBQUVBLFNBQVMsYUFBVCxDQUF1QixNQUF2QixFQUErQjs7QUFFOUIsS0FBSSxPQUFPLEVBQVg7O0FBRjhCO0FBQUE7QUFBQTs7QUFBQTtBQUk5Qix1QkFBZ0IsV0FBaEIsOEhBQTZCO0FBQUEsT0FBcEIsR0FBb0I7OztBQUU1QixPQUFJLE9BQU8sSUFBSSxLQUFKLENBQVUsR0FBVixDQUFYO0FBQUEsT0FDQyxZQUFZLE1BRGI7O0FBR0EsVUFBTyxLQUFLLE1BQUwsR0FBYyxDQUFyQixFQUF3QjtBQUN2QixnQkFBWSxVQUFVLEtBQUssS0FBTCxFQUFWLENBQVo7QUFDQTs7QUFFRCxPQUFJLENBQUMsU0FBRCxJQUFjLEVBQUUsVUFBVSxLQUFLLENBQUwsQ0FBVixhQUE4QixLQUFoQyxDQUFsQixFQUEwRDtBQUFFO0FBQVc7O0FBRXZFLFFBQUssSUFBTCxnQ0FBYSxVQUFVLEtBQUssQ0FBTCxDQUFWLENBQWI7QUFDQTtBQWhCNkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFrQjlCLFFBQU8sSUFBUDtBQUNBOztBQUVjLFNBQVMsaUJBQVQsQ0FBMkIsVUFBM0IsRUFBdUM7O0FBRXJELEtBQUksWUFBWSxFQUFoQjtBQUFBLEtBQW9CLGlCQUFpQixFQUFyQzs7O0FBRnFEO0FBQUE7QUFBQTs7QUFBQTtBQU1yRCx3QkFBbUIsVUFBbkIsbUlBQStCO0FBQUEsT0FBdEIsTUFBc0I7OztBQUU5QixXQUFRLE1BQVIsQ0FBZSxDQUFDLFVBQVUsT0FBTyxJQUFqQixDQUFoQixFQUF3Qyx1QkFBeEM7O0FBRUEsa0JBQWUsSUFBZixDQUFvQixVQUFVLE9BQU8sSUFBakIsSUFBeUIsSUFBSSxHQUFKLENBQVEsQ0FBQyxNQUFELENBQVIsQ0FBN0M7QUFDQTtBQVhvRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQWFyRCx3QkFBbUIsVUFBbkIsbUlBQStCO0FBQUEsT0FBdEIsT0FBc0I7OztBQUU5QixPQUFJLGVBQWUsY0FBYyxPQUFkLENBQW5COztBQUY4QjtBQUFBO0FBQUE7O0FBQUE7QUFJOUIsMEJBQWdCLFlBQWhCLG1JQUE4QjtBQUFBLFNBQXJCLEdBQXFCOztBQUM3QixTQUFJLENBQUMsVUFBVSxHQUFWLENBQUwsRUFBcUI7QUFBRTtBQUFXOztBQUVsQyxlQUFVLEdBQVYsRUFBZSxHQUFmLENBQW1CLE9BQW5CO0FBQ0E7QUFSNkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVM5Qjs7O0FBdEJvRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQXlCckQsZ0JBQWUsSUFBZixDQUFvQixVQUFDLENBQUQsRUFBSSxDQUFKO0FBQUEsU0FBVyxFQUFFLElBQUYsR0FBUyxFQUFFLElBQXRCO0FBQUEsRUFBcEI7O0FBekJxRCw0QkEyQjVDLENBM0I0Qzs7QUE2QnBELE9BQUssSUFBSSxJQUFJLGVBQWUsTUFBZixHQUFzQixDQUFuQyxFQUFzQyxDQUFDLENBQUQsR0FBSyxDQUEzQyxFQUE4QyxHQUE5QyxFQUFtRDs7QUFFbEQsT0FBSSxNQUFNLENBQVYsRUFBYTtBQUFFO0FBQVc7OztBQUcxQixPQUFJLGVBQWUsSUFBSSxHQUFKLENBQVEsNkJBQUksZUFBZSxDQUFmLENBQUosR0FBdUIsTUFBdkIsQ0FBOEI7QUFBQSxXQUFLLGVBQWUsQ0FBZixFQUFrQixHQUFsQixDQUFzQixDQUF0QixDQUFMO0FBQUEsSUFBOUIsQ0FBUixDQUFuQjs7QUFFQSxPQUFJLGFBQWEsSUFBYixHQUFvQixDQUF4QixFQUEyQjs7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBRzFCLDJCQUFlLGVBQWUsQ0FBZixDQUFmLG1JQUFrQztBQUFBLFVBQXpCLEVBQXlCOztBQUNqQyxxQkFBZSxDQUFmLEVBQWtCLEdBQWxCLENBQXNCLEVBQXRCO0FBQ0E7QUFMeUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFPMUIsbUJBQWUsTUFBZixDQUFzQixDQUF0QixFQUF5QixDQUF6QjtBQUNBO0FBQ0Q7QUE3Q21EOztBQTJCckQsTUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLGVBQWUsTUFBbkMsRUFBMkMsR0FBM0MsRUFBZ0Q7QUFBQSxRQUF2QyxDQUF1QztBQW1CL0M7O0FBRUQsUUFBTyxlQUFlLEdBQWYsQ0FBbUI7QUFBQSxTQUFXLE1BQU0sSUFBTixDQUFXLE9BQVgsQ0FBWDtBQUFBLEVBQW5CLENBQVA7QUFDQSIsImZpbGUiOiJncm91cE1vZHVsZXNCeURlcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbW9kdWxlQXR0cnMgPSBbJ2luY2x1ZGUnLCAnZXhjbHVkZScsICdleGNsdWRlU2hhbGxvdycsICdpbnNlcnRSZXF1aXJlJywgJ292ZXJyaWRlLmRlcHMnXTtcblxuZnVuY3Rpb24gZ2V0TW9kdWxlRGVwcyhtb2R1bGUpIHtcblxuXHRsZXQgZGVwcyA9IFtdO1xuXG5cdGZvciAobGV0IGF0dCBvZiBtb2R1bGVBdHRycykge1xuXG5cdFx0bGV0IHBhdGggPSBhdHQuc3BsaXQoJy4nKSxcblx0XHRcdGNoZWNrUHJvcCA9IG1vZHVsZTtcblxuXHRcdHdoaWxlIChwYXRoLmxlbmd0aCA+IDEpIHtcblx0XHRcdGNoZWNrUHJvcCA9IGNoZWNrUHJvcFtwYXRoLnNoaWZ0KCldO1xuXHRcdH1cblxuXHRcdGlmICghY2hlY2tQcm9wIHx8ICEoY2hlY2tQcm9wW3BhdGhbMF1dIGluc3RhbmNlb2YgQXJyYXkpKSB7IGNvbnRpbnVlOyB9XG5cblx0XHRkZXBzLnB1c2goLi4uY2hlY2tQcm9wW3BhdGhbMF1dKTtcblx0fVxuXG5cdHJldHVybiBkZXBzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBncm91cE1vZHVsZXNCeURlcChtb2R1bGVzQXJyKSB7XG5cblx0bGV0IG1vZHVsZU1hcCA9IHt9LCBncm91cGVkTW9kdWxlcyA9IFtdO1xuXG5cblx0Ly8gQ3JlYXRlIG1hcFxuXHRmb3IgKGxldCBtb2R1bGUgb2YgbW9kdWxlc0Fycikge1xuXG5cdFx0Y29uc29sZS5hc3NlcnQoIW1vZHVsZU1hcFttb2R1bGUubmFtZV0sICdEdXBsaWNhdGUgbW9kdWxlIG5hbWUnKTtcblxuXHRcdGdyb3VwZWRNb2R1bGVzLnB1c2gobW9kdWxlTWFwW21vZHVsZS5uYW1lXSA9IG5ldyBTZXQoW21vZHVsZV0pKTtcblx0fVxuXG5cdGZvciAobGV0IG1vZHVsZSBvZiBtb2R1bGVzQXJyKSB7XG5cblx0XHRsZXQgZGVwZW5kZW5jaWVzID0gZ2V0TW9kdWxlRGVwcyhtb2R1bGUpO1xuXG5cdFx0Zm9yIChsZXQgZGVwIG9mIGRlcGVuZGVuY2llcykge1xuXHRcdFx0aWYgKCFtb2R1bGVNYXBbZGVwXSkgeyBjb250aW51ZTsgfVxuXG5cdFx0XHRtb2R1bGVNYXBbZGVwXS5hZGQobW9kdWxlKTtcblx0XHR9XG5cdH1cblxuXHQvLyBTb3J0IGJ5IGxhcmdlc3Rcblx0Z3JvdXBlZE1vZHVsZXMuc29ydCgoYSwgYikgPT4gIGIuc2l6ZSAtIGEuc2l6ZSk7XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBncm91cGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXG5cdFx0Zm9yIChsZXQgaiA9IGdyb3VwZWRNb2R1bGVzLmxlbmd0aC0xOyAtMSA8IGo7IGotLSkge1xuXG5cdFx0XHRpZiAoaSA9PT0gaikgeyBjb250aW51ZTsgfVxuXG5cdFx0XHQvLyBDaGVjayBpZiB0aGV5IGhhdmUgYW55dGhpbmcgaW4gY29tbW9uXG5cdFx0XHRsZXQgaW50ZXJzZWN0aW9uID0gbmV3IFNldChbLi4uZ3JvdXBlZE1vZHVsZXNbal1dLmZpbHRlcih4ID0+IGdyb3VwZWRNb2R1bGVzW2ldLmhhcyh4KSkpO1xuXG5cdFx0XHRpZiAoaW50ZXJzZWN0aW9uLnNpemUgPiAwKSB7XG5cblx0XHRcdFx0Ly8gTWVyZ2UgYnVpbGQgZ3JvdXBzXG5cdFx0XHRcdGZvciAobGV0IGVsIG9mIGdyb3VwZWRNb2R1bGVzW2pdKSB7XG5cdFx0XHRcdFx0Z3JvdXBlZE1vZHVsZXNbaV0uYWRkKGVsKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGdyb3VwZWRNb2R1bGVzLnNwbGljZShqLCAxKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZ3JvdXBlZE1vZHVsZXMubWFwKG1vZHVsZXMgPT4gQXJyYXkuZnJvbShtb2R1bGVzKSk7XG59XG4iXX0=