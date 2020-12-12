import React from 'react'

import {AxialPosition} from './PropTypes'
import {AxialPoint, hexVertices} from './Geometry'

type TileData = {
  colour: string
} & AxialPosition

export type TileMap = {
  [index: string]: TileData
}

export type MapData = {
  // String co-ordinate indexed map of Tiles
  tiles: TileMap // TODO extend with more tile data (terrain types etc.)
  // Size of the map, used to calculate ViewBox size
  size: number
}

function Map({tiles}: MapData) {
  const children = Object.values(tiles).map(
    (props) => <Tile {...props} key={props.p.toString()}/>
  )
  return <>{children}</>
}

function Tile({p, colour}: TileData) {
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

  const tiles: TileMap = {}
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
  return {
    tiles: tiles,
    size: n,
  }
}

interface MapCollection {
  [name: string]: MapData
}

const DefaultMaps: MapCollection = {
  Small: regHexMap(6),
  Medium: regHexMap(10),
  Large: regHexMap(14),
}

export {Map, DefaultMaps}
