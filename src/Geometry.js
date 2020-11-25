const ROOT3 = Math.sqrt(3)
const HEXWIDTH = ROOT3

class CanvasPoint {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  toString() {
    return this.x + ', ' + this.y
  }
}

class AxialPoint {
  constructor(q, r) {
    this.q = q
    this.r = r
  }

  toCanvasPoint() {
    return new CanvasPoint(ROOT3*this.q + ROOT3/2*this.r, 3/2*this.r)
  }

  sum({q, r}) {
    return new AxialPoint(this.q + q, this.r + r)
  }

  toString() {
    return this.q + ', ' + this.r
  }
}

const HEXOFFSETS = [0, 1, 2, 3, 4, 5].map(i => {
  const x = Math.sin(i * Math.PI/3)
  const y = Math.cos(i * Math.PI/3)
  return new CanvasPoint(x, y)
})

const DIRECTIONS = [
  new AxialPoint(0, 1),
  new AxialPoint(1, 0),
  new AxialPoint(0, -1),
  new AxialPoint(-1, 0),
  new AxialPoint(1, -1),
  new AxialPoint(-1, 1),
]

function hexVertices(cpoint, rad) {
  return HEXOFFSETS.map((offset) => new CanvasPoint(cpoint.x + rad*offset.x, cpoint.y + rad*offset.y))
}

export { AxialPoint, hexVertices, DIRECTIONS }
