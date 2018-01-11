var request = require('request-promise');
var util = require('util');

// replace LUIS endpoint with your own
var luisEndpoint = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/62e31f0b-5705-46c1-84bf-80ef8087963f?subscription-key=67b08b9bfa8d413f8cc08ede370347bb&verbose=true&timezoneOffset=0&q=';
var luisUrlTemplate = `${luisEndpoint}&q=%s`;

function query(text) {
	return new Promise((resolve, reject) => {
		var queryUrl = util.format(luisUrlTemplate, encodeURIComponent(text));
		console.log(`invoking LUIS query: ${queryUrl}`);
		return request(queryUrl)
			.then((body) => {
				var result = JSON.parse(body);
				console.log(`got LUIS response: ${JSON.stringify(body, true, 2)}`);
				return resolve(result);				
			})
			.catch(err => {
				console.error(`error: ${JSON.stringify(err, true, 2)}`);
				return reject(err);
			});
	});
}

module.exports = {
	query
};

