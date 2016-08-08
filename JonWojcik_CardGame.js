//Opening Message And Global Variables
console.log("\n__________________________\n");
console.log("Welcome To Poker-War");
console.log("__________________________\n");
console.log("To Begin Enter 'Start'");
console.log("For Instructions Enter 'Help'");
console.log("To Stop Playing Enter 'Quit'\n");
var playerCount;
var state = "menu";
var players = [];
var input = "command";
var turnNumber = 0;
var round = [];
//Read Inputs
process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');
process.stdin.on('data', function (text) {
    switch (input){
    case "command":
        //General Functions
        if (text.toLowerCase() === 'quit\n' || text.toLowerCase() === 'exit\n') {
        done();
        }
        else {
            processCommand(text);
        }
    break;    
        case "text":
            getNames(text);  
        break;
    }
});
function processCommand(command){
        //Menu Functions
        switch(state){
        case "menu":
            if( command.toLowerCase() == 'start\n'){
            getPlayers("");
            }            
            else if( command.toLowerCase() == 'help\n'){
            walkthrough();
            }
            //Wrong Command Feedback
            else{
            console.log("Please Enter A Valid Command.");
            }
        break;
        //Option Functions
        case "option":
            if (command == 2 || command == 3 || command == 4){
            playerCount = parseInt(command);
            input = "text";
            console.log("\nEnter Player Name:");
            }
            //Wrong Command Feedback
            else{
            console.log("Please Enter A Valid Number Between 2 and 4.");
            }
        break;
        //Game Functions
        case "playing":
            if (command == "\n" || command.toLowerCase() == "draw\n" || command.toLowerCase() == "pick\n"){
            if(turnNumber < players.length){
            roundTurn(turnNumber);
            turnNumber++;
            if(turnNumber < players.length){
            console.log("It's " + players[turnNumber].name + "'s Turn To Pick A Card.")
            }
            else{
            turnNumber=0;
            console.log("It's " + players[turnNumber].name + "'s Turn To Pick A Card")
            }
            }
            }
            else {
            console.log("Please Enter Valid Command");
            }
        break;
}
}
//Set-Up Functions
function getPlayers() {
      console.log("\nPlease Enter Number Of Players Between 2 And 4");
      state = "option";
}
function getNames(text) {
    if( players.length < playerCount || players == []){
        if(text != ""){
            var person = new Player(text.slice(0,-1), 0);
            players.push(person);
            if( players.length < playerCount || players == []){
            console.log("\nEnter Player Name:");
            }
            else{
            state = "playing";
            input = "command";
            console.log("\nIt's " + players[turnNumber].name + "'s Turn To Pick A Card.");
            }
        }
    }

}
//Player Object Constructor
function Player(name, score) {
    this.name = name;
    this.score = score;
}

//Turn and Round Function
function roundTurn(turnNumber) {
//New Round
if(turnNumber == 0){
var deck = [];
var suits = [1,2,3,4];
var ranks = [-1,2,3,4,5,6,7,8,9,10,11,12,13,14];
for (x = 0; x < suits.length; x++){
    for (y = 0; y < ranks.length; y++){
        var card = new Card(suits[x], ranks[y]);
        deck.push(card);
    }
}
//Shuffle Deck
deck.sort(function(a, b){return 0.5 - Math.random()});
//Pick Cards
for (x = 0; x < players.length; x++){
    var pickedCard = deck[x].suit + " " + deck[x].rank;
    round.push(deck[x]);
}
}
//Turn
if(turnNumber < players.length){
var displayCard = showCard(round[turnNumber].suit, round[turnNumber].rank);
console.log(players[turnNumber].name + " Picked: " + displayCard);
console.log("_________________________\n");
}
if(turnNumber == players.length-1){
    checkScore(round);
    round = [];
}
}
//Card Object Constructor
function Card(suit, rank){
this.suit = suit;
this.rank = rank;
}
//Checks Score of Round And Game
function checkScore(round){
var max = 0;
var second = 0;
var winner = 0;
//Check Round Winner
for (x = 0; x < round.length; x++){
    if(round[x].rank == -1){
    if(players[x].score > 0){
    players[x].score -= 1;
    }
    }
    else if(round[x].rank == winner){
        if(round[x].suit > round[winner].suit){
        winner = x
        }
    }
    else if(round[x].rank > round[winner].rank){
        winner = x;
    }
    else{
    }
}
var displayCard = showCard(round[winner].suit, round[winner].rank);
console.log("---Card Ranked Highest Is: " + displayCard + " ---\n");
console.log("---" + players[winner].name + " Has Won This Round!---\n");
players[winner].score += 2;
console.log("_________________________\n");
console.log("Score");
console.log("_________________________");
for (var i = 0; i < playerCount; i += 1){
    console.log(players[i].name + ": " + players[i].score);
}
console.log("_________________________");
console.log("\n");
//Check Game Winner
for (var i = 0; i < playerCount; i += 1){
    if( i != max){
    if(players[i].score > players[max].score){
        max = i;
    }
    else{
        second = i;
    }
    }
    else{
        max = i;
    }
    }
if(players[max].score >= 21 && players[max].score > players[second].score -2){
    console.log("---" + players[max].name + " Has Won The Game! ---\n");
    for (var i = 0; i < playerCount; i += 1){
        players[i].score = 0;
    }
    console.log("The Next Game Has Already Started!\n");
    console.log("Enter 'Quit' Stop Playing\n");
    console.log("_________________________\n");
}
}
//Convert Card Values To Display Values
function showCard(suit, rank){
var realRank = rank;
var suits = ["♠","♡","♢","♣"];
var ranks = ["Penalty Card","2","3","4","5","6","7","8","9","10","J","Q","K","A"];
if(realRank == -1){
    realRank = 0;
    return ranks[realRank];
}
else{
    realRank -= 1;
    return suits[suit - 1] + " " + ranks[realRank];
}
}
//Instructions
function walkthrough(){
    console.log("_________________________\n");
    console.log('INSTRUCTIONS');
    console.log("_________________________\n");
    console.log("You Will First Be Instructed To Enter The Number Of Players You Would Like To Play With");
    console.log('Currently The Game Is Limited To 4 Players\n');
    console.log("Next You Will Be Prompted To Enter The Names Of Each Player\n");
    console.log("You Will Now Begin The Game-Play");
    console.log('The Only Command For The Game Is To Pick The Next Card By Pressing Enter\n');
    console.log("Once A Player Has One, The Game Will Automatically Begin The Next Game\n");
    console.log("You May Quit At Any Point By Entering 'Quit' or 'Exit' Into The Command Line\n");
    console.log("_________________________\n");
    console.log('RULES');
    console.log("_________________________\n");
    console.log("Objective: The Object Of The Game Is To Reach A Score Of 21 And Lead By At Least 2 Points\n");
    console.log("Play: At The Beginning Of A Round, Each Player Picks A Card From A Shuffled Deck Of Cards");
    console.log("You Win A Round By Having The Highest Card At The End Of Each Round\n");
    console.log('Points: You Earn 2 Points For Having The Highest Card In A Round And Lose 1 Point For Drawing A Penalty Card\n');
    console.log("Enter 'Start' In The Command Line To Begin");
}

//Quits Game
function done() {
    console.log("_________________________\n");
    console.log('Thank You For Playing!');
    console.log("_________________________\n");
    process.exit();
}