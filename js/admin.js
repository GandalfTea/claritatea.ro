

// 1. GET info from the cloud document
// 2. Display info in DOM
// 3. Wait for action
// 		* ADD new entry
// 		* EDIT already existing entry
// 		* DEL entry
// 4. Execute Action (DOM)
// 5. PUT changes to cloud document


// helpers
function encode_utf8(s) {
    return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
    return decodeURIComponent(escape(s));
}

const monthNames = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
  "Iulie", "August", "Septemberie", "Octombrie", "Noviembrie", "Decembrie"
];





// data buffer for changes
var buffer = {}


// Data Pipeline

async function getJSON() {

	return new Promise(resolve => {
		// GET

		const token = sessionStorage.getItem("mytoken");
		let req = new XMLHttpRequest();
		req.onreadystatechange = () => {
			if (req.readyState == XMLHttpRequest.DONE) {
				var data = JSON.parse(req.responseText);
				data = data["news"];
				resolve(data)
			}
		};
		req.open("GET", "https://api.jsonbin.io/v3/b/61f56dc31960493ad184a565/latest");
		req.setRequestHeader("X-Master-Key", "$2b$10$Y6FZRW1rECE0Aup4KwB/TOWXGIV2asBahmM.Anb6QrQ6iqE54WV9i");
		req.setRequestHeader("X-Bin-Meta", "false");
		req.send();

	});
}

export async function getDataPipeline() {

		//  LOADING UI

		var div = document.createElement('div');
		var background = document.createElement('div');
		background.classList.add('loading-background');
		var circle = document.createElement('div');
		var circle1 = document.createElement('div');
		var circle2 = document.createElement('div');
		circle.classList.add('circle')
		circle1.classList.add('circle-1')
		circle2.classList.add('circle-2')

		circle.appendChild(circle1)
		circle.appendChild(circle2)

		div.appendChild(background);
		div.appendChild(circle);

		document.body.appendChild(div);

    // LOAD 
    var data = await getJSON();
		buffer = data;
		var keys = Object.keys(data);
    for(var i of keys) {
        if(data[i] !== undefined) {
            addNewsField(data[i], true);
        }
    }

		// REMOVE UI

		$('.circle').remove();
		$('.circle-1').remove();
		$('.circle-2').remove();
		$('.loading-background').remove();
}


// UI Elements

var fields = 0;

window.addNewsField = addNewsField;
function addNewsField( value = "", preload=false ) {
	fields += 1;

	var entry = document.createElement("div");
	entry.classList.add("news-field__entry--first"); 
	entry.id = fields;

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
	if (!preload) {
		edit.innerHTML = "<img src='./img/tick.svg' id='edit-button'/>";
		edit.setAttribute("onclick", "saveNewsField(this)");
	} else {
		edit.innerHTML = "<img src='./img/edit.svg' id='edit-button'/>";
		edit.setAttribute("onclick", "editNewsField(this)");
	}

	var del = document.createElement("button");
	del.classList.add("news-field__buttons--del");
	del.innerHTML = "<img src='./img/plus.svg' id='del'/>";
	del.setAttribute("onclick", "removeNewsField(this)");
	
	var buttons = document.createElement("div");
 	buttons.classList.add("news-field__buttons--encap");
	buttons.appendChild(edit);
	buttons.appendChild(del);

	var date;
	if(!preload) {
		// DATE
		var d = new Date();
		date = d.getDate() + " " + monthNames[d.getMonth()];
	} else {
		// read from load
		date = "haha"
	}


	var dateP = document.createElement('p');
	dateP.innerText = date;
	dateP.classList.add('entry-date')
	var wrapper = document.createElement('div');
	wrapper.classList.add('entry-wrapper');
	
	text.appendChild(textfield);
	entry.appendChild(text);
	entry.appendChild(buttons);
	wrapper.appendChild(dateP)
	wrapper.appendChild(entry)
	
	// change class for all existing entries to have correct margin.
	$('.news-field__entry--first').each( function() {
		$(this).removeClass("news-field__entry--first");
		$(this).addClass("news-field__entry");
	})

	const parent = document.getElementById('edit');
	parent.insertBefore(wrapper, parent.children[1]);
	if(!preload) $('.news-field__textfield').focus();
	if(preload) $(entry).find(".news-field__textfield").prop('contenteditable', false);


	// check for max of 4 fields
	
	if(fields > 3) {
		$('#add_new').hide();
	}

}

window.removeNewsField = removeNewsField;
function removeNewsField(entry) {

	fields -= 1;
  var id = $(entry).parent().parent().attr("id").toString();
	var input = $(entry).parent().parent().find(".news-field__textfield").eq(0).text();
	
	var keys = Object.keys(buffer);
	for (let i of keys) {
		if (buffer[i] === input) {
			delete buffer[i]
		}
	}

	// API
	
	var packet = {}
	packet['news'] = buffer
	
	let req = new XMLHttpRequest();
	req.onreadystatechange = () => {
		if (req.readyState == XMLHttpRequest.DONE) {
			
		}
	};
	
	req.open("PUT", "https://api.jsonbin.io/v3/b/61f56dc31960493ad184a565");
	req.setRequestHeader("Content-Type", "application/json");
	req.setRequestHeader("X-Master-Key", "$2b$10$Y6FZRW1rECE0Aup4KwB/TOWXGIV2asBahmM.Anb6QrQ6iqE54WV9i");
	req.send(JSON.stringify(packet))
    
	$(entry).parent().parent().parent().remove();

	if(fields > 2) {
		$('#add_new').show();
	}
}

window.saveNewsField = saveNewsField;
function saveNewsField(input) {
	// UI
	$(input).parent().parent().find(".news-field__textfield").prop('contenteditable', false);
	$(input).find('img').attr('src', './img/edit.svg')
	$(input).attr('onclick', 'editNewsField(this)');	


	
	// BUFFER
	var id = $(input).parent().parent().attr("id").toString();
	input = $(input).parent().parent().find(".news-field__textfield").eq(0).text();

	var idx = 0
	var d = new Date();
	// add index to entry for multiple entries in single day
	var date = d.getDate() + "-" + (parseInt(d.getMonth()) + 1).toString() + "-" + d.getFullYear() + "-" + idx;
	var keys = Object.keys(buffer)
	for( var key of keys) {
		if(key === date){
				idx++;
				var date = d.getDate() + "-" + (parseInt(d.getMonth()) + 1).toString() + "-" + d.getFullYear() + "-" + idx;
		}
	} 

	buffer[date] = input;
	// API
	
	var packet = {}
	packet['news'] = buffer
	console.log(JSON.stringify(packet))
	
	let req = new XMLHttpRequest();
	req.onreadystatechange = () => {
		if (req.readyState == XMLHttpRequest.DONE) {
			console.log(req.responseText);
		}
	};
	
	req.open("PUT", "https://api.jsonbin.io/v3/b/61f56dc31960493ad184a565");
	req.setRequestHeader("Content-Type", "application/json");
	req.setRequestHeader("X-Master-Key", "$2b$10$Y6FZRW1rECE0Aup4KwB/TOWXGIV2asBahmM.Anb6QrQ6iqE54WV9i");
	req.send(JSON.stringify(packet))
}
	

window.editNewsField = editNewsField
function editNewsField(input) {
	$(input).parent().parent().find(".news-field__textfield").prop('contenteditable', true).focus();
	$(input).find('img').attr('src', './img/tick.svg')
	$(input).attr('onclick', 'saveNewsField(this)');	
    // Save data to cache before allow edit.
    // Allow text edit
    // Change buttons
    // Lock text field on save press OR
    // Revert to before edit if cancel press.
}
