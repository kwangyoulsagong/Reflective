import React, { useEffect } from 'react'
import Main from './component/main'
import {useTheme } from './Provider/theme'
import { useThemeStore } from './Provider/themeStore'
function App() {
  // const {theme}=useTheme()
  const {theme}=useThemeStore()
  return (
    
       <div className={`flex flex-col items-center justify-center min-h-screen ${theme}`}>
          <Main/>
      </div>

  )
}

export default App
