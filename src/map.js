import {SYMBOLS, SIZE} from './const.js'
import {createDungeon} from './dungeon.js'
// import * as inFov from './fov.js';

export class Map {
  constructor() {
    this.map = [];
  }
  create(player) {
    let isSpawned = false;
    let m = createDungeon();

    for (let i = 0; i < m.length; i++) {
      for (let j = 0; j < m[i].length; j++) {
        m[i][j].lighted = false;
        let type = m[i][j].type;
        if (type === 'floor' && !isSpawned) {
          // spawn
          player.roomId = m[i][j].roomId;
          //m[i][j].object = player.info;
          player.move(j,i);
          isSpawned = true;
        }
      }
    }
    this.map = m;
    return this.map;
  }


    FOV(player, camera) {
    let map = this.map;
    let radius = 10;
    for (let i = camera.y; i < camera.y+camera.h; i++) {
      for (let j = camera.x; j < camera.x+camera.w; j++) {
        if (map[i][j].type == 'floor' && map[i][j].roomId == player.roomId &&
         Math.sqrt((i-player.y)**2+(j-player.x)**2) < radius) {
          map[i][j].lighted = true;
        } else {
           map[i][j].lighted = false;
        }
      }
    }
  }
}
