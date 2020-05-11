$(".fa-microphone").click(function() {
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


})

//funzione per il recupero dell'Ora
function myFunction() {
  var date = new Date();
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var time = hours + ":" + minutes;
  return time
}
console.log(myFunction());
