import {SYMBOLS} from './const.js'
import {createDungeon} from './dungeon.js'
//import { player } from './player.js'

export class Map {
  constructor() {
    this.map = [];
    this.render = []
  }
  create(player) {
    let isSpawned = false;
    let m = createDungeon();

    for (let i = 0; i < m.length; i++) {
      for (let j = 0; j < m[i].length; j++) {
        let type = m[i][j].type;
        if (type === 'floor' && !isSpawned) {
          m[i][j] = player.info; // spawn
          player.move(j,i);
          isSpawned = true;
        }
      }
    }
    this.map = m;
    return this.map;
  }
  create_and_render(player, camera) {

    let d = this.create(player);
    let m = this.render;
    // let spawnCoordinates = {}

    for (let i = 0; i < d.length; i++) {
      m[i] = [];
      for (let j = 0; j < d[i].length; j++) {
        let type = d[i][j].type;
        m[i][j] = SYMBOLS[type];
        
      }
    }
    return m;
  }
}

// export function createMap() {
//   let isSpawned = false;

//   let d = createDungeon();
//   let m = [];
//   let spawnCoordinates = {}

//   for (let i = 0; i < d.length; i++) {
//     m[i] = [];
//     for (let j = 0; j < d[i].length; j++) {
//       let type = d[i][j].type;
//       m[i][j] = SYMBOLS[type];
//       if (type === 'floor' && !isSpawned) {
//         m[i][j] = SYMBOLS.player; // spawn
//         spawnCoordinates = {y:i, x:j}
//         isSpawned = true;
//       }
//     }
//   }
//   return [m, spawnCoordinates];
// }