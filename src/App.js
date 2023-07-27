import './App.css';
import SignUpPage from './component/SignUpPage/SignUpPage';
import LoginPage from './component/LoginPage/LoginPage';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <main className="App">
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/" exact component={SignUpPage} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
