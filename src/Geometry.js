const HEXWIDTH = Math.sqrt(3)

const CanvasPoint = (x, y) => Object.freeze({
  x, y,

  toString: () => x + ', ' + y,
})

const AxialPoint = (q, r) => Object.freeze({
  q, r,

  toCanvasPoint: () => CanvasPoint(
    HEXWIDTH*q + HEXWIDTH/2*r, 3/2*r
  ),

  sum: (point) => AxialPoint(q + point.q, r + point.r),

  toString: () => q + ', ' + r,
})

const HEXOFFSETS = [0, 1, 2, 3, 4, 5].map(i => {
  const x = Math.sin(i * Math.PI/3)
  const y = Math.cos(i * Math.PI/3)
  return CanvasPoint(x, y)
})

function hexVertices(cpoint, rad) {
  return HEXOFFSETS.map((offset) => CanvasPoint(cpoint.x + rad*offset.x, cpoint.y + rad*offset.y))
}

const DIRECTIONS = [
  AxialPoint(0, 1),
  AxialPoint(1, 0),
  AxialPoint(0, -1),
  AxialPoint(-1, 0),
  AxialPoint(1, -1),
  AxialPoint(-1, 1),
]

export { AxialPoint, hexVertices, DIRECTIONS, HEXWIDTH }
