import React, {useState, ChangeEvent} from 'react'

import {AxialPoint} from './Geometry'
import {Map, DefaultMaps, MapStorage} from './Map'
import {PlayerUnits, UnitTypes, UnitStorage} from './Units'
import {HEXWIDTH} from './Geometry'

function mapSize(map: MapStorage) {
  // TODO implement
  return 10
}

function Game() {
  //TODO: this component seems messy
  const [map, setMap] = useState<MapStorage>({})

  const p0 = new AxialPoint(0, 0)
  const p1 = new AxialPoint(1, 0)
  const defaultUnits: UnitStorage = {
    [p0.toString()]: {...UnitTypes.Queen, p: p0},
    [p1.toString()]: {...UnitTypes.Drone, p: p1},
  }
  const [units, setUnits] = useState<UnitStorage>(defaultUnits)

  const newGameMenu =
    <select onChange={(e: ChangeEvent<HTMLSelectElement>) => setMap(DefaultMaps[e.target.value])}>
      <option value=''></option>
      {Object.keys(DefaultMaps).map((name) => <option value={name} key={name}>{name}</option>)}
    </select>

  if (Object.keys(map).length === 0) {
    return newGameMenu
  } else {
    const viewWidth = 2*HEXWIDTH*mapSize(map)
    const viewHeight = 3*mapSize(map) + 1
    const boxSize = [-viewWidth/2, -viewHeight/2, viewWidth, viewHeight]

    return (
      <div className='Game'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={boxSize.join(' ')}>
          <Map data={map}/>
          <PlayerUnits units={units} map={map}/>
        </svg>
      </div>
    )
  }
}

export default Game
