import React, {useState} from 'react'

import './App.css'

const ROOT3 = Math.sqrt(3)
const HEXHEIGHT = 2
const HEXWIDTH = ROOT3

function hexVertices(cx, cy, rad) {
  return(
    [0, 1, 2, 3, 4, 5].map(i => {
      const x = cx + rad * Math.sin(i * Math.PI/3)
      const y = cy + rad * Math.cos(i * Math.PI/3)
      return x + ',' + y
    })
  )
}

function regHexGrid(rad) {
  const max = 2*rad - 1
  let grid = []
  for (let r = 0; r < max; r += 1) {
    let row = []
    for (let q = 0; q < max; q += 1) {
      if ((r + q >= rad - 1) && (r + q <= 3*rad - 3)) {
        row.push(<Tile r={r} q={q} key={r + ',' + q}/>)
      } else {
        row.push(null)
      }
    }
    grid.push(row)
  }
  return grid
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
  const grid = regHexGrid(rad)
  const boxSize = [
    (rad - 3)/2*HEXWIDTH, -HEXHEIGHT, 2*rad*HEXWIDTH, (3*rad + 1)
  ]
  return (
    <div className="RegHexGrid">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={boxSize.join(' ')}>
        <rect x={boxSize[0]} y={boxSize[1]} width="100%" height="100%" fill="none" strokeWidth="0.1" stroke="blue"/>
        {[].concat(...grid)}
      </svg>
    </div>
  )
}

function Tile({q, r, ...otherprops}) {
  const [cx, cy] = [ROOT3*q + ROOT3/2*r, 3/2*r]
  return (
    <polygon
      fill="none" stroke="black" strokeWidth="0.1"
      points={hexVertices(cx, cy, 1)}
    />
  )
}

export default App
