const HEXWIDTH = Math.sqrt(3)

class CanvasPoint {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    toString(): string {
        return this.x + ', ' + this.y
    }
}

class AxialPoint {
    q: number
    r: number

    constructor(q: number, r: number) {
        this.q = q
        this.r = r
    }

    toCanvasPoint(): CanvasPoint {
        return new CanvasPoint(HEXWIDTH*this.q + HEXWIDTH/2*this.r, 3/2*this.r)
    }

    add(point: AxialPoint): AxialPoint {
        return new AxialPoint(this.q + point.q, this.r + point.r)
    }

    toString(): string {
        return this.q + ', ' + this.r
    }
}

const HEXOFFSETS = [0, 1, 2, 3, 4, 5].map(i => {
  const x = Math.sin(i * Math.PI/3)
  const y = Math.cos(i * Math.PI/3)
  return new CanvasPoint(x, y)
})

function hexVertices(cpoint: CanvasPoint, rad: number): CanvasPoint[] {
  return HEXOFFSETS.map((offset) => new CanvasPoint(cpoint.x + rad*offset.x, cpoint.y + rad*offset.y))
}

const DIRECTIONS = [
  new AxialPoint(0, 1),
  new AxialPoint(1, 0),
  new AxialPoint(0, -1),
  new AxialPoint(-1, 0),
  new AxialPoint(1, -1),
  new AxialPoint(-1, 1),
]

export { AxialPoint, hexVertices, DIRECTIONS, HEXWIDTH }
