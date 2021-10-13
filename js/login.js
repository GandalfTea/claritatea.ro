
//if(localStorage.getItem("myToken") === null) {
//	$('.admin-panel').hide();
//} else {
//	$('.login').hide();
//	// . . .
//}

const correctHash = 'e03f94b3e452e6666315e95cebfc35e526e0c45e6f392648edc827249a7e19f6bfa67dfb7087636d54243093ae21f49d443a26b672d9a0b36922c1eb90564eb6';


async function digestInput(input) {
	const encoder = new TextEncoder().encode(input);
	const hashBuffer = await crypto.subtle.digest('SHA-512', encoder);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
	return hashHex;
}

function checkKey(buttonPress) {
	const input = buttonPress.previousElementSibling.value;
	digestInput(input).then(buffer => {
		if(buffer === correctHash) {
			$('.login').hide();
			$('.admin-panel').show()

			fetch('https://jsonbin.org/_/bearer', {
				headers: {
					"content-type": "application/json",
					"authorization" : "token " + input 
				}
			}).then(function (response) {
				if(response.ok) {
					return response.json();
				}
				return promise.reject(response);
			}).then(function(data) {
				console.log(data);
				sessionStorage.setItem('mytoken', data.token);
			}).catch(function(error) {
				console.warn(error);
			});

		} else {
			$('#token').val("");
			$('#token').effect("shake");
		}
	});
}
