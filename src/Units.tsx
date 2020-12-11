import {useState} from 'react'
import {AxialPoint, CubePoint, hexVertices} from './Geometry'
import {AxialPosition} from './PropTypes'

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

type MoverProps = {
  move: (p: AxialPoint) => void
}

type MoveGridProps = AxialPosition & MoverProps

function MoveGrid({p, move}: MoveGridProps) {
  const movePoints = range(p, 2)
  return <>{
    movePoints.map((p) => <polygon
      points={hexVertices(p.toCanvasPoint(), 1).join(',')}
      fill="red" stroke="red" strokeWidth="0.15" opacity="0.2"
      onClick={() => move(p)}
      key={p.toString()}
    />)
  }</>
}

function Unit({p}: AxialPosition) {
  const [position, setPosition] = useState(p)
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
    {selected && <MoveGrid p={position} move={move}/>}
  </>
}

export { Unit }
