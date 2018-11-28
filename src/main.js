import './sass/styles.sass'
import './sass/reset.css'

import {SIZE, SYMBOLS} from './const.js'
import { Player } from './player.js'
import { controlInit } from './control.js'
import { Map } from './map.js'
import { Camera } from './camera.js'


const game = document.querySelector('#app');

let player = new Player(0, 0);
let previousState = {}
let camera = new Camera();
let mapManager = new Map();
let map = mapManager.create(player, camera);

function run_level() {
  //player.map = map;
  //player.move(spawnCoordinates.x, spawnCoordinates.y);
  previousState = {
    x: player.x,
    y: player.y
  }


  // Input
  controlInit(player, map, camera);
  // Initial Draw
  camera.moveOnPlayer(player);
  draw(map);
  // Update
  setInterval(_ => update(map), 1000/60);
}

function update() {
  // player.update
  player.roomId = map[player.y][player.x].roomId;
  draw(map);
}

function draw(map) {
  // mapManager.draw
  let lighted = mapManager.FOV(player, camera);
  let screen = [];
  for (let i = camera.y; i < camera.y+camera.h; i++) {
    screen[i] = [];
    for (let j = camera.x; j < camera.x+camera.w; j++) {

      let cell = map[i][j];
      if (lighted == cell.roomId && cell.type == 'floor')
        screen[i][j] = SYMBOLS.light;
      else
        screen[i][j] = SYMBOLS[cell.type];
    }
  }
  // player.draw
  screen[player.y][player.x] = SYMBOLS.player; //TODO: 
  game.innerHTML = screen.flat().join('');
}

run_level();