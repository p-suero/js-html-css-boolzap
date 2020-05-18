$(document).ready(function() {


     //**************MINESTONE 1 (input-messaggio)************//
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
    $(".fa-paper-plane").click(function(event) {
        //attivo il focus sull'input
        $("#text-input").show().focus();
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


     //*******MINESTONE 2 (ricerca-contatto)*************//
    //*************************************************//

    //variabile contenente il selettore input della ricerca contatti
    var ricerca_contatti = $("#search-contact input");

    //creo un evento alla pressione di un pulsante della tastiera sull'input
    ricerca_contatti.keyup(function () {
        //recupro il valore dell'input inserito dall'utente
        var valore_input = ricerca_contatti.val().trim().toUpperCase();
        //se l'input ha caratteri faccio il controllo
        if (valore_input.length > 0) {
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

    //ricambio quando l'input non è attivo (utilizzo la funzione event.target per settare il click degli elementi al di fuori dell'input)
    $(document).click(function(event) {
        var target = $(event.target);
        if (!(target.is(".input-container *"))) {
            if (ricerca_contatti.val().trim().length == 0) {
                $("#search-contact .fa-arrow-right").removeClass("active");
                $("#search-contact .fa-search").addClass("active");
            }
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

    //aggiungo azione all'evento click sull'icona "cancella valore input"
    $("#search-contact span").click(function(event) {
        //svuoto il valore dell'input
        ricerca_contatti.val("");
        //all'uscita dall'input mostro tutti i contatti
        $("#chat-container .chat").show();
        //rimuovo il display all'icona "rimuovi valore input"
        $("#search-contact span").removeClass("active");
        //attivo l'input
        ricerca_contatti.show().focus();
    })

    //aggiungo azione all'evento click sull'icona "esci dall'input"
    $("#search-contact .fa-arrow-right").click(function() {
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


     //**********MINESTONE 3 (seleziona-chat)************//
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


     //************MINESTONE 3 (elimina-chat)***********//
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
        //ridefinisco l'anteprima della chat
        anteprima_chat();
    })


     //********MINESTONE-bonus*******//
    //******************************//

    //all'apertura della pagina faccio lo scroll della pagina
    scrollauto();

    //intercetto il click sul collegamento di attiva notifiche
    $(".banner-text p:nth-child(2)").click(function() {
        //rimuovo il banner
        $("#banner-alerts").remove();
        //ridefinisco l'altezza al contenitore delle chat
        $("#chat-container").addClass("height-plus");
    })


    //********************FUNZIONI********************//
    //***********************************************//

    //creo una funzione che inserisce un nuovo elemento all'interno del html partendo dal template
    function send_message() {
        //valido l'input
        if ($("#text-input").val().trim().length > 0) {
            //creo l'oggetto contenente i valori del messaggio necessari per utilizzare il template
            var messaggio = {
                "testo" : $("#text-input").val(),
                "tipo" : "sent",
                "orario" : time()
            }
            //recupero la struttura html del template
            var template_html = $("#messaggio").html();
            // preparo la funzione al fine di utilizzare il template
            var template_function = Handlebars.compile(template_html);
            //creo una variabile contenente il template secondo i parametri dell'oggetto
            var html_finale = template_function(messaggio);
            //aggiungo il messaggio nell html
            $(".message-container.active").append(html_finale);
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
            }, 400);
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
            //se invio un messaggio dopo una ricerca dal contenitore delle chat e quest ultimo ha lo scroll non in alto, imposto quest'ultimo a 0
            if ($("#chat-container").scrollTop() != 0) {
                $("#chat-container").scrollTop(0);
            }
            //se avvio una ricerca e subito dopo invio un messaggio, mostro tutti i contatti ed esco dalla ricerca
            if ($(".fa-arrow-right").is(":visible")) {
                //simulo un click sull'icona alla sinistra dell'input di ricerca per uscire da quest'ultimo
                $(".fa-arrow-right").trigger("click");
            }
            //seleziono l'anteprima della chat
            var risp_in_corso = $(".chat.focus .chat-info p");
            //seleziono l'intestazione della chat
            var stato = $(".text-info p");
            //faccio partire un timer di mezzo secondo allo scadere del quale setto lo stato
            setTimeout(function() {
                risp_in_corso.text("sta scrivendo...");
                stato.text("sta scrivendo...")
            }, 700)
            //faccio partire il timer per la risposta
            setTimeout(risposta_pc, 1300);
        }
    }


     //********Minestone 2 (risposta-pc)*****//
    //**************************************//
    
    //funzione che mi restituisce una risposta
    function risposta_pc() {
        //creo l'oggetto contenente i valori del messaggio necessari per utilizzare il template
        var messaggio = {
            "testo" : "ok",
            "tipo" : "received",
            "orario" : time()
        }
        //recupero la struttura html del template
        var template_html = $("#messaggio").html();
        // preparo la funzione al fine di utilizzare il template
        var template_function = Handlebars.compile(template_html);
        //creo una variabile contenente il template secondo i parametri dell'oggetto
        var html_finale = template_function(messaggio);
        //aggiungo il messaggio nell html
        $(".message-container.active").append(html_finale);
        //setto l'anteprima della chat
        anteprima_chat();
        //faccio lo scroll della pagina
        scrollauto();
        //seleziono l'intestrazione della pagine ed inserisco lo stato "online"
        var stato_online = $(".text-info p").text("online")
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
        //se c'è un messaggio precedente a quello eliminato lo visualizzo in anteprima
        if ($(".message-container.active *").hasClass("sent") || $(".message-container.active *").hasClass("received")) {
            //copio il testo dell'ultimo messaggio
            var testo = $(".message-container.active div:last-of-type.text p:first-child").text();
            //inserisco il contenuto del testo inviato sotto al nome della chat corrispondente
            $(".chat.focus .chat-info p:first-of-type").text(testo);
            //copio l'ora dell'ultimo messaggio
            var ora_msg = $(".message-container.active div:last-of-type.text .time-text").text();
            //inserisco l'ora d'invio dell'ultimo messaggio affianco al nome della chat
            $(".chat.focus .time").text(ora_msg);
        } else {
            //altrimenti stampo un messaggio "chat-vuota"
            $(".chat.focus .chat-info p:first-of-type").text("La chat è vuota. Scrivi un messaggio!");
        }

    }
});
