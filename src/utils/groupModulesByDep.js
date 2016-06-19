'use strict';

const moduleAttrs = ['include', 'exclude', 'excludeShallow', 'insertRequire', 'override.deps'];

function getModuleDeps(module) {

	let deps = [];

	for (let att of moduleAttrs) {

		let path = att.split('.'),
			checkProp = module;

		while (path.length > 1) {
			checkProp = checkProp[path.shift()];
		}

		if (!checkProp || !(checkProp[path[0]] instanceof Array)) { continue; }

		deps.push(...checkProp[path[0]]);
	}

	return deps;
}

export default function groupModulesByDep(modulesArr) {

	let moduleMap = {}, groupedModules = [];


	// Create map
	for (let module of modulesArr) {

		console.assert(!moduleMap[module.name], 'Duplicate module name');

		groupedModules.push(moduleMap[module.name] = new Set([module]));
	}

	for (let module of modulesArr) {

		let dependencies = getModuleDeps(module);

		for (let dep of dependencies) {
			if (!moduleMap[dep]) { continue; }

			moduleMap[dep].add(module);
		}
	}

	// Sort by largest
	groupedModules.sort((a, b) =>  b.size - a.size);

	for (let i = 0; i < groupedModules.length; i++) {

		for (let j = groupedModules.length-1; -1 < j; j--) {

			if (i === j) { continue; }

			// Check if they have anything in common
			let intersection = new Set([...groupedModules[j]].filter(x => groupedModules[i].has(x)));

			if (intersection.size > 0) {

				// Merge build groups
				for (let el of groupedModules[j]) {
					groupedModules[i].add(el);
				}

				groupedModules.splice(j, 1);
			}
		}
	}

	return groupedModules.map(modules => Array.from(modules));
}
