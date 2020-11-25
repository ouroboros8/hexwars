import {useState} from 'react'
import {AxialPoint, DIRECTIONS, hexVertices} from './Geometry'

function oneAway(point) {
  return DIRECTIONS.map((direction) => point.sum(direction))
}

function moveFactory(setPoint, setSelected) {
  return ({q, r}) => {
    setSelected(false)
    setPoint(AxialPoint(q, r))
  }
}

function MovementTile({q, r, onClick, ...otherprops}) {
  const cpoint = AxialPoint(q, r).toCanvasPoint()
  return <polygon onClick={onClick}
    fill="red" stroke="red" strokeWidth="0.15" opacity="0.2"
    points={hexVertices(cpoint, 1).join(',')}
  />
}

function MovementGrid({q, r, move, ...otherprops}) {
  const movePoints = oneAway(AxialPoint(q, r))
  return movePoints.map((point) =>
    <MovementTile {...point} onClick={() => move(point)}  {...otherprops} key={point}/>
  )
}

function Unit({q, r, ...otherprops}) {
  const [point, setPoint] = useState(AxialPoint(q, r))
  const [selected, setSelected] = useState(false)

  const move = (newPoint) => {
    setSelected(false)
    setPoint(newPoint)
  }

  const cpoint = point.toCanvasPoint()
  return <>
    <circle onClick={() => setSelected(!selected)}
      cx={cpoint.x} cy={cpoint.y} r="0.5"
      fill="red" stroke="black" strokeWidth="0.1"
    />
    {selected && <MovementGrid {...point} move={move} {...otherprops}/>}
  </>
}

export { Unit }
