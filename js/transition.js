
document.addEventListener("scroll", searchCollapse);



// TOP MENU COLAPSE


function searchCollapse() {
	if(document.body.scrollTop === 0) {
		setTimeout( function() {
			$(".search__input").show();
		}, 500);
		$(".top-menu__search").removeClass("top-menu__search--collapsed");
		$(".top-menu__buttons").removeClass("top-menu__buttons--collapsed");
		$(".search__icon").removeClass("search__icon--collapsed");
		$("#buttons__despre").show();
	} else {
		$(".top-menu__search").addClass("top-menu__search--collapsed");
		$(".top-menu__buttons").addClass("top-menu__buttons--collapsed");
		$(".search__icon").addClass("search__icon--collapsed");
		$(".search__input").hide();
		$("#buttons__despre").hide();
	}
}


$(".top-menu__search").click( function() {
	setTimeout( function() {
		$(".search__input").show();
		$(".search__input").focus();
	}, 500);
	$(".top-menu__search").removeClass("top-menu__search--collapsed");
	$(".search__icon").removeClass("search__icon--collapsed");
	$(".top-menu__buttons").removeClass("top-menu__buttons--collapsed");
	$("#buttons__despre").show();
})


// LANDING IMAGE CAROUSEL

const NUM_IMG = 9;
const authors = [
    "Vlas Cristina",
    "Dionisie Cristea",
    "Ana Balan",
    "Delia Tarcan",
    "Vlas Cristina",
    "Anonim",
    "Dimitru Mihaela-Laura",
    "Ana Balan",
    "Stiglet Cosmin",
    "Matar Khaled"
]

const info = [
    "Tempera pe hartie",
    "Fotografie",
    "Liner pe hartie",
    "Fotografie",
    "Natura Statica, Tempera pe panza",
    "Tempera pe hartie",
    "Ulei pe panza",
    "Acuarela",
    "Creion pe hartie",
    "Fotografie"
]

idx = 0;
var par = document.getElementById('background').parentNode;
var cover = document.createElement('img');
var change = false;
cover.id = 'background-second';
par.appendChild(cover);

function ticker() {
    if(change) return;
    console.log("ticker called");
    setInterval( () => {
        changeImage(idx);
    }, 4000)
}

// callable from UI buttons and ticker()
// reset ticker on call form button
function changeImage(id, fromButton=false) {
    if(fromButton) { change = true; }
	idx = id % NUM_IMG;
	var img = "../img/carousel/" + idx.toString() + ".jpg";	

    // change image
	if ( idx % 2) {
		var img2 = '../img/carousel/' + (idx).toString() + '.jpg';
		document.getElementById('background').src = img2;
		$('#background-second').fadeOut(1000);
	} else {
		cover.src = img;
		$('#background-second').fadeIn(1000)
	}

    // change author and title
    document.getElementById("author-name").innerHTML = "<strong>" + authors[idx] + "</strong>";
    document.getElementById("name").innerText = info[idx];

    // change button selection
    if(fromButton) {
        console.log("CLEANING");
        for(let j = 0; j > NUM_IMG; j++) {
            console.log(j)
            document.getElementById(j).style.backgroundColor = "#FFF";
        }
    }

    if (id != 0) {
        prev = id - 1
        document.getElementById(prev).style.backgroundColor = "#FFF";
    } else {
        document.getElementById(NUM_IMG-1).style.backgroundColor = "#FFF";
    }
    document.getElementById(idx).style.backgroundColor = "#000";
    
	
	idx += 1
}

if(change) {
    change = false;
    ticker();
} else {
    ticker();
}




// MAGAZINE CAROUSEL
$(".wrapper__click-catch--left").click( function(event) {
	event.preventDefault();
	$('.wrapper__overflow').animate({
		scrollLeft: "-=500px"
	}, "slow");
});
	
$(".wrapper__click-catch--right").click( function(event) {
	event.preventDefault();
	$('.wrapper__overflow').animate({
		scrollLeft: "+=500px"
	}, "slow");
});



// MAGAZINE IMAGE FADE

var counter = 0;
setInterval( function() {
	if (counter % 2 === 0) {
		$('#main-presentation').fadeOut(1000);
	} else {
		$('#main-presentation').fadeIn(1000);
	}

	counter++;
}, 6000);



