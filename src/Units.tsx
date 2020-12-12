import {useState} from 'react'
import {AxialPoint, CubePoint, hexVertices} from './Geometry'
import {AxialPosition} from './PropTypes'

type UnitType = {
  name: string
  move: number
  colour: string
}

export const Units = {
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

function range(c: AxialPoint, n: number): AxialPoint[] {
  let results: AxialPoint[] = []
  for (let x = -n; x <= n; x++) {
    for (let y = Math.max(-n, -x-n); y <= Math.min(n, -x+n); y++) {
      const z = -x-y
      const d = new CubePoint(x, y, z).toAxialPoint()
      results.push(c.add(d))
    }
  }
  return results
}

type UnitProps = UnitType & AxialPosition

export function Unit({name, move, colour, p}: UnitProps) {
  const [position, setPosition] = useState(p)
  // TODO selected needs to be pulled up into Game, so that only one unit can
  // be selected at once
  const [selected, setSelected] = useState(false)

  const moveGrid = range(position, move).map((p) => {

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
