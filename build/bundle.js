/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const KeyBoard = function(){
  this.pressedKeys = [];
};

KeyBoard.prototype.addKey = function(key){
  this.pressedKeys.push(key);
}

module.exports = KeyBoard;


/***/ }),
/* 1 */
/***/ (function(module, exports) {


const Request = function(url) {
  this.url = url;
}

Request.prototype.get = function(callback){

  const request = new XMLHttpRequest();
  request.open('GET', this.url);
  request.addEventListener('load', function(){
    if(this.status !== 200 ){
      return ;
    };
    const responseBody = JSON.parse(this.responseText);

    callback(responseBody);
  });
  request.send();
};

Request.prototype.post = function(callback, body) {
  const request = new XMLHttpRequest();
  request.open('POST', this.url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.addEventListener('load', function() {
    if(this.status!==201) {
      return;
    }

    const responseBody = JSON.parse(this.responseText);

    callback(responseBody);
  });
    request.send(JSON.stringify(body));
}

Request.prototype.delete = function(callback) {
  const request = new XMLHttpRequest();
  request.open('DELETE', this.url);
  request.addEventListener('load', function() {
    if(this.status!==204) {
      return;
    }

    callback();
  });
  request.send();
}

module.exports = Request;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const keyPress = __webpack_require__ (3);
const keyRelease = __webpack_require__ (4);
const KeyBoard = __webpack_require__ (0);
const WordsData = __webpack_require__(5);
const MathsData = __webpack_require__(6);
const WordsView = __webpack_require__(7);
const MathsView = __webpack_require__(8);
const Words = __webpack_require__(9);
const Maths = __webpack_require__(10);
const MapWrapper = __webpack_require__(11);



const app = function(){

  var mapDiv = document.getElementById('main-map');


  var center = { lat: 36.204824, lng: 138.252924 };

  var mainMap = new MapWrapper(mapDiv, center, 4);

  const wordsData = new WordsData('http://localhost:5000/api/words');
  const mathsData = new MathsData('http://localhost:5000/api/maths');
  const wordsView = new WordsView(document.querySelector('.game-window'));
  const mathsView = new MathsView(document.querySelector('.game-window'));

  const startButton = document.querySelector('#start-button');

  const animalButton = document.querySelector('#animal-game-button');
  const colourButton = document.querySelector('#colour-game-button');
  const clothingButton = document.querySelector('#clothing-game-button');
  const foodButton = document.querySelector('#food-game-button');

  const addButton = document.querySelector('#add-game-button');
  const minusButton = document.querySelector('#minus-game-button');
  const multiplyButton = document.querySelector('#multiply-game-button');
  const divideButton = document.querySelector('#divide-game-button');

  const testButton = document.querySelector('#test-game-button');
  const title = document.querySelector('#title');
  wordsData.getData();
  mathsData.getData();

  var deleteButtons = function(){
    animalButton.parentNode.removeChild(animalButton);
    clothingButton.parentNode.removeChild(clothingButton);
    foodButton.parentNode.removeChild(foodButton);
    colourButton.parentNode.removeChild(colourButton);
    testButton.parentNode.removeChild(testButton);
    addButton.parentNode.removeChild(addButton);
    minusButton.parentNode.removeChild(minusButton);
    divideButton.parentNode.removeChild(divideButton);
    multiplyButton.parentNode.removeChild(multiplyButton);
    title.parentNode.removeChild(title);
  }


  addButton.addEventListener('click', function(){
    deleteButtons();

    var gameData = mathsData.giveData();
    const maths = new Maths(gameData, mathsView);
    maths.getMathsToPlay('add');
    maths.prepareRound(0);
    keyPress(maths);
    keyRelease();

    var speakButton = document.querySelector('#speaker');
    speakButton.addEventListener('click', function(){
      responsiveVoice.speak(maths.problemsToPlay[maths.roundCount].problem);
    });

  });

  minusButton.addEventListener('click', function(){
    deleteButtons();

    var gameData = mathsData.giveData();
    const maths = new Maths(gameData, mathsView);
    maths.getMathsToPlay('minus');
    maths.prepareRound(0);
    keyPress(maths);
    keyRelease();

    var speakButton = document.querySelector('#speaker');
    speakButton.addEventListener('click', function(){
      responsiveVoice.speak(maths.problemsToPlay[maths.roundCount].problem)
    });

  });

  divideButton.addEventListener('click', function(){
    deleteButtons();

    var gameData = mathsData.giveData();
    const maths = new Maths(gameData, mathsView);
    maths.getMathsToPlay('divide');
    maths.prepareRound(0);
    keyPress(maths);
    keyRelease();

    var speakButton = document.querySelector('#speaker');
    speakButton.addEventListener('click', function(){
      responsiveVoice.speak(maths.problemsToPlay[maths.roundCount].problem)
    });

  });

  multiplyButton.addEventListener('click', function(){
    deleteButtons();

    var gameData = mathsData.giveData();
    const maths = new Maths(gameData, mathsView);
    maths.getMathsToPlay('times');
    maths.prepareRound(0);
    keyPress(maths);
    keyRelease();

    var speakButton = document.querySelector('#speaker');
    speakButton.addEventListener('click', function(){
      responsiveVoice.speak(maths.problemsToPlay[maths.roundCount].problem)
    });

  });


  animalButton.addEventListener('click', function(){
    deleteButtons();

    const keyBoard = new KeyBoard();
    var gameData = wordsData.giveData();
    const words = new Words(keyBoard, gameData, wordsView);
    words.getWordsToPlay('animal');
    console.log(words.keyboard);
    words.prepareRound(0);
    keyPress(words);
    keyRelease();

    var speakButton = document.querySelector('#speaker');
    speakButton.addEventListener('click', function(){
      responsiveVoice.speak(words.word, "Russian Female")
    });

  });

  foodButton.addEventListener('click', function(){
    deleteButtons();

    const keyBoard = new KeyBoard();
    var gameData = wordsData.giveData();
    const words = new Words(keyBoard, gameData, wordsView);
    words.getWordsToPlay('food');
    console.log(words.keyboard);
    words.prepareRound(0);
    keyPress(words);
    keyRelease();

    var speakButton = document.querySelector('#speaker');
    speakButton.addEventListener('click', function(){
      responsiveVoice.speak(words.word, "Polish Female")
    });

  });

  colourButton.addEventListener('click', function(){
    deleteButtons();

    const keyBoard = new KeyBoard();
    var gameData = wordsData.giveData();
    const words = new Words(keyBoard, gameData, wordsView);
    words.getWordsToPlay('colour');
    console.log(words.keyboard);
    words.prepareRound(0);
    keyPress(words);
    keyRelease();

    var speakButton = document.querySelector('#speaker');
    speakButton.addEventListener('click', function(){
      responsiveVoice.speak(words.word, "Italian Female")
    });

  });

  clothingButton.addEventListener('click', function(){
    deleteButtons();

    const keyBoard = new KeyBoard();
    var gameData = wordsData.giveData();
    const words = new Words(keyBoard, gameData, wordsView);
    words.getWordsToPlay('clothing');
    console.log(words.keyboard);
    words.prepareRound(0);
    keyPress(words);
    keyRelease();

    var speakButton = document.querySelector('#speaker');
    speakButton.addEventListener('click', function(){
      responsiveVoice.speak(words.word, "Afrikaans Male")
    });

  });

  testButton.addEventListener('click', function(){
    deleteButtons();

    const keyBoard = new KeyBoard();
    var gameData = wordsData.giveData();
    const words = new Words(keyBoard, gameData, wordsView);
    words.getWordsToPlay('test');
    console.log(words.keyboard);
    words.prepareRound(0);
    keyPress(words);
    keyRelease();

    var speakButton = document.querySelector('#speaker');
    speakButton.addEventListener('click', function(){
      responsiveVoice.speak(words.word)
    });






  });



};
window.addEventListener('load', app);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const KeyBoard = __webpack_require__(0);


const startKeyListener = function (game){
  document.onkeydown = keyPress;



  function react(gameIn, key, keyID){
    document.querySelector(keyID).classList.add('pressed');
    if  (gameIn.nextletter !== key){
      document.querySelector(keyID).classList.add('wrong-key');
    }
    if  (gameIn.nextletter === key){
      document.querySelector(keyID).classList.add('correct-key');
    }
    gameIn.run(key)
  }

  function keyPress(e){
    if(e.keyCode == 48){
      react(game, e.key, '#key_0');
      console.log (game.keyboard.pressedKeys);
    }
    if(e.keyCode == 49){ // 1
      react(game, e.key, '#key_1');
    }
    if(e.keyCode == 50){ // 2
      react(game, e.key, '#key_2');

    }
    if(e.keyCode == 51){ // 3
      react(game, e.key, '#key_3');
    }
    if(e.keyCode == 52){ // 4
      react(game, e.key, '#key_4');

    }
    if(e.keyCode == 53){ // 5
      react(game, e.key, '#key_5');

    }
    if(e.keyCode == 54){ // 6
      react(game, e.key, '#key_6');

    }
    if(e.keyCode == 55){ // 7
      react(game, e.key, '#key_7');

    }
    if(e.keyCode == 56){ // 8
      react(game, e.key, '#key_8');

    }
    if(e.keyCode == 57){ // 9
      react(game, e.key, '#key_9');

    }
    if(e.keyCode == 65){ // a
      react(game, e.key, '#key_A');

    }
    if(e.keyCode == 66){ // b
      react(game, e.key, '#key_B');

    }
    if(e.keyCode == 67){ // c
      react(game, e.key, '#key_C');

    }
    if(e.keyCode == 68){ // d
      react(game, e.key, '#key_D');

    }
    if(e.keyCode == 69){ // e
      react(game, e.key, '#key_E');

    }
    if(e.keyCode == 70){ // f
      react(game, e.key, '#key_F');

    }
    if(e.keyCode == 71){ // g
      react(game, e.key, '#key_G');

    }
    if(e.keyCode == 72){ // h
      react(game, e.key, '#key_H');

    }
    if(e.keyCode == 73){ // i
      react(game, e.key, '#key_I');

    }
    if(e.keyCode == 74){ // j
      react(game, e.key, '#key_J');

    }
    if(e.keyCode == 75){ // k
      react(game, e.key, '#key_K');

    }
    if(e.keyCode == 76){ // l
      react(game, e.key, '#key_L');

    }
    if(e.keyCode == 77){ // m
      react(game, e.key, '#key_M');

    }
    if(e.keyCode == 78){ // n
      react(game, e.key, '#key_N');

    }
    if(e.keyCode == 79){ // o
      react(game, e.key, '#key_O');

    }
    if(e.keyCode == 80){ // p
      react(game, e.key, '#key_P');

    }
    if(e.keyCode == 81){ // q
      react(game, e.key, '#key_Q');

    }
    if(e.keyCode == 82){ // r
      react(game, e.key, '#key_R');

    }
    if(e.keyCode == 83){ // s
      react(game, e.key, '#key_S');

    }
    if(e.keyCode == 84){ // t
      react(game, e.key, '#key_T');

    }
    if(e.keyCode == 85){ // u
      react(game, e.key, '#key_U');

    }
    if(e.keyCode == 86){ // v
      react(game, e.key, '#key_V');

    }
    if(e.keyCode == 87){ // w
      react(game, e.key, '#key_W');

    }
    if(e.keyCode == 88){ // x
      react(game, e.key, '#key_X');

    }
    if(e.keyCode == 89){ // y
      react(game, e.key, '#key_Y');

    }
    if(e.keyCode == 90){ // z
      react(game, e.key, '#key_Z');

    }
    if(e.keyCode == 32){ // z
      react(game, e.key, '#space');
    }
    if(e.keyCode == 13){ // z
      react(game, e.key, '#enter');
    }
    if(e.keyCode == 37){ // z
      react(game, e.key, '#key_left');
    }
    if(e.keyCode == 38){ // z
      react(game, e.key, '#key_up');
    }
    if(e.keyCode == 39){ // z
      react(game, e.key, '#key_right');
    }
    if(e.keyCode == 40){ // z
      react(game, e.key, '#key_down');
    }

  };
};
module.exports = startKeyListener;


/***/ }),
/* 4 */
/***/ (function(module, exports) {


const startKeyUpListener = function(){

  document.onkeyup = keyRelease;

  function changeCSS(keyID){
  document.querySelector(keyID).classList.remove('pressed');
  document.querySelector(keyID).classList.remove('wrong-key');
  document.querySelector(keyID).classList.remove('correct-key');

  }

  function keyRelease(e){
    if(e.keyCode == 48){ // 0
      changeCSS('#key_0');
    }
    if(e.keyCode == 49){ // 1
      changeCSS('#key_1');
    }
    if(e.keyCode == 50){ // 2
      changeCSS('#key_2');
    }
    if(e.keyCode == 51){ // 3
      changeCSS('#key_3');
    }
    if(e.keyCode == 52){ // 4
      changeCSS('#key_4');
    }
    if(e.keyCode == 53){ // 5
      changeCSS('#key_5');
    }
    if(e.keyCode == 54){ // 6
      changeCSS('#key_6');
    }
    if(e.keyCode == 55){ // 7
      changeCSS('#key_7');
    }
    if(e.keyCode == 56){ // 8
      changeCSS('#key_8');
    }
    if(e.keyCode == 57){ // 9
      changeCSS('#key_9');
    }
    if(e.keyCode == 65){ // a
      changeCSS('#key_A');
    }
    if(e.keyCode == 66){ // b
      changeCSS('#key_B');
    }
    if(e.keyCode == 67){ // c
      changeCSS('#key_C');
    }
    if(e.keyCode == 68){ // d
      changeCSS('#key_D');
    }
    if(e.keyCode == 69){ // e
      changeCSS('#key_E');
    }
    if(e.keyCode == 70){ // f
      changeCSS('#key_F');
    }
    if(e.keyCode == 71){ // g
      changeCSS('#key_G');
    }
    if(e.keyCode == 72){ // h
      changeCSS('#key_H');
    }
    if(e.keyCode == 73){ // i
      changeCSS('#key_I');
    }
    if(e.keyCode == 74){ // j
      changeCSS('#key_J');
    }
    if(e.keyCode == 75){ // k
      changeCSS('#key_K');
    }
    if(e.keyCode == 76){ // l
      changeCSS('#key_L');
    }
    if(e.keyCode == 77){ // m
      changeCSS('#key_M');
    }
    if(e.keyCode == 78){ // n
      changeCSS('#key_N');
    }
    if(e.keyCode == 79){ // o
      changeCSS('#key_O');
    }
    if(e.keyCode == 80){ // p
      changeCSS('#key_P');
    }
    if(e.keyCode == 81){ // q
      changeCSS('#key_Q');
    }
    if(e.keyCode == 82){ // r
      changeCSS('#key_R');
    }
    if(e.keyCode == 83){ // s
      changeCSS('#key_S');
    }
    if(e.keyCode == 84){ // t
      changeCSS('#key_T');
    }
    if(e.keyCode == 85){ // u
      changeCSS('#key_U');
    }
    if(e.keyCode == 86){ // v
      changeCSS('#key_V');
    }
    if(e.keyCode == 87){ // w
      changeCSS('#key_W');
    }
    if(e.keyCode == 88){ // x
      changeCSS('#key_X');
    }
    if(e.keyCode == 89){ // y
      changeCSS('#key_Y');
    }
    if(e.keyCode == 90){ // z
      changeCSS('#key_Z');
    }
    if(e.keyCode == 32){ // z
      changeCSS('#space');
    }
    if(e.keyCode == 13){ // z
      changeCSS('#enter');
    }
    if(e.keyCode == 37){ // z
      changeCSS('#key_left');
    }
    if(e.keyCode == 38){ // z
      changeCSS('#key_up');
    }
    if(e.keyCode == 39){ // z
      changeCSS('#key_right');
    }
    if(e.keyCode == 40){ // z
      changeCSS('#key_down');
    }

  };

};
module.exports = startKeyUpListener;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Request = __webpack_require__(1);

const WordsData = function(url){
  this.url = url;
  this.data = [];
}

WordsData.prototype.getData = function(){
  const request = new Request(this.url);
  const successGet = function(dataIn){
    this.data = dataIn;
    this.giveData();
  }.bind(this);
  request.get(successGet);
}

WordsData.prototype.giveData = function () {
  return this.data;
};

module.exports = WordsData;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Request = __webpack_require__(1);

const MathsData = function(url){
  this.url = url;
  this.data = [];
}

MathsData.prototype.getData = function(){
  const request = new Request(this.url);
  const successGet = function(dataIn){
    this.data = dataIn;
    this.giveData();
  }.bind(this);
  request.get(successGet);
}

MathsData.prototype.giveData = function () {
  return this.data;
};

module.exports = MathsData;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

const WordsView = function(container){
  this.container = container;
}

WordsView.prototype.createImage = function (data) {
var image = document.createElement('img');
image.id = "game-image";
image.src = data.image;
image.alt = data.name;
return image;
};

WordsView.prototype.winScreen = function (){
  var welltext = document.createElement('p');
  welltext.id = "win-text";
  welltext.innerText = "w e l l "
  var donetext = document.createElement('p');
  donetext.id = "win-text";
  donetext.innerText = " d o n e !"
  var image = document.createElement('img');
  image.id = 'win-image';
  image.src = '/images/trophy.svg'
  image.alt = 'trophy'
  image.style.cssText = "width: 120px;height: 120px;"
  this.container.appendChild(welltext);
  this.container.appendChild(image);
  this.container.appendChild(donetext);
}

WordsView.prototype.prepareWord = function(word){
  var wordIn = word;
  var newWord = '';
  var wordSplit = [];
  for (var i = 0; i < wordIn.length; i++) {
    wordSplit.push(wordIn.charAt(i))
    newWord += (wordSplit[i] + ' ');
  }
  return newWord;
}

WordsView.prototype.updateAnswer = function (newAnswer) {
  answerView = document.querySelector('#answer-display');
  answerView.innerText = this.prepareWord(newAnswer);
};

WordsView.prototype.clearRound = function(){
  this.container.innerHTML = "";
}

WordsView.prototype.render = function(data, answerIn, roundCount, totalRounds){
  var word = document.createElement('p');
  word.id = "display-word";

  var answer = document.createElement('p');
  answer.id = "answer-display";

  var counter = document.createElement('p');
  counter.id = "counter-display";
  counter.innerText = `${(roundCount + 1)} of  ${totalRounds}`

  var image = this.createImage (data);
  image.style.cssText = "width: 120px;height: 120px;"
  word.innerText = this.prepareWord(data.word);
  answer.innerText = this.prepareWord(answerIn);


  this.container.appendChild(word);
  this.container.appendChild(image);
  this.container.appendChild(answer);
  this.container.appendChild(counter);
}

module.exports = WordsView;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

const MathsView = function(container){
  this.container = container;
}

MathsView.prototype.clearRound = function(){
  this.container.innerHTML = "";
}

MathsView.prototype.winScreen = function (){
  var welltext = document.createElement('p');
  welltext.id = "win-text";
  welltext.innerText = "w e l l "
  var donetext = document.createElement('p');
  donetext.id = "win-text";
  donetext.innerText = " d o n e !"
  var image = document.createElement('img');
  image.id = 'win-image';
  image.src = '/images/trophy.svg'
  image.alt = 'trophy'
  image.style.cssText = "width: 120px;height: 120px;"
  this.container.appendChild(welltext);
  this.container.appendChild(image);
  this.container.appendChild(donetext);
}

MathsView.prototype.updateAnswer = function () {
  var answer = document.querySelector('#game-image4');
  answer.classList.remove('hide');
};




MathsView.prototype.render = function(data, roundCount, totalRounds){
  var image1 = document.createElement('img');
  image1.id = "game-image1";
  image1.src = data.image1;
  image1.style.cssText = "width: 110px;height: 110px; margin: 110px 0px 0px 0px";

  var image2 = document.createElement('img');
  image2.id = "game-image2";
  image2.src = data.image2;
  image2.style.cssText = "width: 70px;height: 70px; margin: 110px 30px 20px 30px;";

  var image3 = document.createElement('img');
  image3.id = "game-image3";
  image3.src = data.image3;
  image3.style.cssText = "width: 110px;height: 110px; margin: 110px 0px 0px 0px";

  var equals = document.createElement('img');
  equals.id = "equals";
  equals.src = "/images/maths/equal.svg";
  equals.style.cssText = "width: 70px;height: 70px; margin:110px 30px 20px 30px;";

  var image4 = document.createElement('img');
  image4.id = "game-image4";
  image4.src = data.image4;
  image4.style.cssText = "width: 110px;height: 110px;margin: 110px 0px 0px 0px;";
  image4.classList.add('hide');

  var counter = document.createElement('p');
  counter.id = "counter-display";
  counter.innerText = `${(roundCount + 1)} of  ${totalRounds}`;
  counter.style.cssText = "margin-top: 95px;";


  this.container.appendChild(image1);
  this.container.appendChild(image2);
  this.container.appendChild(image3);
  this.container.appendChild(equals);
  this.container.appendChild(image4);
  this.container.appendChild(counter);
}

module.exports = MathsView;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

const Words = function(keyboard, gamedata, gameview){
  this.word = "";
  this.answer = "";
  this.nextletter = "";
  this.keyboard = keyboard;
  this.gamedata = gamedata;
  this.gameview = gameview;
  this.wordsToPlay = [];
  this.roundCount = 0;
}

Words.prototype.setAnswerLength = function () {
  var newAnswer = "";
  for (var i = 0 ; i < this.word.length ; i++) {
    newAnswer += "_";
  }
  this.answer = newAnswer;
};

Words.prototype.setWord = function(wordIn){
  this.word = wordIn;
  this.nextletter = this.word.charAt(0);
}
Words.prototype.shuffle = function(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

Words.prototype.getWordsToPlay = function(category){
  this.roundCount = 0;
  var playArray = [];
  if (category){
    for (word of this.gamedata){
      if (category == word.category){
        playArray.push(word)
      }
    }
    this.wordsToPlay = this.shuffle(playArray);
  }
  else{
    this.wordsToPlay = this.gamedata;
  }
};

Words.prototype.fillAnswer = function (letter) {
  var newAnswerArray = [];
  for (var i = 0; i < this.answer.length; i++) {
    if (this.answer.charAt(i) !== '_'){
      newAnswerArray.push(this.answer.charAt(i));
    }
  }
  newAnswerArray.push(letter);
  var letterCount = newAnswerArray.length;
  this.nextletter = this.word.charAt(letterCount);
  for (var i = 0; i < (this.word.length - (letterCount)); i++) {
    newAnswerArray.push('_');
  }
  this.answer = newAnswerArray.join("");
};

Words.prototype.checkLetter = function(letterIn){
  if (letterIn === this.nextletter){
    this.fillAnswer(letterIn);
  }
}

Words.prototype.prepareRound = function(index){
  var numberofRounds = this.wordsToPlay.length;
  for (var i = 0; i < numberofRounds; i++) {
    if (index === i){
      this.setWord(this.wordsToPlay[i].word);
      this.setAnswerLength();
      this.gameview.render(this.wordsToPlay[i], this.answer, this.roundCount, numberofRounds)
    }
    if (index >= this.wordsToPlay.length){
      this.gameview.clearRound();
      this.gameview.winScreen();
    }
  }
};


Words.prototype.winCheck = function () {
  if(this.word === this.answer){
    this.roundCount += 1;
    var timethis = this;
    setTimeout(function () {
      timethis.gameview.clearRound();
    }, 600);
    setTimeout(function () {
      timethis.prepareRound(timethis.roundCount);
    }, 660);
  }
};

Words.prototype.run = function(letter){
  this.checkLetter(letter);
  this.gameview.updateAnswer(this.answer);
  return(this.winCheck());
};




module.exports = Words;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

const Maths = function(gamedata, gameview){
  this.answer = "";
  this.nextletter = "";
  this.gamedata = gamedata;
  this.gameview = gameview;
  this.problemsToPlay = [];
  this.roundCount = 0;
}

Maths.prototype.setProblem = function(problemIn){
  this.nextletter = problemIn.solution;
}
Maths.prototype.shuffle = function(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

Maths.prototype.getMathsToPlay = function(category){
  this.roundCount = 0;
  var playArray = [];
  if (category){
    for (problem of this.gamedata){
      if (category == problem.category){
        playArray.push(problem)
      }
    }
    this.problemsToPlay = this.shuffle(playArray);
  }
  else{
    this.problemsToPlay = this.gamedata;
  }
};

Maths.prototype.prepareRound = function(index){
  var totalRound = this.problemsToPlay.length;
  for (var i = 0; i < totalRound; i++) {
    if (index === i){
      this.solution = this.problemsToPlay[i].solution;
      this.setProblem(this.problemsToPlay[i]);
      this.gameview.render(this.problemsToPlay[i], this.roundCount, totalRound);
    }
    if (index >= this.problemsToPlay.length){
      this.gameview.clearRound();
      this.gameview.winScreen();
    }
  }
};

Maths.prototype.winCheck = function (key) {
  console.log("solution", this.solution);
  if(this.solution === key){

    this.gameview.updateAnswer();
    this.roundCount += 1;
    var timethis = this;
    setTimeout(function () {
      timethis.gameview.clearRound();
    }, 1000);
    setTimeout(function () {
      timethis.prepareRound(timethis.roundCount);
    }, 1060);
  }
};

Maths.prototype.run = function(key){
  console.log(this.nextletter);
  this.winCheck(key);
};

module.exports = Maths;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var MapWrapper = function (container, coords, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom,
    disableDefaultUI: true,
    styles: [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#9fe3ff"
            },
            {
                "visibility": "on"
            }
        ]
    }
]
  });
}

MapWrapper.prototype.addMarker = function (coords) {
  var marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap,
    animation: google.maps.Animation.DROP
  });
  return marker;
}

MapWrapper.prototype.addClickEvent = function () {
  google.maps.event.addListener(this.googleMap, 'click', function (event) {
    var position = { lat: event.latLng.lat(), lng: event.latLng.lng() }
    this.addMarker(position);
  }.bind(this));
}

MapWrapper.prototype.addInfoWindow = function (coords, text) {
  var marker = this.addMarker(coords);
  marker.addListener('click', function () {
    var infoWindow = new google.maps.InfoWindow({
      content: text
    });
    infoWindow.open(this.map, marker);
  });
}

MapWrapper.prototype.geoLocate = function () {
  navigator.geolocation.getCurrentPosition(function (position) {
    var center = { lat: position.coords.latitude, lng: position.coords.longitude };
    this.googleMap.setCenter(center);
    this.addMarker(center);
  }.bind(this));
}

module.exports = MapWrapper;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map