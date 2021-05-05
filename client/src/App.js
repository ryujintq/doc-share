import TextEditor from './pages/TextEditor/TextEditor'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import './App.css'
import { useSelector } from 'react-redux'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Navbar from './components/Navbar/Navbar'
import Signup from './pages/Signup/Signup'
import { SocketProvider } from './api/socket'

const App = () => {
  const { token, id } = useSelector(state => state.auth)

  return (
    <SocketProvider id={id} token={token}>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact>
            {token ? <Dashboard /> : <Login />}
          </Route>
          <Route path='/documents/:id'>
            {token ? <TextEditor /> : <Login />}
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
        </Switch>
      </Router>
    </SocketProvider>
  )
}

export default App;
