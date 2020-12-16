const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../../assets/i18n');
const distPath = path.join(__dirname, 'valuesToTranslate.json');
const esJson = JSON.parse(fs.readFileSync(`${srcPath}/es.json`));
const enJson = JSON.parse(fs.readFileSync(`${srcPath}/en.json`));

const diffJson = (esJson, enJson) => {
	let result = {};
	Object.keys(esJson).forEach((key) => {
		if (enJson[key]) {
			if (typeof (enJson[key]) === 'object') {
				result[key] = diffJson(esJson[key], enJson[key]);
			}
		} else {
			result[key] = esJson[key];
		}
	});
	return result;
}

const clean = (obj) => {
	let cleanedObj = Object.assign({}, obj)
	var isEmpty = true;
	for (var key in cleanedObj) {
		var val = cleanedObj[key];
		if (val === null || typeof val !== 'object' || (cleanedObj[key] = clean(val))) {
			isEmpty = false;
		} else {
			delete cleanedObj[key];
		}
	}
	return isEmpty ? undefined : cleanedObj;
}

const diffObj = diffJson(esJson, enJson);
const result = clean(diffObj);

if (result) {
	fs.writeFile(distPath, JSON.stringify(result, null, 2), (err) => {
		if (err) {
			console.log("An error ocurred writing file.");
		}
		console.log(`JSON with new tranlsates has been saved in: ${distPath}`);
	});
} else {
	console.log("No new translations found");
}