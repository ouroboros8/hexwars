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

class CubePoint {
  x: number
  y: number
  z: number

  constructor(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
  }

  toAxialPoint(): AxialPoint {
    const q = this.x
    const r = this.z
    return new AxialPoint(q, r)
  }

  toString(): string {
    return [this.x, this.y, this.z].join(', ')
  }
}

class AxialPoint {
  q: number
  r: number

  constructor(q: number, r: number) {
    this.q = q
    this.r = r
  }

  static fromString(s: string) {
    const [q, r] = s.split(', ').map(parseInt)
    return new AxialPoint(q, r)
  }

  add(p: AxialPoint): AxialPoint {
    return new AxialPoint(this.q + p.q, this.r + p.r)
  }

  range(n: number): AxialPoint[] {
    let results: AxialPoint[] = []
    for (let x = -n; x <= n; x++) {
      for (let y = Math.max(-n, -x-n); y <= Math.min(n, -x+n); y++) {
        const z = -x-y
        const d = new CubePoint(x, y, z).toAxialPoint()
        results.push(this.add(d))
      }
    }
    return results
}


  toCubePoint(): CubePoint {
    let x = this.q
    let z = this.r
    return new CubePoint(x, -x-z, z)
  }

  toCanvasPoint(): CanvasPoint {
    return new CanvasPoint(HEXWIDTH*this.q + HEXWIDTH/2*this.r, 3/2*this.r)
  }

  toString(): string {
    return this.q + ', ' + this.r
  }
}

function hexVertices(c: CanvasPoint, rad: number): CanvasPoint[] {
  const hexOffsets: CanvasPoint[] = [0, 1, 2, 3, 4, 5].map(i => {
    const x = Math.sin(i * Math.PI/3)
    const y = Math.cos(i * Math.PI/3)
    return new CanvasPoint(x, y)
  })
  return hexOffsets.map(
    (offset) => new CanvasPoint(c.x + rad*offset.x, c.y + rad*offset.y)
  )
}

export { AxialPoint, CanvasPoint, CubePoint, HEXWIDTH, hexVertices }
