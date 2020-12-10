import {useState} from 'react'
import {AxialPoint, DIRECTIONS, hexVertices} from './Geometry'

type UnitProps = {
  point: AxialPoint
  move: (p: AxialPoint) => void
}

function oneAway(point: AxialPoint): AxialPoint[] {
  return DIRECTIONS.map((direction) => point.add(direction))
}

function MovementGrid({point, move}: UnitProps): JSX.Element {
  const movePoints = oneAway(point)
  return <>{
    movePoints.map((p) => <polygon
      points={hexVertices(p.toCanvasPoint(), 1).join(',')}
      fill="red" stroke="red" strokeWidth="0.15" opacity="0.2"
      onClick={() => move(p)}
      key={p.toString()}
    />)
  }</>
}

function Unit({point}: UnitProps) {
  const [position, setPosition] = useState(point)
  const [selected, setSelected] = useState(false)

  const move = (p: AxialPoint) => {
    setSelected(false)
    setPosition(p)
  }

  const cpoint = position.toCanvasPoint()
  return <>
    <circle onClick={() => setSelected(!selected)}
      cx={cpoint.x} cy={cpoint.y} r="0.5"
      fill="red" stroke="black" strokeWidth="0.1"
    />
    {selected && <MovementGrid point={position} move={move}/>}
  </>
}

export { Unit }
