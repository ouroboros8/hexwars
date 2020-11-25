const ROOT3 = Math.sqrt(3)

const CanvasPoint = (x,y) => ({
    x,
    y,
    toString: () => x + ', ' + y  
})

const AxialPoint = (q,r) => ({
  q,
  r,
  toCanvasPoint: () => new CanvasPoint(ROOT3*this.q + ROOT3/2*this.r, 3/2*this.r),
  sum: ({q, r}) => new AxialPoint(this.q + q, this.r + r),
  toString: () => q + ', ' + r
});

const HEXOFFSETS = [0, 1, 2, 3, 4, 5].map(i => new CanvasPoint(
    Math.sin(i * Math.PI/3), 
    Math.cos(i * Math.PI/3))
);

const DIRECTIONS = [
  new AxialPoint(0, 1),
  new AxialPoint(1, 0),
  new AxialPoint(0, -1),
  new AxialPoint(-1, 0),
  new AxialPoint(1, -1),
  new AxialPoint(-1, 1),
]

const hexVertices = (cpoint, rad) => HEXOFFSETS.map((offset) => new CanvasPoint(cpoint.x + rad*offset.x, cpoint.y + rad*offset.y))


export { AxialPoint, hexVertices, DIRECTIONS }
