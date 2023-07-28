import './App.css';
import SetFormik from './component/SetFormik/SetFormik';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
function App() {
  return (
    <main className="App">
      <SetFormik />
    </main>
    // <Router>
    //   <main className="App">
    //     <Switch>
    //       <Route path="/login" component={LoginPage} />
    //       <Route path="/" exact component={SignUpPage} />
    //     </Switch>
    //   </main>
    // </Router>
  );
}

export default App;
