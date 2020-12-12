import React from 'react'

import {AxialPosition} from './PropTypes'
import {AxialPoint, hexVertices} from './Geometry'

type TileInfo = {
  colour: string
} & AxialPosition

export type MapStorage = {
  [index: string]: TileInfo
}

export type MapProps = {
  data: MapStorage,
}

function Map({data}: MapProps) {
  const children = Object.values(data).map(
    (props) => <Tile {...props} key={props.p.toString()}/>
  )
  return <>{children}</>
}

function Tile({p, colour}: TileInfo) {
  const cpoint = p.toCanvasPoint()
  return (
    <>
    <polygon
      fill={colour} stroke="black" strokeWidth="0.1"
      points={hexVertices(cpoint, 1).join(',')}
    />
    <text {...cpoint} textAnchor="middle" fontSize="0.5">{p.toString()}</text>
    </>
  )
}

function regHexMap(n: number) {
  // Creates a regular multihex map of size n
  const min = 1 - n
  const max = n - 1

  const tiles: MapStorage = {}
  for (let r = min; r <= max; r += 1) {
    for (let q = min; q <= max; q += 1) {
      if (Math.abs(q + r) <= max) {
        const colours = [
          'lightblue',
          'lightgreen',
          'lightyellow',
        ]
        const p = new AxialPoint(q, r)
        tiles[p.toString()] = {p: p, colour: colours[Math.abs(q+r) % colours.length]}
      }
    }
  }
  return tiles
}

interface MapCollection {
  [name: string]: MapStorage
}

const DefaultMaps: MapCollection = {
  Small: regHexMap(6),
  Medium: regHexMap(10),
  Large: regHexMap(14),
}

export {Map, DefaultMaps}
