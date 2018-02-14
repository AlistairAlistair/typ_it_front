


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



  function keyPress(e){
    console.log((e.target.id));
    if(e.target.id == 'key_0'){
      react(game, '0', '#key_0');
    }
    if(e.target.id == 'key_1'){ // 1
      react(game, '1', '#key_1');
    }
    if(e.target.id == 'key_2'){ // 2
      react(game, '2', '#key_2');

    }
    if(e.target.id == 'key_3'){ // 3
      react(game, '3', '#key_3');
    }
    if(e.target.id == 'key_4'){ // 4
      react(game, '4', '#key_4');

    }
    if(e.target.id == 'key_5'){ // 5
      react(game, '5', '#key_5');

    }
    if(e.target.id == 'key_6'){ // 6
      react(game, '6', '#key_6');

    }
    if(e.target.id == 'key_7'){ // 7
      react(game, '7', '#key_7');

    }
    if(e.target.id == 'key_8'){ // 8
      react(game, '8', '#key_8');

    }
    if(e.target.id == 'key_9'){ // 9
      react(game, '9', '#key_9');

    }
    if(e.target.id == 'key_A'){ // a
      react(game, 'a', '#key_A');

    }
    if(e.target.id == 'key_B'){ // b
      react(game, 'b', '#key_B');

    }
    if(e.target.id == 'key_C'){ // c
      react(game, 'c', '#key_C');

    }
    if(e.target.id == 'key_D'){ // d
      react(game, 'd', '#key_D');

    }
    if(e.target.id == 'key_E'){ // e
      react(game, 'e', '#key_E');

    }
    if(e.target.id == 'key_F'){ // f
      react(game, 'f', '#key_F');

    }
    if(e.target.id == 'key_G'){ // g
      react(game, 'g', '#key_G');

    }
    if(e.target.id == 'key_H'){ // h
      react(game, 'h', '#key_H');

    }
    if(e.target.id == 'key_I'){ // i
      react(game, 'i', '#key_I');

    }
    if(e.target.id == 'key_J'){ // j
      react(game, 'j', '#key_J');

    }
    if(e.target.id == 'key_K'){ // k
      react(game, 'k', '#key_K');

    }
    if(e.target.id == 'key_L'){ // l
      react(game, 'l', '#key_L');

    }
    if(e.target.id == 'key_M'){ // m
      react(game, 'm', '#key_M');

    }
    if(e.target.id == 'key_N'){ // n
      react(game, 'n', '#key_N');

    }
    if(e.target.id == 'key_O'){ // o
      react(game, 'o', '#key_O');

    }
    if(e.target.id == 'key_P'){ // p
      react(game, 'p', '#key_P');

    }
    if(e.target.id == 'key_Q'){ // q
      react(game, 'q', '#key_Q');

    }
    if(e.target.id == 'key_R'){ // r
      react(game, 'r', '#key_R');

    }
    if(e.target.id == 'key_S'){ // s
      react(game, 's', '#key_S');

    }
    if(e.target.id == 'key_T'){ // t
      react(game, 't', '#key_T');

    }
    if(e.target.id == 'key_U'){ // u
      react(game, 'u', '#key_U');

    }
    if(e.target.id == 'key_V'){ // v
      react(game, 'v', '#key_V');

    }
    if(e.target.id == 'key_W'){ // w
      react(game, 'w', '#key_W');

    }
    if(e.target.id == 'key_X'){ // x
      react(game, 'x', '#key_X');

    }
    if(e.target.id == 'key_Y'){ // y
      react(game, 'y', '#key_Y');

    }
    if(e.target.id == 'key_Z'){ // z
      react(game, 'z', '#key_Z');

    }
    if(e.target.id == 'space'){ // space
      react(game, '-', '#space');
    }
    if(e.target.id == 'enter'){ // enter
      react(game, '-', '#enter');
    }
    if(e.target.id == 'key_left'){ // left
      react(game, '-', '#key_left');
    }
    if(e.target.id == 'key_up'){ // up
      react(game, '-', '#key_up');
    }
    if(e.target.id == 'key_right'){ // right
      react(game, '-', '#key_right');
    }
    if(e.target.id == 'key_down'){ // down
      react(game, '-', '#key_down');
    }

  };
};
module.exports = startKeyListener;
