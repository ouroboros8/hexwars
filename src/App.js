import React, {useState} from 'react'

import {AxialPoint, hexVertices, HEXWIDTH} from './Geometry'
import {Unit} from './Units'
import './App.css'

const ViewContext = React.createContext([])

function App() {
  const [view, setView] = useState('menu')
  const views = {
    'menu': <Menu setView={setView}/>,
    'game': <Game size={10}/>,
  }
  return (
    <div className="App">
      <ViewContext.Provider value={[view, setView]}>
        {views[view]}
      </ViewContext.Provider>
    </div>
  )
}

function Menu({setView, ...otherprops}) {
  return <ul>
    <li onClick={() => setView('game')}>New game</li>
  </ul>
}

function regHexPoints(rad) {
  // Generates a list of axial co-ordinates describing a regular
  // hexagon with the origin at its centre
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

function Game({size, ...otherprops}) {
  const viewWidth = 2*HEXWIDTH*size
  const viewHeight = 3*size + 1
  const boxSize = [-viewWidth/2, -viewHeight/2, viewWidth, viewHeight]
  return (
    <div className='Game'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={boxSize.join(' ')}>
        <Map size={size}/>
        <Unit r={0} q={0}/>
      </svg>
    </div>
  )
}

function Map({size, ...otherprops}) {
  'A hexagonal grid in the shape of a regular multihex'
  const tiles = regHexPoints(size).map((point) => <Tile {...point} key={point}/>)
  return <>
    {tiles}
  </>
}

function Tile({q, r, ...otherprops}) {
  const cpoint = new AxialPoint(q, r).toCanvasPoint()
  return (
    <>
    <polygon
      fill="none" stroke="black" strokeWidth="0.1"
      points={hexVertices(cpoint, 1).join(',')}
    />
    <text {...cpoint} textAnchor="middle" fontSize="0.5">{[q, r].join(', ')}</text>
    </>
  )
}

export default App
