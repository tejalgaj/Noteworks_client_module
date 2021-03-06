
import React, { useState, useCallback } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Footer from './footer';
import Header from './header';
import Home from './Home';
import Note from './Note';
import Journal from './Journal';
import Resume from './Resume';
import EditJournal from '../components/journal/EditJournal';
import DeleteJournal from '../components/journal/DeleteJournal';
import NewJournal from '../components/journal/NewJournal';
import Reminders from '../components/journal/Reminders';
import NotFound from './notFound';
import Task from './Task';
import '../App.css';
import JobApplication from './JobApplication';
import Login from './Login';
import { Container } from 'react-bootstrap';
import Register from './Register';
import AddResume from './resume_comp/AddResume';
import ResumeDetails from './resume_comp/ResumeDetails';
import AddEditJobApplications from './jobApplication/AddEditJobApplications';
import AuthContext from '../contexts/AuthContext';
import firebase from 'firebase';

function App() {
  // Initialize firebase bucket storage : initialization at root component to ensure global usability
  if (!firebase.apps.length) {
    var firebaseConfig = {
      apiKey: "AIzaSyChiUN39T4W8F-JO8-FfNvEYyItYdmixuE",
      authDomain: "mern-2124a.firebaseapp.com",
      projectId: "mern-2124a",
      storageBucket: "mern-2124a.appspot.com",
      messagingSenderId: "164568203749",
      appId: "1:164568203749:web:eb2f9ba8fa947b85766f0c"
    };
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    sessionStorage.clear();
  }, []);

  let approutes;
  if (isLoggedIn) {
    approutes = (
      <Switch>
        <Route path="/home" component={Home}></Route>
        <Route path="/task" component={Task}></Route>
        <Route path="/note" component={Note}></Route>
        <Route path="/journal" component={Journal}></Route>
        <Route path="/resume/AddResume" component={AddResume}></Route>
        <Route path="/resume/EditResume/:id" component={AddResume}></Route>
        <Route path="/resume/:id" component={ResumeDetails}></Route>
        <Route path="/resume" component={Resume}></Route>
        <Route exact path="/job-application" component={JobApplication}></Route>
        <Route path="/job-application/:id" component={AddEditJobApplications}></Route>
        <Route path="/components/journal/EditJournal/:id" component={EditJournal}></Route>
        <Route path="/components/journal/DeleteJournal" component={DeleteJournal}></Route>
        <Route path="/components/journal/NewJournal" component={NewJournal}></Route>
        <Route path="/components/journal/Reminders" component={Reminders}></Route>
        <Route path="/not-found" component={NotFound}></Route>
        <Redirect from="/" to="/home" />
        <Redirect to="/not-found" />
      </Switch>
    );
  } else {
    approutes = (
      <Switch>
        <Route path="/home" component={Home}></Route>
        <Route path="/not-found" component={NotFound}></Route>
        <Route path="/Login" component={Login}></Route>
        <Route path="/Register" component={Register}></Route>
        <Redirect from="/" to="/home" />
        <Redirect to="/not-found" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
      <React.Fragment>
        <Header />
        <body>
          <Container>
            {approutes}
          </Container>
        </body>
        <Footer />
      </React.Fragment>
    </AuthContext.Provider>
  );
}

export default App;