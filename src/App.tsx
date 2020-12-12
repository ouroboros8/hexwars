import React, {useState} from 'react'

import {View, ViewContext, useView} from './Views'
import Game from './Game'
import './App.css'

const AppViews = {
  [View.Menu]: Menu,
  [View.Game]: Game,
}

function App() {
  const [view, setView] = useState(View.Menu)
  const Element = AppViews[view]
  return (
    <div className="App">
      <ViewContext.Provider value={setView}>
        <Element/>
      </ViewContext.Provider>
    </div>
  )
}

function Menu() {
  const setView = useView()
  return <ul>
    <li onClick={() => setView(View.Game)}>New game</li>
  </ul>
}

export default App
