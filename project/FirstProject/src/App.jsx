import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
//returning thee html compomnents 
  return (
    <div>
      <button onClick={function(){
         setCount(Math.random())
         }}>
        count is {count}
      </button>
    </div>
  )
}

export default App
