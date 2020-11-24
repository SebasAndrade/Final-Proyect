//Dependencies
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
//Components
import EditCourse from './components/Modals/EditCourse.js';
//Pages
import AdminPage from "./pages/AdminPage";
import LandingPage from "./pages/LandingPage";
//Rutas
import PrivateRoute from "./routes/PrivateRoute"

function App() {
  return (
  
    <>
    {/* <LandingPage /> */}
    <Router>
     <Switch>
       <Route exact path="/"  component= {AdminPage}/> 
       <Route exact path="/courses/editar/:idC" component={EditCourse} />
     </Switch>
    </Router>
  </>
  );
}

export default App;