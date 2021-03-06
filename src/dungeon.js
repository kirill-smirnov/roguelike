import {SIZE} from './const.js'

const _ = {
  random: function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

// by Victor Catalin Torac, 2016

export function createDungeon(h,w, nRooms, size) {
  const GRID_HEIGHT = h || SIZE.h;
  const GRID_WIDTH = w || SIZE.w;
  const MAX_ROOMS = nRooms || 2000;
  const ROOM_SIZE_RANGE = size || [7, 12];
  
  let counter = 1;

  const c= { GRID_HEIGHT, GRID_WIDTH, MAX_ROOMS, ROOM_SIZE_RANGE};
  // HELPER FUNCTIONS FOR CREATING THE MAP
  const isValidRoomPlacement = (grid, {x, y, width = 1, height = 1}) => {
    // check if on the edge of or outside of the grid
    if (y < 1 || y + height > grid.length - 1) {
      return false;
    }
    if (x < 1 || x + width > grid[0].length - 1) {
      return false;
    }

    // check if on or adjacent to existing room
    for (let i = y - 1; i < y + height + 1; i++) {
      for (let j = x - 1; j < x + width + 1; j++) {
        if (grid[i][j].type === 'floor') {
          return false;
        }
      }
    }
    // all grid cells are clear
    return true;
  };

  const placeCells = (grid, {x, y, width = 1, height = 1, id}, type = 'floor') => {
    for (let i = y; i < y + height; i++) {
      for (let j = x; j < x + width; j++) {
        grid[i][j] = {type, roomId:id};
      }
    }
    return grid;
  };

  const createRoomsFromSeed = (grid, {x, y, width, height, id}, range = c.ROOM_SIZE_RANGE) => {
    // range for generating the random room heights and widths
    const [min, max] = range;

    // generate room values for each edge of the seed room
    const roomValues = [];

    const north = { height: _.random(min, max), width: _.random(min, max) };
    north.x = _.random(x, x + width - 1);
    north.y = y - north.height - 1;
    north.doorx = _.random(north.x, (Math.min(north.x + north.width, x + width)) - 1);
    north.doory = y - 1;
    roomValues.push(north);

    const east = { height: _.random(min, max), width: _.random(min, max) };
    east.x = x + width + 1;
    east.y = _.random(y, height + y - 1);
    east.doorx = east.x - 1;
    east.doory = _.random(east.y, (Math.min(east.y + east.height, y + height)) - 1);
    roomValues.push(east);

    const south = { height: _.random(min, max), width: _.random(min, max) };
    south.x = _.random(x, width + x - 1);
    south.y = y + height + 1;
    south.doorx = _.random(south.x, (Math.min(south.x + south.width, x + width)) - 1);
    south.doory = y + height;
    roomValues.push(south);

    const west = { height: _.random(min, max), width: _.random(min, max) };
    west.x = x - west.width - 1;
    west.y = _.random(y, height + y - 1);
    west.doorx = x - 1;
    west.doory = _.random(west.y, (Math.min(west.y + west.height, y + height)) - 1);
    roomValues.push(west);

    const placedRooms = [];
    roomValues.forEach((room, i) => {
      if (isValidRoomPlacement(grid, room)) {
        room.id = counter++;
        // place room
        grid = placeCells(grid, room);
        // place door
        grid = placeCells(grid, {x: room.doorx, y: room.doory}, 'door');
        // need placed room values for the next seeds
        placedRooms.push(room);
      }
    });
    return {grid, placedRooms};
  };

  // BUILD OUT THE MAP
  let levelRequired = 1;// Dungeons with few levels of depth
  let map = [];

  for (let i=0; i < levelRequired; i++) {
    // 1. make a grid of 'empty' cells, with a random opacity value (for styling)
    let grid = [];
    for (let i = 0; i < c.GRID_HEIGHT; i++) {
      grid.push([]);
      for (let j = 0; j < c.GRID_WIDTH; j++) {
        grid[i].push({type: 'wall'});
      }
    }

    // 2. random values for the first room
    const [min, max] = c.ROOM_SIZE_RANGE;
    const firstRoom = {
      x: _.random(1, c.GRID_WIDTH - max - 15),
      y: _.random(1, c.GRID_HEIGHT - max - 15),
      height: _.random(min, max),
      width: _.random(min, max),
      id: 0
    };

    // 3. place the first room on to grid
    grid = placeCells(grid, firstRoom);

    // 4. using the first room as a seed, recursivley add rooms to the grid
    const growMap = (grid, seedRooms, maxRooms = c.MAX_ROOMS) => {
      if (counter + seedRooms.length > maxRooms || !seedRooms.length) {
        return grid;
      }
      let room = seedRooms.pop();
      room.id = counter;

      grid = createRoomsFromSeed(grid, room);
      seedRooms.push(...grid.placedRooms);
      //counter += grid.placedRooms.length;
      return growMap(grid.grid, seedRooms);
    };
    map.push(growMap(grid, [firstRoom]));
  }

  return map;
};
