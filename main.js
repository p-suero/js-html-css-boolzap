//attivo e disattivo l'icona d'invia messaggio secondo lo stato dell'input
$("#text-input").click(function() {
    $(".icon-container .fa-microphone").removeClass("active");
    $(".icon-container .fa-paper-plane").addClass("active");
})

//uso l'event-target per intercettare il focusout del input escludendo l'icona d'invio affinche rimanga con display diverso da "none"
$(document).click(function(event) {
    var target = $(event.target);
    if(!(target.is("#text-input, .fa-paper-plane"))) {
        $(".icon-container .fa-paper-plane").removeClass("active");
        $(".icon-container .fa-microphone").addClass("active");
    }
})

//invio il messaggio al click dell'icona
$(".fa-paper-plane").click(send_message);

//invio il messaggio al click del tasto "enter"
$("#text-input").keypress(function(e) {
    if(e.which == 13) {
        send_message();
    }
});

//creo una funzione che inserisce un nuovo elemento all'interno del html partendo dal template
function send_message () {
    //valido l'input
    if ($("#text-input").val().length != 0) {
        //leggo il valore dell'input
        var text_input = $("#text-input").val();
        //clono l'elemento nel template
        var new_message = $(".template .sent").clone();
        //aggiungo il testo al tag
        new_message.children("p:first-child").text(text_input);
        //aggiungo l'ora del sistema al tag
        new_message.children(".time-text").text(myFunction());
        //inserisco il tag nel html
        $("#message-container").append(new_message);
        //svuoto il contenuto dell'input
        $("#text-input").val("");

        //setto la spunta blu
        setTimeout(function() {
            $("div:last-child .sent").addClass("read")
        }, 1000)

        //faccio partire il timer per la risposta
        setTimeout(function () {
            //clono l'elemento nel template
            var new_message = $(".template .received").clone();
            //aggiungo il testo al tag
            new_message.children("p:first-child").text("ok");
            //aggiungo l'ora del sistema al tag
            new_message.children(".time-text").text(myFunction());
            //inserisco il tag nel html
            $("#message-container").append(new_message);
        }, 2000)
    }
}

//funzione per il recupero dell'ora di sistema
function myFunction() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  if (minutes < 10) {
      minutes = "0" + minutes;
  }
  var time = hours + ":" + minutes;
  return time
}

//funzione per l'auto-scroll
function auto_scroll() {
    var altezzaChat = $(".page-right").height();
    $("#message-container").animate(
        {scrollTop: altezzaChat
    }, 700);
}
