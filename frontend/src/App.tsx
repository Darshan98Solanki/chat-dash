import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Chat from './pages/Chat'
import Register from './pages/Register'

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/chat/:id' Component={Chat}/>
          <Route path='' Component={Register}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
