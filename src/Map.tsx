import React, {useState} from 'react'

import {AxialPosition} from './PropTypes'
import {hexVertices} from './Geometry'

type TileData = AxialPosition & {
  colour: string
}

export type TileMap = {
  [index: string]: TileData
}

export type MapData = {
  tiles: TileMap // TODO extend with more tile data (terrain types etc.)
}

export function Map({tiles}: MapData) {
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
