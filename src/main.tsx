import React from 'react'
import { createRoot } from 'react-dom/client'
import SceneManager from './SceneManager.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SceneManager />
  </React.StrictMode>,
)