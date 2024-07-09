import React, { useEffect } from 'react'
import Main from './component/main'
import { ThemeProvider, useTheme } from './Provider/theme'
function App() {
  const {theme}=useTheme()
  return (
    
       <div className={`flex flex-col items-center justify-center min-h-screen ${theme}`}>
          <Main/>
      </div>

  )
}

export default App
