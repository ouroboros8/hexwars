import React from 'react'

export enum View {
  Menu,
  Game,
}

type ViewSetter = (view: View) => void

export const ViewContext = React.createContext<ViewSetter>(
  (view: View) => console.warn("No view provider")
)

export const useView = () => React.useContext(ViewContext)
