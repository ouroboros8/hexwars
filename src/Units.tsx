import {useState} from 'react'
import {hexVertices} from './Geometry'
import {AxialPosition} from './PropTypes'

type UnitType = {
  name: string
  move: number
  colour: string
}

const Units = {
  Drone: {
    name: 'Drone',
    move: 1,
    colour: 'brown',
  },

  Queen: {
    name: 'Queen',
    move: 2,
    colour: 'yellow',
  },
}

type UnitData = UnitType & AxialPosition

function Unit({name, move, colour, p}: UnitData) {
  const [position, setPosition] = useState(p)
  // TODO selected needs to be pulled up into Game, so that only one unit can
  // be selected at once
  const [selected, setSelected] = useState(false)

  const moveGrid = position.range(move).map((p) => {

      const finishMove = () => {
        setPosition(p)
        setSelected(false)
      }
      const points = hexVertices(p.toCanvasPoint(), 1).join(',')

      return <polygon points={points}
        fill={colour} stroke={colour} strokeWidth="0.15" opacity="0.4"
        onClick={finishMove}
        key={p.toString()}/>
  })

  const cpoint = position.toCanvasPoint()
  return <>
    <circle onClick={() => setSelected(!selected)}
      cx={cpoint.x} cy={cpoint.y} r="0.5"
      fill={colour} stroke="black" strokeWidth="0.1"
    />
    {selected && moveGrid}
  </>
}

export {Units, Unit}
