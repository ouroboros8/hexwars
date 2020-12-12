import React from 'react'

enum View {
  Menu,
  Game,
}

type ViewSetter = (view: View) => void

const ViewContext = React.createContext<ViewSetter>(
  (view: View) => console.warn("No view provider")
)

const useView = () => React.useContext(ViewContext)

export {View, ViewContext, useView}
