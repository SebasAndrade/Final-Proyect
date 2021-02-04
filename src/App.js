//Dependencies
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//Components
import EditCourse from './components/Modals/EditCourse.js';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
//Pages
import AdminPage from "./pages/AdminPage";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Favourite from "./pages/Favourite";
import RecoverPasswordPage from "./pages/RecoverPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import CourseDetail from './pages/CourseDetail.js';
import Error404 from './pages/Error404'
import AboutUs from './pages/AboutUs'
//Routes
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from './routes/AdminRoute';
//Context
import AdminpageProvider from "./context/AdminpageContext"
import FunctionModalsProvider from "./context/FunctionModals";
import AuthState from './context/auth/authState';
import authToken from './config/token';
import Subscriptions from './pages/Subscriptions.js';
//Styles
import './styles/main.css';

const token = localStorage.getItem('token');
if(token) {
  authToken(token);
}

function App() {
  
  const dayHour = new Date().getHours();

  return (
      <Router>
        <AuthState>
          <AdminpageProvider>
            <FunctionModalsProvider>
              <Header dayHour={dayHour} />
                <Switch>
                  <PublicRoute exact path="/" component={LandingPage} />
                  <PrivateRoute exact path="/subscriptions" component={Subscriptions} />
                  <Route exact path="/recoverpassword" component={RecoverPasswordPage} />
                  <Route exact path="/changepassword/:tokenPass" component={ChangePasswordPage} />
                  <Route exact path="/Aboutus" component ={AboutUs}/>
                  <AdminRoute exact path="/adminpage" component={AdminPage} />
                  <AdminRoute exact path="/courses/editar/:idCourse" component={EditCourse} />
                  <PrivateRoute exact path="/courses/detail/:idCourse" component={CourseDetail} />
                  <PrivateRoute exact path="/home" component={Home} />
                  <PrivateRoute exact path="/favourite" component={Favourite} />
                  <Route component={Error404} />
                </Switch>
              <Footer />
            </FunctionModalsProvider>
          </AdminpageProvider>
        </AuthState>
      </Router>
  );
}

export default App;
