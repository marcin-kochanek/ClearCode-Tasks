const runicTable = [
  {
    rune: 'El',
    power: 28,
    enemy: 'Ort'
  },
  {
    rune: 'Eld',
    power: 33,
    enemy: 'Sur'
  },
  {
    rune: 'Tir',
    power: 9,
    enemy: 'Eth'
  },
  {
    rune: 'Nef',
    power: 7,
    enemy: 'Ist'
  },
  {
    rune: 'Eth',
    power: 31,
    enemy: 'Tir'
  },
  {
    rune: 'Ith',
    power: 22,
    enemy: 'Pul'
  },
  {
    rune: 'Tal',
    power: 8,
    enemy: 'Io'
  },
  {
    rune: 'Ral',
    power: 25,
    enemy: 'Um'
  },
  {
    rune: 'Ort',
    power: 18,
    enemy: 'El'
  },
  {
    rune: 'Thul',
    power: 13,
    enemy: 'Sol'
  },
  {
    rune: 'Amn',
    power: 6,
    enemy: 'Fal'
  },
  {
    rune: 'Sol',
    power: 10,
    enemy: 'Thul'
  },
  {
    rune: 'Shael',
    power: 17,
    enemy: 'Lem'
  },
  {
    rune: 'Dol',
    power: 11,
    enemy: 'Hel'
  },
  {
    rune: 'Hel',
    power: 12,
    enemy: 'Dol'
  },
  {
    rune: 'Io',
    power: 20,
    enemy: 'Tal'
  },
  {
    rune: 'Lum',
    power: 32,
    enemy: 'Gul'
  },
  {
    rune: 'Ko',
    power: 27,
    enemy: 'Mal'
  },
  {
    rune: 'Fal',
    power: 14,
    enemy: 'Amn'
  },
  {
    rune: 'Lem',
    power: 26,
    enemy: 'Shall'
  },
  {
    rune: 'Pul',
    power: 15,
    enemy: 'Ith'
  },
  {
    rune: 'Um',
    power: 16,
    enemy: 'Ral'
  },
  {
    rune: 'Mal',
    power: 21,
    enemy: 'Ko'
  },
  {
    rune: 'Ist',
    power: 4,
    enemy: 'Nef'
  },
  {
    rune: 'Gul',
    power: 23,
    enemy: 'Lum'
  },
  {
    rune: 'Vex',
    power: 24,
    enemy: 'Ohm'
  },
  {
    rune: 'Ohm',
    power: 1,
    enemy: 'Vex'
  },
  {
    rune: 'Lo',
    power: 2,
    enemy: 'Cham'
  },
  {
    rune: 'Sur',
    power: 30,
    enemy: 'Eld'
  },
  {
    rune: 'Ber',
    power: 3,
    enemy: ''
  },
  {
    rune: 'Jah',
    power: 5,
    enemy: 'Zod'
  },
  {
    rune: 'Cham',
    power: 29,
    enemy: 'Lo'
  },
  {
    rune: 'Zod',
    power: 19,
    enemy: 'Jah'
  } 
];

/////// The first function ///////
function generateRunicWords(runicTable, wordLength) {
  var runicTable;
  let i, j, combs = [], headRune, restRunes, tailcombs, helpArray, partialCombs, runicObjects = [];
  const numberOfOutputWords = 10;

  // Function sorting runes in runic word by power (most powerful rune goes first)
  function sortRunes(arr) {
    let first, second, runicWord;

    return arr.map(ele => ({word: ele.rune || ele.word, power: ele.power, enemy: ele.enemy})).reduce( (prev, next) => {
      if (!prev.word) {
        return {word: `${next.word}`, power: next.power - 1, enemy: `${next.enemy}`};
      } else {
        runicWord = `${prev.word}-${next.word}`.split(`-`);
        runicWord.sort( (a, b) => {
          first = runicTable.find( obj => obj.rune == a);
          second = runicTable.find( obj => obj.rune == b);
          return parseInt(second.power,10) - parseInt(first.power,10);
        });          
        runicWord = runicWord.join(`-`);
        return {word: `${runicWord}`, power: prev.power + next.power - 1, enemy: `${prev.enemy}-${next.enemy}`};
      }
    }, {});
  }

  // Function that defines a descending sort order. 
  function compareNumbers(a, b) {
    return parseInt(b.power,10) - parseInt(a.power,10);
  }

  // Function checking if a rune combination could generate harmful side effects
  function checkRunicConflict(inputWord) {
    let isRuneConflict, splittedRunicWord;

    splittedRunicWord = inputWord.word.split(`-`);
    isRuneConflict = splittedRunicWord.some( element => {
      return inputWord.enemy.includes(element);
    });

    if (!isRuneConflict) {
      inputWord = {word: inputWord.word, power: inputWord.power};
      combs.push(inputWord);
    }
  }

  if (!Number.isInteger(wordLength)) {
    return console.log(`Input value must be integer. Please try again.`);
  }

  if (wordLength === undefined) {
    return console.log(`Input value cannot be empty.`);
  }

  // There is no way to take the length of runic word <=0.
  if (wordLength <= 0) {
    return console.log(`Input value cannot be less than or equal to zero.`);
  }

  // There is no way to take the length of runic word >=34
  if (wordLength > runicTable.length) {
    return console.log(`Input value cannot be greater than the number of runes (33).`);
  }

  // There are 33 1-rune runic words in the 33-sized runic table.
  if (wordLength == 1) {
    combs = runicTable.map(ele => ({word: ele.rune, power: ele.power})).sort(compareNumbers);
    partialCombs = combs.slice(0, numberOfOutputWords);
    return partialCombs;
  }

  // 33-sized runic table has only one 33-sized runic word.
  if (wordLength === runicTable.length) {
    runicObjects = sortRunes(runicTable);
    checkRunicConflict(runicObjects);
  }

  if (wordLength !== runicTable.length) {
    for (i = 0; i < runicTable.length - wordLength + 1; i++) {

      // headRune includes only current rune/element
      headRune = runicTable.slice(i, i + 1);

      // restRunes includes the subsequent runes/elements
      restRunes = runicTable.slice(i + 1);

      // We take smaller combinations from the subsequent runes/elements
      tailcombs = generateRunicWords(restRunes, wordLength - 1);
      if (!Array.isArray(tailcombs)) {
        tailcombs = Array.of(tailcombs);
      }

      // For each (wordLength-1)-combination we join it with the current and store it to the runic table of wordLength-combinations.
      for (j = 0; j < tailcombs.length; j++) {
        helpArray = headRune.concat(tailcombs[j]);
        runicObjects = sortRunes(helpArray);
        checkRunicConflict(runicObjects);
      }
    }
  }
  // Method for sorting runic words by their power (most powerful word goes first);
  combs.sort(compareNumbers);


  // Showing output an Array of 10 (numberOfOutputWords) most powerful valid runic words
  partialCombs = combs.slice(0, numberOfOutputWords);
  return partialCombs;
}

/////// The second function ///////
function checkRunicWord(runicWord) {
  let runesArray, sum, runicObject; 
  const powers = [];

  if (Number.isInteger(runicWord)) {
    return console.log(`Input value must be string. Please try again.`);
  }

  runesArray = runicWord.split(`-`);

  for (const item of runesArray) {
    runicObject = runicTable.find(obj => obj.rune == item);
    powers.push(runicObject.power);
  }

  return powers.reduce( (total, next) => total + next, 0);
}