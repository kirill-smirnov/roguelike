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
  draw(map);
  camera.moveOnPlayer(player);
  // Update
  setInterval(_ => update(map), 1000/60);
}

function update() {
  if (previousState.x != player.x || previousState.y != player.y) {
    // Map update
    map[previousState.y][previousState.x].object = null;
    map[player.y][player.x].object = player.info;
    // Player update
    player.roomId = map[player.y][player.x].roomId;
    // other
    previousState.x = player.x;
    previousState.y = player.y;
  }
  map.FOV()
  draw(map);
}

function draw(map) {
  //if (changed) { //!areMapsEqual(_map, previousState.map)
  // let {x, y, w, h} = map.camera;
  screen = '';
  for (let i = camera.y; i < camera.y+camera.h; i++) {
    for (let j = camera.x; j < camera.x+camera.w; j++) {

      let cell = map[i][j];
      if (cell.object == null) {
        screen += SYMBOLS[cell.type];
      }
      else {
        if (cell.object.type =='player') {
          screen += SYMBOLS.player;
        }
      }
      
    }
    screen += '<br />';
    
  }
  game.innerHTML = screen;
}

run_level();