import {useState} from 'react'
import {AxialPoint, DIRECTIONS, hexVertices} from './Geometry'

function oneAway(point) {
  return DIRECTIONS.map(point.sum)
}

function MovementTile({q, r, ...otherprops}) {
  return <></> //TODO
}

function MovementGrid({cq, cr, ...otherprops}) {
  return oneAway(AxialPoint(cq, cr)).map((point) => <MovementTile {...point} {...otherprops} key={point}/>)
}

function Unit({q, r, ...otherprops}) {
  let [point, setPoint] = useState(new AxialPoint(q, r))
  let [selected, setSelected] = useState(false)
  const cpoint = point.toCanvasPoint()
  return (
    <circle
      cx={cpoint.x} cy={cpoint.y} r="0.5"
      fill="red" stroke="black" strokeWidth="0.1"
    />
  )
}

export { Unit }
