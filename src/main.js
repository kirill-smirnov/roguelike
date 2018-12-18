import './sass/styles.sass'
import './sass/reset.css'

import {SIZE, SYMBOLS} from './const.js'
import { Player, Monster } from './entities.js'
import { controlInit } from './control.js'
import { Map } from './map.js'
import { Camera } from './camera.js'
import { GUI } from './gui.js'

Object.defineProperty(Array.prototype, 'flat', {
    value: function(depth = 1) {
      return this.reduce(function (flat, toFlatten) {
        return flat.concat((Array.isArray(toFlatten) && (depth-1)) ? toFlatten.flat(depth-1) : toFlatten);
      }, []);
    }
});

const game = document.querySelector('#map');

let player = new Player();

let camera = new Camera();
let mapManager = new Map();
let map = mapManager.create();
let isControlOn = false;

let objects = [];

function run_level() {
  GUI.log('Welcome to world of Ghoarthea')
  //spawn player 
  player.spawn(map);
  objects.push(player);
  objects = objects.concat(Monster.spawnMany(map, 2000 ));

  // Input
  if (!isControlOn) {
    controlInit(player, map, camera)
    isControlOn = true;
  }
  // Initial Draw
  camera.moveOnPlayer(player);

  draw(map);
  // Update
  setInterval(_ => update(map), 1000/60);
}

function update() {
  // mapManager update
  mapManager.update(camera);

  for (let o of objects) {
    o.update(objects)
  }

  draw(map);
}

function draw(map) {
  // mapManager.draw
  mapManager.FOV(player, camera);

  let screen = [];
  for (let i = camera.y; i < camera.y+camera.h; i++) {
    screen[i] = [];
    for (let j = camera.x; j < camera.x+camera.w; j++) {
      let cell = map[i][j];
        if (cell.lighted) {
          screen[i][j] = SYMBOLS.light;
        }
        else
          screen[i][j] = SYMBOLS[cell.type];
    }
  }
  // object.draw

  for (let o of objects.filter(o => o.x >= camera.x && o.x < camera.x+camera.w && o.y >=camera.y && o.y < camera.y+camera.h)) {
    if (!o.isDead)
      screen[o.y][o.x] = SYMBOLS[o.type];
  }

  screen[player.y][player.x] = SYMBOLS.player;
  //game.innerHTML = screen.flat().join('');

  game.innerHTML = '';
 
 for (let i = camera.y; i < camera.y+camera.h; i++) {
    //for (let j = camera.x; j < camera.x+camera.w; j++) {
      game.innerHTML += screen[i].join('') + '<br>';
    //}
  }


  GUI.updateGUI(player);
}

run_level();