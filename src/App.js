import React, {useState} from 'react'

import './App.css'

const ROOT3 = Math.sqrt(3)
const HEXHEIGHT = 2
const HEXWIDTH = ROOT3

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class AxialPoint {
  constructor(q, r) {
    this.q = q
    this.r = r
  }

  toPoint() {
    return new Point(ROOT3*this.q + ROOT3/2*this.r, 3/2*this.r)
  }
}

function hexVertices(cx, cy, rad) {
  return(
    [0, 1, 2, 3, 4, 5].map(i => {
      const x = cx + rad * Math.sin(i * Math.PI/3)
      const y = cy + rad * Math.cos(i * Math.PI/3)
      return x + ',' + y
    })
  )
}

function regHexCoords(rad) {
  // Generates a list of axial co-ordinates describing a regular hexagon with
  // the origin at its centre
  const min = 1 - rad
  const max = rad - 1
  const area = 3*Math.pow(rad, 2) - 3*rad + 1

  const result = Array(area)
  let i = 0
  for (let r = min; r <= max; r += 1) {
    for (let q = min; q <= max; q += 1) {
      if (Math.abs(q + r) <= max) {
        result[i] = new AxialPoint(q, r)
        i++
      }
    }
  }
  return result
}

function App() {
  return (
    <div className="App">
      <RegHexGrid rad={10}/>
    </div>
  )
}

function RegHexGrid({rad, ...otherprops}) {
  'A hexagonal grid in the shape of a regular multihex'
  const tiles = regHexCoords(rad).map((coord, i) => <Tile {...coord} key={i}/>)
  const viewWidth = 2*HEXWIDTH*rad
  const viewHeight = 3*rad + 1
  const boxSize = [-viewWidth/2, -viewHeight/2, viewWidth, viewHeight]
  return (
    <div className="RegHexGrid">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={boxSize.join(' ')}>
        <rect x={boxSize[0]} y={boxSize[1]} width="100%" height="100%" fill="none" strokeWidth="0.1" stroke="blue"/>
        {tiles}
        <Unit q="0" r="0"/>
      </svg>
    </div>
  )
}

function Tile({q, r, ...otherprops}) {
  const point = new AxialPoint(q, r).toPoint()
  return (
    <>
    <polygon
      fill="none" stroke="black" strokeWidth="0.1"
      points={hexVertices(point.x, point.y, 1)}
    />
    <text {...point} textAnchor="middle" fontSize="0.5">{[q, r].join(', ')}</text>
    </>
  )
}

function Unit({q, r, ...otherprops}) {
  let [coord, setCoord] = useState(new AxialPoint(q, r))
  const {x, y} = coord.toPoint()
  return (
    <circle
      cx={x} cy={y} r="0.5"
      fill="red" stroke="black" strokeWidth="0.1"
    />
  )
}

export default App
