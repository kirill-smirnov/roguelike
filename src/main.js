import './sass/styles.sass'
import './sass/reset.css'

import {SIZE, SYMBOLS} from './const.js'
import { Player, Monster } from './character.js'
import { controlInit } from './control.js'
import { Map } from './map.js'
import { Camera } from './camera.js'


const game = document.querySelector('#map');

let player = new Player(0, 0);

let camera = new Camera();
let mapManager = new Map();
let map = mapManager.create(player, camera);
let isControlOn = false;



function run_level() {


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
  // player.update
  player.roomId = map[player.y][player.x].roomId;

  // mapManager update
  for (let i = camera.y; i < camera.y+camera.h; i++) {
    screen[i] = [];
    for (let j = camera.x; j < camera.x+camera.w; j++) {
      map[i][j].lighted = false;
    }
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
  // player.draw
  screen[player.y][player.x] = SYMBOLS.player; //TODO: 
  game.innerHTML = screen.flat().join('');
}

run_level();