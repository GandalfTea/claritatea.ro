


// GET NEWS FROM REST API AND UPDATE UI ON LOAD


var apiKey = "7208b932-4d8d-46f0-97b5-259c7b6d1fb6";

fetch('https://jsonbin.org/_/bearer', {
	headers: {
		"Content-Type": "application/json",
		"authorization" : "token 7208b932-4d8d-46f0-97b5-259c7b6d1fb6",
	}
}).then(function (response) {
	if(response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function(data) {
	console.log(data);
	sessionStorage.setItem('myToken', data.token);

}).catch(function(error) {
	console.warn(error);
});

fetch('https://jsonbin.org/me/wizards', {
			method: 'GET',
			headers: {
							'Content-Type': 'application/json',
							'Authorization': 'bearer ' + sessionStorage.getItem('myToken')
						},
}).then(function (response) {
			if (response.ok) {
							return response.json();
						}
			return Promise.reject(response);
}).then(function (data) {
			console.log(data);
}).catch(function (error) {
			return error.json();
});

