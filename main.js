$(document).ready(function() {


    //***************SETTO L'INPUT DEI MESSAGGI***************//
    //*******************************************************//

    //attivo l'icona d'invio messaggio al click dell'input
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
    $(".fa-paper-plane").mousedown(function(event) {
        //uso il prevent default per lasciare la barra input attiva
        event.preventDefault();
        //aggiungo la funzione d'invio messaggio
        send_message();
    });

    //invio il messaggio al click del tasto "enter"
    $("#text-input").keypress(function(e) {
        if(e.which == 13) {
            //aggiungo la funzione di invio messaggio
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
        var valore_input = ricerca_contatti.val().trim().toUpperCase();
        //se l'input ha caratteri faccio il controllo
        if (ricerca_contatti.val().length > 0) {
            //ciclo i singoli contatti
            $("#chat-container .chat").each(function() {
                //recupero il titolo del contatto
                var nome_contatto = $(this).find("h5").text().toUpperCase();
                //se ho un contatto uguale all' intero o parziale valore dell'utente mostro il contatto altrimenti lo nascondo
                if (nome_contatto.includes(valore_input)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            })
        } else {
            //altrimenti mostro tutto
            $("#chat-container .chat").show();
        }
    })

    //cambio l'icona di fianco l'input quando questo è attivo
    ricerca_contatti.focus(function() {
        $("#search-contact .fa-search").removeClass("active");
        $("#search-contact .fa-arrow-right").addClass("active");
    })

    //ricambio quando l'input non è attivo
    ricerca_contatti.blur(function() {
        if (ricerca_contatti.val().trim().length == 0) {
            $("#search-contact .fa-arrow-right").removeClass("active");
            $("#search-contact .fa-search").addClass("active");
        }
    })

    //se c'e testo visualizzo il caratter "X" per eliminare il valore dell'input
    ricerca_contatti.keyup(function() {
        if ($(this).val().trim().length > 0) {
            $("#search-contact span").addClass("active");
        } else {
            $("#search-contact span").removeClass("active");
        }
    })

    //aggiungo azione all'evento mouse down sull'icona "cancella valore input"
    $("#search-contact span").mousedown(function(event) {
        //spossesso il mousedown delle sue funzioni per lasciare l'input attivo
        event.preventDefault();
        //svuoto il valore dell'input
        ricerca_contatti.val("");
        //all'uscita dall'input mostro tutti i contatti
        $("#chat-container .chat").show();
        //rimuovo il display all'icona "rimuovi valore input"
        $("#search-contact span").removeClass("active");
        //se l' input non è attivo al click della "X" riattivo questo
        if (!(ricerca_contatti.is(":focus"))) {
            ricerca_contatti.show().focus();
        }
    })

    $("#search-contact .fa-arrow-right").mousedown(function() {
        //svuoto il valore dell'input
        ricerca_contatti.val("");
        //all'uscita dall'input mostro tutti i contatti
        $("#chat-container .chat").show();
        //inverto il display sulle icone alla sinistra dell'input
        $("#search-contact .fa-arrow-right").removeClass("active");
        $("#search-contact .fa-search").addClass("active");
        //rimuovo il display all'icona "rimuovi valore input"
        $("#search-contact span").removeClass("active");
    })


    //******************SELEZIONE CHAT*******************//
    //**************************************************//

    //intercetto il click sulla chat (utilizzo la funzione on affinchè tenga conto delle chat che si aggiungono in cima alla lista, se inserito un messaggio)
    $("#chat-container").on("click", ".chat", function() {
        //rimuovo il focus alla chat già attiva
        $(".chat.focus").removeClass("focus");
        //rimuovo il display alla chat aperta
        $(".message-container.active").removeClass("active");
        //aggiungo il focus alla chat ora selezionata
        $(this).addClass("focus");
        //leggo il valore del data della chat selezionata
        var data = $(this).data("nome");
        //aggiungo la classe active al box-chat corrispondente
        $(".message-container[data-nome='" + data + "']").addClass("active");
        //recupero l'immagine di profilo del contatto
        var immagine = $(this).find("img").attr("src");
        //aggiungo l'immagine nell'intestazione della conversazione
        $("#header-right .photo-profile img").attr("src", immagine);
        //recupero il nome del nome del contatto
        var titolo_contatto = $(this).find("h5").text();
        //aggiungo il nome nell'intestazioe della conversazione
        $("#header-right .text-info h6").text(titolo_contatto);
    })


    //*****************ELIMINA CHAT*********************//
    //*************************************************//


    //intercetto il click dell'utente sullo chevron-down
    $(".message-container").on("click", ".fa-chevron-down", function() {
        //se non è visibile apro quello corrente e chiudo tutti gli altri
        if (!($(this).next(".dropdown-options").is(":visible"))) {
            $(".dropdown-options").removeClass("active");
            $(this).next(".dropdown-options").addClass("active");
        } else {
            //se è visibile lo chiudo
            $(this).next(".dropdown-options").removeClass("active");
        }
    })

    //al click dell'utente su qualsiasi parte della pagina chiudo il dropdown
    $(document).click(function(event) {
        var target = $(event.target);
        if(!(target.is(".fa-chevron-down, .dropdown-options *"))) {
            $(".dropdown-options.active").removeClass("active");
        }
    })

    //al click di "elimina messaggio" questo verrà eliminato
    $(".message-container").on("click", ".message-delate", function() {
        //elimino il messaggio
        $(this).closest(".text").remove();
    })


    //*****************SETTAGGI ACCESSORI***************//
    //*************************************************//

    //all'apertura della pagina faccio lo scroll della pagina
    scrollauto();

    //inserisco l'ora del sistema nell'ultimo accesso
    $(".last-access span").text(time());


    //********************FUNZIONI********************//
    //***********************************************//

    //creo una funzione che inserisce un nuovo elemento all'interno del html partendo dal template
    function send_message() {
        //valido l'input
        if ($("#text-input").val().trim().length > 0) {
            //leggo il valore dell'input
            var valore_input = $("#text-input").val();
            //clono l'elemento nel template
            var nuovo_msg = $(".template .text").clone();
            //aggiungo la classe messaggio da inviare
            nuovo_msg.addClass("sent");
            //aggiungo il testo al tag
            nuovo_msg.children("p:first-child").text(valore_input);
            //aggiungo l'ora del sistema al tag
            nuovo_msg.children(".time-text").text(time());
            //inserisco il tag nel html
            $(".message-container.active").append(nuovo_msg);
            //svuoto il contenuto dell'input
            $("#text-input").val("");
            //se l'icona d'invio messaggio resta visibile, la nascondo
            if ($(".icon-container .fa-paper-plane").is(":visible")) {
                //elimino la classe active all'icona d'inviato
                $(".icon-container .fa-paper-plane").removeClass("active");
                //aggiungo la classe active al microfono
                $(".icon-container .fa-microphone").addClass("active");
            }
            //setto la spunta blu
            setTimeout(function() {
                $(".message-container.active div:last-of-type.sent").addClass("read");
            }, 500);
            //setto l'anteprima della chat
            anteprima_chat();
            //faccio lo scroll della pagina
            scrollauto();
            //clono la chat attiva in quel momento
            var chat_selezionata = $(".chat.focus").clone();
            //la rimuovo dal posto in cui risiede
            $(".chat.focus").remove();
            //la inserisco in cima alla lista
            $("#chat-container").prepend(chat_selezionata);
            //se invio un messaggio dopo una ricerca dal contenitore delle chat e quest ultimo ha lo scroll non in alto, la imposto
            if ($("#chat-container").scrollTop() != 0) {
                $("#chat-container").scrollTop(0);
            }
            //se avvio una ricerca e subito dopo invio un messaggio, mostro tutti i contatti ed esco dalla ricerca
            if ($(".fa-arrow-right").is(":visible")) {
                //simulo un click sull'icona alla sinistra dell'input di ricerca per uscire da quest'ultimo
                $(".fa-arrow-right").trigger("mousedown");
            }


            //**************RISPOSTA PC *************//
            //**************************************//
            //faccio partire il timer per la risposta
            setTimeout(risposta_pc, 1000);
        }
    }

    //funzione che mi restituisce una risposta
    function risposta_pc() {
        //clono l'elemento nel template
        var risposta_msg = $(".template .text").clone();
        //aggiungo la classe "messaggio inviato"
        risposta_msg.addClass("received");
        //aggiungo il testo al tag
        risposta_msg.children("p:first-child").text("ok");
        //aggiungo l'ora del sistema al tag
        risposta_msg.children(".time-text").text(time());
        //inserisco il tag nel html
        $(".message-container.active").append(risposta_msg);
        //setto l'anteprima della chat
        anteprima_chat();
        //faccio lo scroll della pagina
        scrollauto();
    }

    //funzione per il recupero dell'ora di sistema
    function time() {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        var ora = hours + ":" + minutes;
        return ora;
    }

    function scrollauto() {
        $(".message-container.active").scrollTop($(".message-container.active")[0].scrollHeight);
    }

    function anteprima_chat () {
        //copio il testo dell'ultimo messaggio
        var testo = $(".message-container.active div:last-of-type.text p:first-child").text();
        //inserisco il contenuto del testo inviato sotto al nome della chat corrispondente
        $(".chat.focus .chat-info p:first-of-type").text(testo);
        //copio l'ora dell'ultimo messaggio
        var ora_msg = $(".message-container.active div:last-of-type.text .time-text").text();
        //inserisco l'ora d'invio dell'ultimo messaggio affianco al nome della chat
        $(".chat.focus .time").text(ora_msg)
    }
});
