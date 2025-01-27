
import { createBrowserRouter} from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import Paste from './components/Paste'
import Navbar from './components/Navbar'
import ViewPaste from './components/ViewPaste'
import Home from './components/Home'
const router = createBrowserRouter([
  {
    path:"/",
    element:
    <div>
      <Navbar/>
      <Home/>
    </div>
  },
  {
    path:"/Paste",
    element:
    <div>
      <Navbar/>
      <Paste/>
    </div>
  },
  {
    path:"/Paste/:id",
    element:
    <div>
      <Navbar/>
      <ViewPaste/>
    </div>
  }
])
function App() {
  return (
    <div>
      <RouterProvider router ={router}/>
    </div>
  )
}

export default App
