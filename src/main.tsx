import React from 'react'
import { createRoot } from 'react-dom/client'
import SceneManager from './SceneManager.tsx'
import "./main.css"
import store from './shared/store/store'
import { Provider } from 'react-redux'
import GameWindow from './shared/components/game-window/GameWindow.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <GameWindow>
        <SceneManager />
      </GameWindow>
    </Provider>
  </React.StrictMode>,
)