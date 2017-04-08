$(document).ready(function() {
	$("#commune")
	.bind( "keydown", function( event ) {
		if ( event.keyCode === $.ui.keyCode.TAB &&
			$( this ).data( "autocomplete" ).menu.active ) {
				event.preventDefault();
			}
		})
		.autocomplete({
			source: function(request, response) {
				$.ajax({
					url: 'http://workspace/Gaboriau-Le_Guerneve/serveur/commune.php', //chemin vers mon serveur wamp
					type: 'GET',
					dataType: 'json',
					data: 'commune=' + $('#commune').val() + '&maxRows=10',
					success: function(data) {
						response($.map(data, function (item){
							return{
								label: item.Ville,
								value: item.Ville,
								ville: item.Ville
							};
						}));
					},
					error: function() {
						window.alert("Error");
					}
				});
			},
			minLength: 3,
			delay: 500,
		});
});
