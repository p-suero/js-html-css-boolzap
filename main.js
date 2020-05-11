//setto la classe active tra microfono ed icona d'invio
var input_length = $("#text_input").length

if (input_length > 0) {
    //se il valore è maggiore di 0 visualizzo il tasto d'invio
    $(".icon-container fa-microphone").removeClass("active");
    $(".icon-container fa-google-play").addClass("active")
}

//invio il messaggio al click dell' icona invio
$(".fa-microphone").click(send_message)





//creo una funzione che inserisce un nuovo elemento all'interno del html partendo dal template
function send_message () {
    //leggo il valore dell'input
    var text_input = $("#text-input").val();
    //clono l'elemento nel template
    var new_message = $(".template .sent").clone();
    //aggiungo il testo al tag
    new_message.children("p:first-child").text(text_input);
    //aggiungo l'ora del sistema al tag
    new_message.children(".time-text").text(myFunction())
    //inserisco il tag nel html
    $("#message-container").append(new_message);

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
    //imposto il valore dell'input a 0 caratteri quando si preme verifica l'evento
    var text_input = $("#text-input").val("");
    text_input.onFocus()
}

//funzione per il recupero dell'Ora
function myFunction() {
  var date = new Date();
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var time = hours + ":" + minutes;
  return time
}
console.log(myFunction());
