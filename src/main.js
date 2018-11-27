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
let map = mapManager.create_and_render(player, camera);

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
  draw();
  // Update
  setInterval(_ => update(map), 1000/60);
}

function update() {
  if (previousState.x != player.x || previousState.y != player.y) {
    map[previousState.y][previousState.x] = SYMBOLS.floor;
    previousState.x = player.x;
    previousState.y = player.y;
    map[player.y][player.x] = SYMBOLS.player;
  }
  draw();
}

function draw() {
  //if (changed) { //!areMapsEqual(_map, previousState.map)
  // let {x, y, w, h} = map.camera;

  screen = '';
  for (let i = camera.y; i < camera.y+camera.h; i++) {
    for (let j = camera.x; j < camera.x+camera.w; j++) {
      screen += map[i][j];
    }
    screen += '<br />';                   
  }
  game.innerHTML = screen;
  //}
}

run_level();