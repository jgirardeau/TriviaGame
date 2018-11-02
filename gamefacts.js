var gameFacts = [
    "First man in space",
    "Yuri Gagarin",
    "Yuri malenchenko",
    "Valeri polyakov",
    "Svetlana Savitskaya",
    "First women in space",
    "Valentina Tereshkova",
    "Svetlana Savitskaya",
    "Sally Ride",
    "Judith Resnik",
    "First spacewalk",
    "Alexey Leonov",
    "Ed White",
    "Eugene Cernan",
    "Michael Collins",
    "Longer stay in space",
    "Valeri Polyakov",
    "John Glenn",
    "Yand Liwei",
    "Alan Shepard",
    "First person to set foot on the moon",
    "Neil Armstrong",
    "Buzz Aldrin",
    "Pete Conrad",
    "Alan Bean",
    "Second person to set foot on the moon",
    "Buzz Aldrin",
    "Neil Armstrong",
    "Pete Conrad",
    "Alan Bean",
    "First animal species in space",
    "Fruit flys",
    "Monkeys",
    "Beetles",
    "Frogs",
    "First American in orbit",
    "John Glenn",
    "Virgil Grissom",
    "Scott Carpenter",
    "Walter Shirra",
    "First person to orbit the earth",
    "Yuri Gagarin",
    "Gherman Titov",
    "John Glenn",
    "Scott Carpenter",
    "Oldest person in space",
    "John Glenn",
    "Franklin Story Musgrave",
    "Dennis Tito",
    "Vance D. Brand",
    "First Mercury Capsule",
    "Freedom 7",
    "Liberty Bell 7",
    "Friendship 7",
    "Aurora 7",
    "First Gemini Commander",
    "Gus Grissom",
    "John Young",
    "James McDivitt",
    "Ed White",
    "First Apollo Commander",
    "Gus Grissom",
    "Ed White",
    "Roger Chaffee",
    "Wally Shirra",
    "Second Satellite in Space",
    "Sputnik 2",
    "Vanguard 1A",
    "Explorer 1",
    "Pioneer 0",
    "Longest Space Walk",
    "Anatoly Solovyev",
    "Michael Lopez-Alegria",
    "Andrew J. Feustel",
    "Peggy Whitson"
];
var gameRunning = false;
var answersCorrect = 0;
var answersIncorrect = 0;
var answersMissing = 0;
var gameStarted = false;
var timeLeft;
var gameTime = 60;
var intervalId;
// random 0 to max-1
function make_random(max) {
    return Math.floor(Math.random() * (max));
}
// build game html
for (var i = 0; i < gameFacts.length; i += 5) {
    var astring = "<h3>" + gameFacts[i] + "</h3><form>"
    p = make_random(4);
    for (var x = 0; x < 4; x++) {
        var indx = i + p + 1;
        var correct = 0;
        if (p + 1 === 1) correct = 1;
        astring += '<input type="radio" ' + ' correct=' + correct + ' name="q" id=q' + indx + ' class="radio_click">';
        astring += gameFacts[indx] + " ";
        p++;
        if (p >= 4) p = 0;
    }
    astring += "</form>";
    $("#questions").append(astring);
}

function end_game() {
    answersIncorrect = 0;
    answersCorrect = 0;
    answersMissing = 0;
    // clean up vars
    clearInterval(intervalId);
    gameRunning = false;
    gameTime = 60;
    $("#display").text("Time left: " + gameTime);
    // go through each question and see if checked
    for (var i = 0; i < gameFacts.length; i += 5) {
        var checked = false;
        for (var x = 1; x < 5; x++) {
            var indx = parseInt(i) + parseInt(x);
            var query_string = "#q" + indx;
            // console.log(query_string);
            var q = $(query_string);
            var is_checked = q.is(":checked");
            var is_correct = q.attr("correct");
            //console.log(is_checked);
            // console.log(q.attr("correct"));
            if (is_checked) {
                checked = true;
                // console.log("Set checked to true");
                if (is_correct === "1") {
                    answersCorrect++;
                } else {
                    answersIncorrect++;
                }
            }
            q.prop("checked", false);
        }
        //console.log("done checked " + checked);
        if (!checked) {
            answersMissing++;
        }
    }
    $("#answersCorrect").text("Correct: " + answersCorrect);
    $("#answersIncorrect").text("Misses: " + answersIncorrect);
    $("#answersMissing").text("Unanswered: " + answersMissing);
    window.scrollTo(0, 0);

}

// call back to finish
$("#submit").click(function() {
    if (!gameRunning) {
        return;
    }
    end_game();
});

function countdown() {
    gameTime--;
    $("#display").text("Time left: " + gameTime);
    if (gameTime === 0) {
        end_game();
    }
}
$(".radio_click").click(function() {
    if (!gameRunning) {
        gameRunning = true;
        $("#answersCorrect").text("Correct: " + 0);
        $("#answersIncorrect").text("Misses: " + 0);
        $("#answersMissing").text("Unanswered: " + 0);
        intervalId = setInterval(function() {
            countdown();
        }, 1000);
    }
});