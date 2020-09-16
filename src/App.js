import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routes } from './routes'
import './App.css';

function App() {

  return (
    <Container>
      <Router>
        <ul>
          {routes.map((route, i) => (
            <>
              <li>
                <Link to={route.path}>{route.title}</Link>
              </li>
              {/* <li>
                <a href={route.path}>{route.title}</a>
              </li> */}
            </>
          ))}
        </ul>
        <Switch>
          {routes.map((route, i) => (
            <Route 
              path={route.path} 
              exact={route.exact} 
              component={route.component} />
          ))}
        </Switch>
      </Router>

      <ToastContainer />
    </Container>
  );
}

export default App;
