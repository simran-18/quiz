import './App.css'
import { BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import Login from './components/Login'
import { AppProvider } from './contexts/AppContext'
import SignUp from './components/SignUp'
import Quiz from './components/Quiz'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  
  return (
   <AppProvider>
       <Router className="app">
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="*" element={<Login/>}/>
        </Routes>
       </Router>
    </AppProvider>
  )
}

export default App
