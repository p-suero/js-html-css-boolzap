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

    //variabile contenente il selettore input della ricerca contatti
    var ricerca_contatti = $("#search-contact input");

    //creo un evento alla pressione di un pulsante della tastiera sull'input
    ricerca_contatti.keyup(function () {
        //recupro il valore dell'input inserito dall'utente
        var input_search = ricerca_contatti.val().trim().toUpperCase();

        //ciclo i singoli contatti
        $("#chat-container .chat").each(function() {
            //recupero il titolo del contatto
            var nome_contatto = $(this).find("h5").text().toUpperCase();
            //se ho un contatto uguale all' intero o parziale valore dell'utente mostro il contatto altrimenti lo nascondo
            if (nome_contatto.includes(input_search)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        })
    })

    //cambio l'icona di fianco l'input quando questo è attivo
    ricerca_contatti.focus(function() {
        $("#search-contact .fa-search").removeClass("active");
        $("#search-contact .fa-arrow-right").addClass("active");
    })

    //ricambio quando è disattivo
    ricerca_contatti.blur(function() {
        if (ricerca_contatti.val().length == 0) {
            $("#search-contact .fa-arrow-right").removeClass("active");
            $("#search-contact .fa-search").addClass("active");
        }
    })

    //se c'e testo visualizzo il caratter "X" per eliminare il valore dell'input
    ricerca_contatti.keyup(function() {
        if ($("#search-contact input").val().length > 0) {
            $("#search-contact span").addClass("active");
        } else {
            $("#search-contact span").removeClass("active");
        }
    })

    //aggiungo azione all'evento mouse down sull'icona "esci dall'input e cancella valore input"
    $("#search-contact .fa-arrow-right, #search-contact span").mousedown(function() {
        //svuoto il valore dell'input
        ricerca_contatti.val("");
        //all'uscita dall'input mostro tutti i contatti
        $("#chat-container .chat").show();
        //rimuovo il display all'icona "rimuovi valore input"
        $("#search-contact span").removeClass("active");
        //inverto il display alle icone sulla sinistra del display
        $("#search-contact .fa-arrow-right").removeClass("active");
        $("#search-contact .fa-search").addClass("active");
    })


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
