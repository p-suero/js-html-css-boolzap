$(document).ready(function() {


    //***************SETTO L'INPUT DEI MESSAGGI***************//
    //*******************************************************//

    //attivo  l'icona d'invio messaggio al click dell'input
    $("#text-input").keyup(function() {
        if ($("#text-input").val().trim().length > 0) {
            $(".icon-container .fa-microphone").removeClass("active");
            $(".icon-container .fa-paper-plane").addClass("active");
        } else {
            $(".icon-container .fa-paper-plane").removeClass("active");
            $(".icon-container .fa-microphone").addClass("active");
        }
    });

    //invio il messaggio al click dell'icona
    $(".fa-paper-plane").click(send_message);

    //invio il messaggio al click del tasto "enter"
    $("#text-input").keypress(function(e) {
        if(e.which == 13) {
            send_message();
        }
    });

    //****************BARRA RICERCA CHAT****************//
    //*************************************************//











    //********************FUNZIONI********************//
    //***********************************************//

    //creo una funzione che inserisce un nuovo elemento all'interno del html partendo dal template
    function send_message () {
        //valido l'input
        if ($("#text-input").val().trim().length > 0) {
            //leggo il valore dell'input
            var text_input = $("#text-input").val();
            //clono l'elemento nel template
            var new_message = $(".template .text").clone();
            //aggiungo la classe messaggio da inviare
            new_message.addClass("sent");
            //aggiungo il testo al tag
            new_message.children("p:first-child").text(text_input);
            //aggiungo l'ora del sistema al tag
            new_message.children(".time-text").text(myFunction());
            //inserisco il tag nel html
            $("#message-container").append(new_message);
            //svuoto il contenuto dell'input
            $("#text-input").val("");
            //elimino la classe active all'icona d'inviato
            $(".icon-container .fa-paper-plane").removeClass("active");
            //aggiungo la classe active al microfono
            $(".icon-container .fa-microphone").addClass("active");

            //setto la spunta blu
            setTimeout(function() {
                $("div:last-child .sent").addClass("read");
            }, 1000)

            //faccio partire il timer per la risposta
            setTimeout(function () {
                //clono l'elemento nel template
                var new_message = $(".template .text").clone();
                //aggiungo la classe "messaggio inviato"
                new_message.addClass("received")
                //aggiungo il testo al tag
                new_message.children("p:first-child").text("ok");
                //aggiungo l'ora del sistema al tag
                new_message.children(".time-text").text(myFunction());
                //inserisco il tag nel html
                $("#message-container").append(new_message);
            }, 2000);
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
        $("#message-container").animate({
            scrollTop: altezzaChat
        }, "fast");
    }
});
