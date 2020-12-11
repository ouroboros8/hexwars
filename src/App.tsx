import React, {useState} from 'react'

import {AxialPoint, hexVertices, HEXWIDTH} from './Geometry'
import {AxialPosition} from './PropTypes'
import {Unit} from './Units'
import './App.css'

enum View {
  Menu,
  Game,
}

type ViewSetter = (view: View) => void

const ViewSetterContext = React.createContext<ViewSetter>(
  (view: View) => console.warn("No view provider")
)

const useView = () => React.useContext(ViewSetterContext)

function App(): JSX.Element {
  const [view, setView] = useState(View.Menu)
  const views = {
    [View.Menu]: <Menu/>,
    [View.Game]: <Game size={10}/>,
  }
  return (
    <div className="App">
      <ViewSetterContext.Provider value={setView}>
        {views[view]}
      </ViewSetterContext.Provider>
    </div>
  )
}

function Menu(): JSX.Element {
  const setView = useView()
  return <ul>
    <li onClick={() => setView(View.Game)}>New game</li>
  </ul>
}

function regHexPoints(rad: number): AxialPoint[] {
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

type GameProps = {
  size: number
}

function Game({size}: GameProps): JSX.Element {
  const viewWidth = 2*HEXWIDTH*size
  const viewHeight = 3*size + 1
  const boxSize = [-viewWidth/2, -viewHeight/2, viewWidth, viewHeight]
  return (
    <div className='Game'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={boxSize.join(' ')}>
        <Map size={size}/>
        <Unit p={new AxialPoint(0, 0)}/>
      </svg>
    </div>
  )
}

function Map({size}: GameProps) {
  'A hexagonal grid in the shape of a regular multihex'
  const tiles = regHexPoints(size).map((point) => <Tile p={point} key={point.toString()}/>)
  return <>
    {tiles}
  </>
}

function Tile({p}: AxialPosition) {
  const cpoint = p.toCanvasPoint()
  return (
    <>
    <polygon
      fill="none" stroke="black" strokeWidth="0.1"
      points={hexVertices(cpoint, 1).join(',')}
    />
    <text {...cpoint} textAnchor="middle" fontSize="0.5">{p.toString()}</text>
    </>
  )
}

export default App
