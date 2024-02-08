// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");
   let wordInput = input.question("Enter a word to score: ");
   return console.log(oldScrabbleScorer(wordInput));
};


function simpleScorer(input) {
   let score = 0;
   input = input.toUpperCase();
   for (i = 0; i < input.length; i++)
   score += 1;
return score
}


function vowelBonusScorer(input) {
   let score = 0;
   input = input.toUpperCase();
   for (i = 0; i < input.length; i++) {
      if (((input[i]) === "A") || ((input[i]) === "E") || ((input[i]) === "I") || ((input[i]) === "O") || ((input[i]) === "U")) {
      score += 3;
      } else score += 1;
   } return score
}

let simpleScore = {
   name : "Simple Score",
   description : "Each letter is worth 1 point.",
   scorerFunction : simpleScorer
};

let bonusVowels = {
   name : "Bonus Vowels",
   description : "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction : vowelBonusScorer
}

let scrabble = {
   name : "Scrabble",
   description : "The traditional scoring algorithm.",
   scorerFunction : scrabbleScorer
}

const scoringAlgorithms = [simpleScore, bonusVowels, scrabble];

function scorerPrompt() {
   console.log("Let's play some Scrabble!");
   let word = input.question("Enter a word to score: ");
   let algorithm = input.question(`Which scoring algorithm would you like to use? \n 0 - ${scoringAlgorithms[0].name} : ${scoringAlgorithms[0].description} \n 1 - ${scoringAlgorithms[1].name} : ${scoringAlgorithms[1].description} \n 2 - ${scoringAlgorithms[2].name} : ${scoringAlgorithms[2].description} \n Enter 0, 1, or 2: `);
return console.log(`Score for "${word}": ${scoringAlgorithms[algorithm].scorerFunction(word)}`)
}


function transform(oldPointStructure) {
   let newObject = {};  

   for (const pointValue in oldPointStructure) {
   
      // make letters lower case:

      for (i = 0; i < oldPointStructure[pointValue].length; i++) {
         oldPointStructure[pointValue][i] = oldPointStructure[pointValue][i].toLowerCase();
      }
   } 
   
   // make new object:

      for (pointValue in oldPointStructure) {
         for (i = 0; i < oldPointStructure[pointValue].length; i++) {
            newObject[oldPointStructure[pointValue][i]] = Number(pointValue);
      }  }  
      return newObject;
   };

let newPointStructure = transform(oldPointStructure);

function scrabbleScorer(word) {
   word = word.toLowerCase();
   let score = 0;

   for (let i = 0; i < word.length; i++) {
         score += Number(newPointStructure[word[i]]);
   } return score;
}


// no if, for loops or code in here, just call a couple functions
function runProgram() {
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
