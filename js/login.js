
import  { getDataPipeline } from './admin.js'

const correctHash = '36d7094371614548480bc8489014225d791e2a121a2d8d7d4fe14ad91bf81ab26f1706c010452c1849883a47461631559b26dd6160bea889dbb6c9d9f20a7db6';


async function digestInput(input) {
	const encoder = new TextEncoder().encode(input);
	const hashBuffer = await crypto.subtle.digest('SHA-512', encoder);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
	console.log(hashHex)
	return hashHex;
}

window.checkKey = checkKey;
function checkKey(buttonPress) {
    // remove button function to prevent multiple presses
	const input = buttonPress.previousElementSibling.value;
	digestInput(input).then(buffer => {
		if(buffer === correctHash) {

			// UI
			document.getElementById('token').style.border = "2px dotted #00b000"
			// save to cookies
			getDataPipeline()

               		 // Change Admin UI
	    		$('.login').hide();
	    		$('.admin-panel').show()


		} else {
			$('#token').val("");
			//$('#token').effect("shake");
			
		  document.getElementsByClassName('page_title')[0].style.marginBottom = '30px';

			if(!document.body.contains(document.getElementsByClassName('login__notification')[0])) {
				// insert notif
				var notif = document.createElement('div');
				notif.classList.add("login__notification");
				var text = document.createElement('p');
				text.innerText = "Parola gresita.";
				notif.appendChild(text);

				const pos = document.getElementById('token').parentNode.parentNode
				pos.insertBefore(notif, document.getElementById('token').parentNode)
			} else {

			}
		}
	});
}
