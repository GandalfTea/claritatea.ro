


// GET NEWS FROM REST API AND UPDATE UI ON LOAD

const monthNames = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
  "Iulie", "August", "Septemberie", "Octombrie", "Noviembrie", "Decembrie"
];

function newEntry(date, input) {
	
	date = date.split('-')
	date = date[0] + " " + monthNames[date[1]];


	var entry = document.createElement('div');
	entry.classList.add('news-entry');
	var text = document.createElement('p');
	text.classList.add('news-entry__text');
	text.innerText = input;
	var dateP = document.createElement('p');
	dateP.classList.add('news-entry__date')
	dateP.innerText = date;
	
	entry.appendChild(dateP)
	entry.appendChild(text)
	
	return entry;
}

const token = sessionStorage.getItem("mytoken");

let req = new XMLHttpRequest();
req.onreadystatechange = () => {
	if (req.readyState == XMLHttpRequest.DONE) {
		var data = JSON.parse(req.responseText);
		data = data["news"];

		// UI
		const par = $('.news__content');

		const keys = Object.keys(data);
		for (var i of keys) {
			var entry = newEntry(i, data[i]);
			$(par).append(entry)
		}

					
	}
};
req.open("GET", "https://api.jsonbin.io/v3/b/61f56dc31960493ad184a565/latest");
req.setRequestHeader("X-Master-Key", "$2b$10$Y6FZRW1rECE0Aup4KwB/TOWXGIV2asBahmM.Anb6QrQ6iqE54WV9i");
req.setRequestHeader("X-Bin-Meta", "false");
req.send();


