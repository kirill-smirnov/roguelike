import {SYMBOLS, SIZE} from './const.js'
import {createDungeon} from './dungeon.js'

export class Map {
  constructor() {
    this.map = [];
  }
  create(player) {
    let isSpawned = false;
    let m = createDungeon();

    for (let i = 0; i < m.length; i++) {
      for (let j = 0; j < m[i].length; j++) {
        let type = m[i][j].type;
        if (type === 'floor' && !isSpawned) {
          // spawn
          player.roomId = m[i][j].roomId;
          m[i][j].object = player.info;
          player.move(j,i);
          isSpawned = true;
        }
      }
    }
    this.map = m;
    return this.map;
  }
  // create_and_render(player, camera) {

  //   let d = this.create(player);
  //   camera.moveOnPlayer(player);
  //   this.FOV(player, camera);
  //   let m = this.render;

  //   for (let i = 0; i < d.length; i++) {
  //     m[i] = [];
  //     for (let j = 0; j < d[i].length; j++) {
  //       let type = d[i][j].type;
  //       m[i][j] = SYMBOLS[type];
  //     }
  //   }
  //   return this.render;
  // }

  // no_collision(player, camera, i, j) {
  //     let tan = (i-player.y)/(j-player.x);
  //     let y = x => tan*x+player.y;
  //     for (let x = camera.x; x < camera.x+camera.w; x++) {
  //       let _y = y(x)
  //       if (_y < camera.y || _y > Math.min(camera.y+camera.h, SIZE.h) || isNaN(_y)) continue;
  //       console.log(player.x, player.y)
  //       if (this.map[Math.floor(y(x))][x].type == SYMBOLS["0"]) {
  //         this.map[Math.floor(y(x))][x].type = '.'
  //         return false;
  //       }
  //     }
  //     return true;
  //  }

  FOV(player, camera) {
    let map = this.map;
    for (let i = camera.y; i < camera.y+camera.h; i++) {
      for (let j = camera.x; j < camera.x+camera.w; j++) {
        
      }
    }
  }
}
