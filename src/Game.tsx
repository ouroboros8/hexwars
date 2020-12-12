import React, {useState} from 'react'

import {AxialPoint} from './Geometry'
import {Map, MapData, DefaultMaps} from './Map'
import {Unit, Units} from './Units'
import {HEXWIDTH} from './Geometry'

function Game() {
  const [map, setMap] = useState<MapData | null>(null)

  if (map == null) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => setMap(DefaultMaps[e.target.value])
    return <select onChange={handleChange}>
      <option value=''></option>
      {Object.keys(DefaultMaps).map((name) => <option value={name} key={name}>{name}</option>)}
    </select>
  } else {
    const viewWidth = 2*HEXWIDTH*map.size
    const viewHeight = 3*map.size + 1
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
}

export default Game
