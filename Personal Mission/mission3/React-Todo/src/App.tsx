import React, { useEffect } from 'react'
import View from './containers/View'


function App() {

  return (
       <div className=" flex justify-center min-h-screen items-center inset-0 bg-[var(--primary-bg-color)]">
          {/* 메인 화면 컨테이너 */}
          <View/>
      </div>
  )
}

export default App
