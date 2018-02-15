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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Request = __webpack_require__(5);

const GameData = function(url){
  this.url = url;
  this.data = [];
}

GameData.prototype.getData = function(){
  const request = new Request(this.url);
  const successGet = function(dataIn){
    this.data = dataIn;
    this.giveData();
  }.bind(this);
  request.get(successGet);
}

GameData.prototype.giveData = function () {
  return this.data;
};

module.exports = GameData;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const keyPress = __webpack_require__ (2);
const keyRelease = __webpack_require__ (3);
const keyMouseDown = __webpack_require__(4);
const WordsData = __webpack_require__(0);
const MathsData = __webpack_require__(0);
const FlagsData = __webpack_require__(0);
const WordsView = __webpack_require__(6);
const MathsView = __webpack_require__(7);
const FlagsView = __webpack_require__(8);
const Words = __webpack_require__(9);
const Maths = __webpack_require__(10);
const Flags = __webpack_require__(11);
const MapWrapper = __webpack_require__(12);



const app = function(){

  var mapDiv = document.getElementById('main-map');


  var center = { lat: 56.890671, lng: -4.202646 };

  var mainMap = new MapWrapper(mapDiv, center, 6);

  const wordsData = new WordsData('https://typitin-backend.herokuapp.com/api/words');
  const mathsData = new MathsData('https://typitin-backend.herokuapp.com/api/maths');
  const flagsData = new FlagsData('https://typitin-backend.herokuapp.com/api/flags');
  const wordsView = new WordsView(document.querySelector('.game-window'));
  const mathsView = new MathsView(document.querySelector('.game-window'));
  const flagsView = new FlagsView(document.querySelector('.game-window'));

  const flagButton = document.querySelector('#flag-game-button');

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
  flagsData.getData();

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
    flagButton.parentNode.removeChild(flagButton);
  }





  flagButton.addEventListener('click', function(){
    deleteButtons();
    mapDiv.classList.remove('dont-display');
    var gameData = flagsData.giveData();
    const flags = new Flags(gameData, flagsView, mainMap);
    flags.getFlagsToPlay();
    flags.prepareRound(0);
    keyPress(flags);
    keyRelease();
    keyMouseDown(flags);

    var speakButton = document.querySelector('#speaker');
    speakButton.addEventListener('click', function(){
      responsiveVoice.speak(flags.wordsToPlay[flags.roundCount].name)
    });
  })

  addButton.addEventListener('click', function(){
    deleteButtons();

    var gameData = mathsData.giveData();
    const maths = new Maths(gameData, mathsView);
    maths.getMathsToPlay('add');
    maths.prepareRound(0);
    keyPress(maths);
    keyRelease();
    keyMouseDown(maths);

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
    keyMouseDown(maths);

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
    keyMouseDown(maths);

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
    keyMouseDown(maths);

    var speakButton = document.querySelector('#speaker');
    speakButton.addEventListener('click', function(){
      responsiveVoice.speak(maths.problemsToPlay[maths.roundCount].problem)
    });

  });


  animalButton.addEventListener('click', function(){
    deleteButtons();


    var gameData = wordsData.giveData();
    const words = new Words(gameData, wordsView);
    words.getWordsToPlay('animal');
    words.prepareRound(0);
    keyPress(words);
    keyRelease();
    keyMouseDown(words);

    var speakButton = document.querySelector('#speaker');
    speakButton.addEventListener('click', function(){
      responsiveVoice.speak(words.word);
    });

  });

  foodButton.addEventListener('click', function(){
    deleteButtons();


    var gameData = wordsData.giveData();
    const words = new Words( gameData, wordsView);
    words.getWordsToPlay('food');
    words.prepareRound(0);
    keyPress(words);
    keyRelease();
    keyMouseDown(words);


    var speakButton = document.querySelector('#speaker');
    speakButton.addEventListener('click', function(){
      responsiveVoice.speak(words.word);
    });

  });

  colourButton.addEventListener('click', function(){
    deleteButtons();


    var gameData = wordsData.giveData();
    const words = new Words(gameData, wordsView);
    words.getWordsToPlay('colour');
    words.prepareRound(0);
    keyPress(words);
    keyRelease();
    keyMouseDown(words);


    var speakButton = document.querySelector('#speaker');
    speakButton.addEventListener('click', function(){
      responsiveVoice.speak(words.word);
    });

  });

  clothingButton.addEventListener('click', function(){
    deleteButtons();


    var gameData = wordsData.giveData();
    const words = new Words( gameData, wordsView);
    words.getWordsToPlay('clothing');
    words.prepareRound(0);
    keyPress(words);
    keyRelease();
    keyMouseDown(words);


    var speakButton = document.querySelector('#speaker');
    speakButton.addEventListener('click', function(){
      responsiveVoice.speak(words.word);
    });

  });

  testButton.addEventListener('click', function(){
    deleteButtons();


    var gameData = wordsData.giveData();
    const words = new Words(gameData, wordsView);
    words.getWordsToPlay('test');
    words.prepareRound(0);
    keyPress(words);
    keyMouseDown(words);
    keyRelease();


    var speakButton = document.querySelector('#speaker');
    speakButton.addEventListener('click', function(){
      responsiveVoice.speak(words.word)
    });






  });



};
window.addEventListener('load', app);


/***/ }),
/* 2 */
/***/ (function(module, exports) {




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
  };

  function changeCSS(keyID){
    document.querySelector(keyID).classList.add('pressed');
    document.querySelector(keyID).classList.add('wrong-key');
  };

  function keyPress(e){
    if(e.keyCode == 48){
      react(game, e.key, '#key_0');
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
module.exports = startKeyListener;


/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports) {




const startKeyListener = function (game){
  document.onmousedown = keyPress;



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

  function changeCSS(keyID){
  document.querySelector(keyID).classList.remove('pressed');
  document.querySelector(keyID).classList.remove('wrong-key');
  document.querySelector(keyID).classList.remove('correct-key');

  }

  function keyPress(e){
    if(e.target.id == 'key_0'){
      react(game, '0', '#key_0');
      setTimeout(function () {
        changeCSS('#key_0')
      }, 300);

    }
    if(e.target.id == 'key_1'){ // 1
      react(game, '1', '#key_1');
      setTimeout(function () {
        changeCSS('#key_1')
      }, 300);
    }
    if(e.target.id == 'key_2'){ // 2
      react(game, '2', '#key_2');
      setTimeout(function () {
        changeCSS('#key_2')
      }, 300);

    }
    if(e.target.id == 'key_3'){ // 3
      react(game, '3', '#key_3');
      setTimeout(function () {
        changeCSS('#key_3')
      }, 300);
    }
    if(e.target.id == 'key_4'){ // 4
      react(game, '4', '#key_4');
      setTimeout(function () {
        changeCSS('#key_4')
      }, 300);

    }
    if(e.target.id == 'key_5'){ // 5
      react(game, '5', '#key_5');
      setTimeout(function () {
        changeCSS('#key_5')
      }, 300);

    }
    if(e.target.id == 'key_6'){ // 6
      react(game, '6', '#key_6');
      setTimeout(function () {
        changeCSS('#key_6')
      }, 300);

    }
    if(e.target.id == 'key_7'){ // 7
      react(game, '7', '#key_7');
      setTimeout(function () {
        changeCSS('#key_7')
      }, 300);

    }
    if(e.target.id == 'key_8'){ // 8
      react(game, '8', '#key_8');
      setTimeout(function () {
        changeCSS('#key_8')
      }, 300);

    }
    if(e.target.id == 'key_9'){ // 9
      react(game, '9', '#key_9');
      setTimeout(function () {
        changeCSS('#key_9')
      }, 300);

    }
    if(e.target.id == 'key_A'){ // a
      react(game, 'a', '#key_A');
      setTimeout(function () {
        changeCSS('#key_A')
      }, 300);

    }
    if(e.target.id == 'key_B'){ // b
      react(game, 'b', '#key_B');
      setTimeout(function () {
        changeCSS('#key_B')
      }, 300);

    }
    if(e.target.id == 'key_C'){ // c
      react(game, 'c', '#key_C');
      setTimeout(function () {
        changeCSS('#key_C')
      }, 300);

    }
    if(e.target.id == 'key_D'){ // d
      react(game, 'd', '#key_D');
      setTimeout(function () {
        changeCSS('#key_D')
      }, 300);

    }
    if(e.target.id == 'key_E'){ // e
      react(game, 'e', '#key_E');
      setTimeout(function () {
        changeCSS('#key_E')
      }, 300);

    }
    if(e.target.id == 'key_F'){ // f
      react(game, 'f', '#key_F');
      setTimeout(function () {
        changeCSS('#key_F')
      }, 300);

    }
    if(e.target.id == 'key_G'){ // g
      react(game, 'g', '#key_G');
      setTimeout(function () {
        changeCSS('#key_G')
      }, 300);

    }
    if(e.target.id == 'key_H'){ // h
      react(game, 'h', '#key_H');
      setTimeout(function () {
        changeCSS('#key_H')
      }, 300);

    }
    if(e.target.id == 'key_I'){ // i
      react(game, 'i', '#key_I');
      setTimeout(function () {
        changeCSS('#key_I')
      }, 300);

    }
    if(e.target.id == 'key_J'){ // j
      react(game, 'j', '#key_J');
      setTimeout(function () {
        changeCSS('#key_J')
      }, 300);

    }
    if(e.target.id == 'key_K'){ // k
      react(game, 'k', '#key_K');
      setTimeout(function () {
        changeCSS('#key_K')
      }, 300);

    }
    if(e.target.id == 'key_L'){ // l
      react(game, 'l', '#key_L');
      setTimeout(function () {
        changeCSS('#key_L')
      }, 300);

    }
    if(e.target.id == 'key_M'){ // m
      react(game, 'm', '#key_M');
      setTimeout(function () {
        changeCSS('#key_M')
      }, 300);

    }
    if(e.target.id == 'key_N'){ // n
      react(game, 'n', '#key_N');
      setTimeout(function () {
        changeCSS('#key_N')
      }, 300);

    }
    if(e.target.id == 'key_O'){ // o
      react(game, 'o', '#key_O');
      setTimeout(function () {
        changeCSS('#key_O')
      }, 300);

    }
    if(e.target.id == 'key_P'){ // p
      react(game, 'p', '#key_P');
      setTimeout(function () {
        changeCSS('#key_P')
      }, 300);

    }
    if(e.target.id == 'key_Q'){ // q
      react(game, 'q', '#key_Q');
      setTimeout(function () {
        changeCSS('#key_Q')
      }, 300);

    }
    if(e.target.id == 'key_R'){ // r
      react(game, 'r', '#key_R');
      setTimeout(function () {
        changeCSS('#key_R')
      }, 300);

    }
    if(e.target.id == 'key_S'){ // s
      react(game, 's', '#key_S');
      setTimeout(function () {
        changeCSS('#key_S')
      }, 300);

    }
    if(e.target.id == 'key_T'){ // t
      react(game, 't', '#key_T');
      setTimeout(function () {
        changeCSS('#key_T')
      }, 300);

    }
    if(e.target.id == 'key_U'){ // u
      react(game, 'u', '#key_U');
      setTimeout(function () {
        changeCSS('#key_U')
      }, 300);

    }
    if(e.target.id == 'key_V'){ // v
      react(game, 'v', '#key_V');
      setTimeout(function () {
        changeCSS('#key_V')
      }, 300);

    }
    if(e.target.id == 'key_W'){ // w
      react(game, 'w', '#key_W');
      setTimeout(function () {
        changeCSS('#key_W')
      }, 300);

    }
    if(e.target.id == 'key_X'){ // x
      react(game, 'x', '#key_X');
      setTimeout(function () {
        changeCSS('#key_X')
      }, 300);

    }
    if(e.target.id == 'key_Y'){ // y
      react(game, 'y', '#key_Y');
      setTimeout(function () {
        changeCSS('#key_Y')
      }, 300);

    }
    if(e.target.id == 'key_Z'){ // z
      react(game, 'z', '#key_Z');
      setTimeout(function () {
        changeCSS('#key_Z')
      }, 300);

    }
    if(e.target.id == 'space'){ // space
      react(game, '-', '#space');
      setTimeout(function () {
        changeCSS('#space')
      }, 300);
    }
    if(e.target.id == 'enter'){ // enter
      react(game, '-', '#enter');
      setTimeout(function () {
        changeCSS('#enter')
      }, 300);
    }
    if(e.target.id == 'key_left'){ // left
      react(game, '-', '#key_left');
      setTimeout(function () {
        changeCSS('#key_left')
      }, 300);
    }
    if(e.target.id == 'key_up'){ // up
      react(game, '-', '#key_up');
      setTimeout(function () {
        changeCSS('#key_up')
      }, 300);
    }
    if(e.target.id == 'key_right'){ // right
      react(game, '-', '#key_right');
      setTimeout(function () {
        changeCSS('#key_right')
      }, 300);
    }
    if(e.target.id == 'key_down'){ // down
      react(game, '-', '#key_down');
      setTimeout(function () {
        changeCSS('#key_down')
      }, 300);
    }

  };
};
module.exports = startKeyListener;


/***/ }),
/* 5 */
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
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ (function(module, exports) {

const FlagsView = function(container){
  this.container = container;
}

FlagsView.prototype.createImage = function (data) {
var image = document.createElement('img');
image.id = "flag-image";
image.src = data.image;
image.alt = data.name;
return image;
};

FlagsView.prototype.winScreen = function (){
  this.container.innerHTML = '';
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

FlagsView.prototype.prepareWord = function(word){
  var wordIn = word;
  var newWord = '';
  var wordSplit = [];
  for (var i = 0; i < wordIn.length; i++) {
    wordSplit.push(wordIn.charAt(i))
    newWord += (wordSplit[i] + ' ');
  }
  return newWord;
}

FlagsView.prototype.updateAnswer = function (newAnswer) {
  answerView = document.querySelector('#flag-answer-display');
  answerView.innerText = this.prepareWord(newAnswer);
};

FlagsView.prototype.clearRound = function(){
  var titleAndFlag = document.querySelector('#title-and-flag')
  titleAndFlag.innerHTML ='';

  var answerAndCounter = document.querySelector('#answer-and-counter')
  answerAndCounter.innerHTML ='';
}

FlagsView.prototype.render = function(data, answerIn, roundCount, totalRounds, map){
  var word = document.createElement('p');
  word.id = "display-country";



  var answer = document.createElement('p');
  answer.id = "flag-answer-display";

  var counter = document.createElement('p');
  counter.id = "counter-display-flag";
  counter.innerText = `${(roundCount + 1)} of  ${totalRounds}`

  var image = this.createImage (data);
  // image.style.cssText = "width: 120px;height: 120px;"
  word.innerText = this.prepareWord(data.name);
  answer.innerText = this.prepareWord(answerIn);

  var titleAndFlag = document.querySelector('#title-and-flag')
  var answerAndCounter = document.querySelector('#answer-and-counter')

  titleAndFlag.appendChild(word);
  titleAndFlag.appendChild(image);
  answerAndCounter.appendChild(answer);
  answerAndCounter.appendChild(counter);


  map.googleMap.setCenter(data.coords);
  map.googleMap.setZoom(data.zoom);

}

module.exports = FlagsView;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

const Words = function(gamedata, gameview){
  this.word = "";
  this.answer = "";
  this.nextletter = "";
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
  this.winCheck(key);
};

module.exports = Maths;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

const Flags = function(gamedata, gameview, map){
  this.word = "";
  this.answer = "";
  this.nextletter = "";
  this.gamedata = gamedata;
  this.gameview = gameview;
  this.wordsToPlay = [];
  this.roundCount = 0;
  this.zoom = 5;
  this.coords = { lat: 56.890671, lng: -4.202646 };
  this.map = map;
}

Flags.prototype.setAnswerLength = function () {
  var newAnswer = "";
  for (var i = 0 ; i < this.word.length ; i++) {
    newAnswer += "_";
  }
  this.answer = newAnswer;
};



Flags.prototype.setWord = function(wordIn){
  this.word = wordIn;
  this.nextletter = this.word.charAt(0);
}

Flags.prototype.setMap = function(object){
  this.coords = object.coords;
  this.zoom = object.zoom;
}

Flags.prototype.shuffle = function(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

Flags.prototype.getFlagsToPlay = function(category){
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
    var shuffleArray = this.shuffle(this.gamedata);
    for (var i = 0; i < 10; i++) {
    this.wordsToPlay.push(shuffleArray[i]);
  }
  }
};

Flags.prototype.fillAnswer = function (letter) {
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

Flags.prototype.checkLetter = function(letterIn){
  if (letterIn === this.nextletter){
    this.fillAnswer(letterIn);
  }
}

Flags.prototype.prepareRound = function(index){
  var numberofRounds = this.wordsToPlay.length;
  for (var i = 0; i < numberofRounds; i++) {
    if (index === i){
      this.setWord(this.wordsToPlay[i].name);
      this.setMap(this.wordsToPlay[i]);
      this.setAnswerLength();
      this.gameview.render(this.wordsToPlay[i], this.answer, this.roundCount, numberofRounds, this.map);
    }
    if (index >= this.wordsToPlay.length){

      this.gameview.winScreen();
    }
  }
};


Flags.prototype.winCheck = function () {
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

Flags.prototype.run = function(letter){
  this.checkLetter(letter);
  this.gameview.updateAnswer(this.answer);
  return(this.winCheck());
};




module.exports = Flags;


/***/ }),
/* 12 */
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