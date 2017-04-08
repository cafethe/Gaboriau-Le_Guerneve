$(document).ready(function() {

// création du tabs pour les onglets
  $( function() {
    $( "#tabs" ).tabs();
  });

  //création d'un datepicker
  $( function() {
    $("#datepicker").datepicker();
  } );

  //création du datatable
  $(document).ready( function () {
    $("#table").DataTable();
  });

  // gère l'affichages des images dans les différents onglets
  $("#icon").on('click', function(event) {
    $.ajax({
      url:'http://api.flickr.com/services/feeds/photos_public.gne',
      type:'GET',
      dataType:'jsonp',
      jsonp: 'jsoncallback',
      data:'tags= '+encodeURIComponent($('#commune').val())+'&tagmode=any&format=json',
      success:function(data){
        $("#images").html("");

        // nettoie le tableau
        $("#tableau tr").remove();

        // remplit l'onglet photo avec les photos
        $.each(data.items, function(i,item){
          $("<img/>").attr({
            src: item.media.m,
            id: i
          }).appendTo("#images");
          $("<br/>").appendTo("#images");
          if ( i == $('#nombre').val()-1) return false;
        });

        // remplit le tableau dans l'onglet tableau
        $.each(data.items, function(i,item){
          $("<tr>").attr("id", "tr"+i).appendTo("#tableau");
          $("<td>").attr("class", "td1").appendTo("#tr"+i);
          $("<td>").attr("class", "td2").appendTo("#tr"+i);
          $("<td>").attr("class", "td3").appendTo("#tr"+i);
          $("<td>").attr("class", "td4").appendTo("#tr"+i);
          $("<td>").attr("class", "td5").appendTo("#tr"+i);

          $("<img/>").attr("src", item.media.m).appendTo("#tr"+ i +" .td1");
          $("#tr"+ i +" .td2").html(item.title);
          $("#tr"+ i +" .td3").html(decodeURIComponent(item.author.split("\"")[1]));
          $("#tr"+ i +" .td4").html(item.date_taken.split("T")[0]);
          $("#tr"+ i +" .td5").html(item.date_taken.split("T")[1].split("-")[0]);

          if ( i == $('#nombre').val()-1) return false;
        });

        // afficher une fenêtre modale si la ville n'a pas de photo
        if($("#images").html()==""){
          $("<div>").attr({
            id: "dialog",
            title: "Avertissement"
          }).appendTo("#images");
          $("#dialog").html("<p>Cette ville ne possède pas de photos ou elle n'existe pas</p>");
          $( "#dialog" ).dialog();
        }

        //affiche les informations d'une image lorsque l'on clique dessus
        $("#images img").on('click', function(event) {
          $.each(data.items, function(i,item){
            if(item.media.m==event.target.src) {
              $("<div>").attr({
                id: "dialog",
                title: "Information"
              }).appendTo("#images");
              $("#dialog").html("<p>Titre: "+ item.title +"</br>ID photographe: "+ decodeURIComponent(item.author.split("\"")[1]) +"<br/>Date: "+ item.date_taken.split("T")[0] +"</br>Heure: "+ item.date_taken.split("T")[1].split("-")[0] +"</p>");
              $( "#dialog" ).dialog();
            }
          });
        });
      },
      error: function(resultat,statut,erreur){
        alert("erreur");
      },
    });
  });
});
