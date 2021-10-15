
$('.news-field__buttons--edit').click(function() {
    var parent = $(this).parent().parent();
    var textarea = parent.getelementsbyclassname('.news-field__textfield')[0];
    textarea.disabled = "true";
});

