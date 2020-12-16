const fs = require('fs');
const path = require('path');

const originPath = path.join(__dirname, 'valuesToTranslate.json');
const sourcePath = path.join(__dirname, '../../assets/i18n/en.json');
const originJson = JSON.parse(fs.readFileSync(originPath));
const sourceJson = JSON.parse(fs.readFileSync(sourcePath));

const isObject = (item) => {
	return (item && typeof item === 'object' && !Array.isArray(item));
}

const mergeDeep = (target, ...sources) => {
	if (!sources.length) return target;
	const source = sources.shift();

	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!target[key]) Object.assign(target, { [key]: {} });
				mergeDeep(target[key], source[key]);
			} else {
				Object.assign(target, { [key]: source[key] });
			}
		}
	}

	return mergeDeep(target, ...sources);
}

const defaultSortFn = (a, b) => {
	return a.localeCompare(b);
}

const sort = (src) => {
	var out;

	if (Array.isArray(src)) {
		return src.map(function (item) {
			return sort(item);
		});
	}

	if (isObject(src)) {
		out = {};

		Object.keys(src).sort(defaultSortFn).forEach(function (key) {
			out[key] = sort(src[key]);
		});

		return out;
	}

	return src;
}

const mergeObj = mergeDeep(originJson, sourceJson);
const sortedObj = sort(mergeObj);

fs.writeFile(sourcePath, JSON.stringify(sortedObj, null, 2), (err) => {
	if (err) {
		console.log("An error ocurred writing file.");
	}
	console.log(`en.json was updated with succes in: ${sourcePath}`);
});