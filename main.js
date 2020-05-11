//attivo e disattivo  l'icona d'invio secondo lo stato dell'input
$("#text-input").click(function() {
    $(".icon-container .fa-microphone").removeClass("active");
    $(".icon-container .fa-paper-plane").addClass("active");
})

//invio il messaggio al click dell'icona
$(".fa-paper-plane").click(send_message);

//invio il messaggio al click del tasto "enter"
var text_input = $("#text-input")
text_input.keypress(function(e) {
        if(e.which == 13) {
            send_message();
        }
    });

//creo una funzione che inserisce un nuovo elemento all'interno del html partendo dal template
function send_message () {
    //leggo il valore dell'input
    text_input = $("#text-input").val();
    //clono l'elemento nel template
    var new_message = $(".template .sent").clone();
    //aggiungo il testo al tag
    new_message.children("p:first-child").text(text_input);
    //aggiungo l'ora del sistema al tag
    new_message.children(".time-text").text(myFunction())
    //inserisco il tag nel html
    $("#message-container").append(new_message);
    //svuoto il contenuto dell'input
    $("#text-input").val("")

    //inverto le icone all'invio del messaggio
    $(".icon-container .fa-paper-plane").removeClass("active");
    $(".icon-container .fa-microphone").addClass("active");

    //faccio partire il timer per la risposta
    setTimeout(function () {
        //clono l'elemento nel template
        var new_message = $(".template .received").clone();
        //aggiungo il testo al tag
        new_message.children("p:first-child").text("ok");
        //aggiungo l'ora del sistema al tag
        new_message.children(".time-text").text(myFunction())
        //inserisco il tag nel html
        $("#message-container").append(new_message);
    },1000)
}


//funzione per il recupero dell'Ora
function myFunction() {
  var date = new Date();
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var time = hours + ":" + minutes;
  return time
}
