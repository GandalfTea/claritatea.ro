
document.addEventListener("scroll", searchCollapse);

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