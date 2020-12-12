import React, {useState} from 'react'

import {AxialPoint} from './Geometry'
import {Map, TileMap} from './Map'
import {Unit, Units} from './Units'
import {HEXWIDTH} from './Geometry'

function regHexPoints(rad: number): TileMap {
  // Generates a list of axial co-ordinates describing a regular
  // hexagon with the origin at its centre
  const min = 1 - rad
  const max = rad - 1

  const result: TileMap = {}
  for (let r = min; r <= max; r += 1) {
    for (let q = min; q <= max; q += 1) {
      if (Math.abs(q + r) <= max) {
        const colours = [
          'lightblue',
          'lightgreen',
          'lightyellow',
        ]
        const p = new AxialPoint(q, r)
        result[p.toString()] = {p: p, colour: colours[Math.abs(q+r) % colours.length]}
      }
    }
  }
  return result
}

function Game() {
  const mapData = {
    tiles: regHexPoints(6),
    size: 6,
  }
  console.log(Object.keys(mapData.tiles).length)
  const [map, setMap] = useState(mapData)

  const viewWidth = 2*HEXWIDTH*mapData.size
  const viewHeight = 3*mapData.size + 1
  const boxSize = [-viewWidth/2, -viewHeight/2, viewWidth, viewHeight]
  return (
    <div className='Game'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={boxSize.join(' ')}>
        <Map {...map}/>
        <Unit p={new AxialPoint(0, 0)} {...Units.Drone}/>
        <Unit p={new AxialPoint(1, 0)} {...Units.Queen}/>
      </svg>
    </div>
  )
}

export default Game
