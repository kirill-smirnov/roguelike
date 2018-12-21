import {SYMBOLS, SIZE} from './const.js'
import {createDungeon} from './dungeon.js'
// import * as inFov from './fov.js';

export class Map {
  constructor() {
    this.map = {
      world: null,
      towns: [],
      dungeons: []
    };
    //this.currentMap = null;
    this.currentDungeonLevel = 0;

    let dungeon = this.createAndNormalizeDungeon();
    this.currentMap = dungeon[this.currentDungeonLevel];
  }

  // create() {
  //   let dungeon = this.createAndNormalizeDungeon();
  //   this.currentMap = dungeon[this.currentDungeonLevel];
  //   return this.currentMap;
  // }


  createAndNormalizeDungeon() {
    let m = createDungeon(); // array of levels

    for (let i = 0; i < m.length; i++) {
      for (let j = 0; j < m[i].length; j++) {
        m[i][j].lighted = false;
      }
    }
    this.map.dungeons.push(m);
    return m;
  }

  update(camera) {
    let map = this.currentMap;
    
    for (let i = camera.y; i < camera.y+camera.h; i++) {
      for (let j = camera.x; j < camera.x+camera.w; j++) {
        map[i][j].lighted = false;
      }
    }

  }

  FOV(player, camera) {
    let map = this.currentMap;
    let radius = 10;

    for (let phi = 0; phi < 360; phi++) {
      let x=Math.cos(phi*Math.PI/180);
      let y=Math.sin(phi*Math.PI/180);
      let ox = player.x + 0.5;
      let oy = player.y + 0.5;
      for (let r = 0; r < radius; r++) {
        let i = Math.floor(oy), j = Math.floor(ox);
        if (i >= SIZE.h || j >= SIZE.w || i < 0 || j < 0)
          continue
        if (map[i][j].type === 'wall') {
          break;
        }
        else map[i][j].lighted = true;
        ox +=x;
        oy += y;
      }
    }
  }
}
