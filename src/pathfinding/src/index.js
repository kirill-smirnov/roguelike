import PF from 'pathfinding';

const x = 1000, y = 1000;

const grid = new PF.Grid(x, y);

const astar = new PF.DijkstraFinder();

let time = Date.now()

let path = astar.findPath(1, 2, 999, 687, grid);
console.log(Date.now() - time)
console.log(path)

