

// 1. GET info from the cloud document
// 2. Display info in DOM
// 3. Wait for action
// 		* ADD new entry
// 		* EDIT already existing entry
// 		* DEL entry
// 4. Execute Action (DOM)
// 5. PUT changes to cloud document



// Data Pipeline

function getJSON() {
	const token = sessionStorage.getItem("mytoken");

	fetch('https://jsonbin.org/gandalftea/wizards', {
		headers: {
			"content-type": "application/json",
			"authorization" : "bearer " + token 
		}
	}).then(function (response) {
		if(response.ok) {
			return response.json();
		}
		return promise.reject(response);
	}).then(function(data) {
			console.log(data.length);

	}).catch(function(error) {
		console.warn(error);
	});

}

function createDOM() {

}

function getDataPipeline() {

}



// UI Elements

var fields = 0;

function addNewsField( value = "" ) {
	fields += 1;

	var entry = document.createElement("div");
	entry.classList.add("news-field__entry--first"); 

	var text = document.createElement("div");
	text.classList.add("news-field__text")

	var textfield = document.createElement("span");
	textfield.classList.add("news-field__textfield");
	textfield.contentEditable = "true";
	textfield.role = "textbox";
	textfield.innerText = value;

	// BUTTONS
	var edit = document.createElement("button");
	edit.classList.add("news-field__buttons--edit");
	edit.innerHTML = "<img src='./img/edit.svg' id='edit-button'/>";
	edit.setAttribute("onclick", "saveNewsField(this)");

	var del = document.createElement("button");
	del.classList.add("news-field__buttons--del");
	del.innerHTML = "<img src='./img/plus.svg' id='del'/>";
	del.setAttribute("onclick", "removeNewsField(this)");
	
	var buttons = document.createElement("div");
 	buttons.classList.add("news-field__buttons--encap");
	buttons.appendChild(edit);
	buttons.appendChild(del);
	
	text.appendChild(textfield);
	entry.appendChild(text);
	entry.appendChild(buttons);
	
	// change class for all existing to have correct margin.
	$('.news-field__entry--first').each( function() {
		$(this).removeClass("news-field__entry--first");
		$(this).addClass("news-field__entry");
	})

	const parent = document.getElementById('edit');
	parent.insertBefore(entry, parent.children[1]);
	$('.news-field__textfield').focus();

	// check for max of 4 fields
	
	if(fields > 3) {
		console.log("HIDE THE BUTTON BITCH");
		$('#add_new').hide();
	}
	console.log("FIELDS :" + fields);
}


function removeNewsField(entry) {
	fields -= 1;
	$(entry).parent().parent().remove();

	if(fields > 2) {
		console.log("SHOW THE BUTTON BITCH");
		$('#add_new').show();
	}

	// remove from database
	// save in buffer to allow for undo.
}

function saveNewsField(input) {
	input = $(input).parent().parent().find(".news-field__textfield").eq(0).text();
	
	// update file
	
	fetch('https://jsonbin.org/gandalftea/claritatea-news', {
		method: "POST",
		headers: {
			"authorization" : "bearer " + sessionStorage.getItem("mytoken")
		},

		body: JSON.stringify({
			"Content" : input
		})
		
	}).then(function (response) {
		if(response.ok) {
			return response.json();
		}
		return promise.reject(response);
	}).then(function(data) {
			console.log(data.length);

	}).catch(function(error) {
		console.warn(error);
	});
}
	
