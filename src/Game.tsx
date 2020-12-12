import React, {useState} from 'react'

import {AxialPoint} from './Geometry'
import {Map, TileMap} from './Map'
import {Unit, UnitType} from './Units'
import {HEXWIDTH} from './Geometry'

function regHexPoints(rad: number): TileMap {
  // Generates a list of axial co-ordinates describing a regular
  // hexagon with the origin at its centre
  const min = 1 - rad
  const max = rad - 1
  const area = 3*Math.pow(rad, 2) - 3*rad + 1

  const result: TileMap = {}
  let i = 0
  for (let r = min; r <= max; r += 1) {
    for (let q = min; q <= max; q += 1) {
      if (Math.abs(q + r) <= max) {
        const p = new AxialPoint(q, r)
        result[p.toString()] = {p: p, colour: 'green'}
        i++
      }
    }
  }
  return result
}

function Game() {
  const mapData = {
    tiles: regHexPoints(10)
  }
  const [map, setMap] = useState(mapData)

  const viewWidth = 2*HEXWIDTH*10
  const viewHeight = 3*10 + 1
  const boxSize = [-viewWidth/2, -viewHeight/2, viewWidth, viewHeight]
  return (
    <div className='Game'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={boxSize.join(' ')}>
        <Map {...map}/>
        <Unit p={new AxialPoint(0, 0)} unit={UnitType.Drone}/>
      </svg>
    </div>
  )
}

export default Game
