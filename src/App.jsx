import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import LoginModal from './components/LoginModal';
import Navbar from './components/Navbar';
import Recommandation from './components/pages/Recommandation';
import Actus from './components/pages/Actus';
import Library from './components/pages/Library';
import Home from './components/pages/Home';
import Manga from './components/pages/Manga';
import Theme from './components/Theme';
import Footer from './components/Footer';
import User from './components/User';
import UserContextProvider from './context/UserContextProvider';

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <UserContextProvider>
      <ThemeProvider theme={Theme}>
        <div className="App">
          <Router>
            <Navbar handleOpen={handleOpen} />
            <div className="navbar-block" />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/recommandation">
                <Recommandation />
              </Route>
              <Route path="/actualitées">
                <Actus />
              </Route>
              <Route path="/library">
                <Library />
              </Route>
              <Route path="/manga/:id" component={Manga} />
              <Route path="/user/:username" component={User} />
            </Switch>
            <Footer handleOpen={handleOpen} />
          </Router>
          <LoginModal open={open} handleClose={handleClose} />
        </div>
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default App;
