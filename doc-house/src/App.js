import React, { useEffect, useState } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link, BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Layout, Navigation, Header, Drawer, Content} from 'react-mdl';
import UserContext from './context/userContext';
import Main from './components/Main';
import axios from 'axios';


function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      try {
        const tokenRes = await axios.post(
          "http://localhost:5000/users/tokenIsValid",
          null,
          { headers: { "x-auth-token": token } }
        );
        if (tokenRes.data) {
          const userRes = await axios.get("http://localhost:5000/users/", {
            headers: { "x-auth-token": token },
          });
          setUserData({
            token,
            user: userRes.data,
          });
        }
      } catch (error) {
        console.log(error);
      }
      
    };

    checkLoggedIn();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
<div className="demo-big-content">
    <Layout>
        <Header className="header-color" title={<Link style={{textDecoration: 'none', color: 'white'}} to="/">DocHouse</Link>} scroll>
            <Navigation>
                <Link to="/contact">Contact</Link>
                <Link to="/about">About</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/log-transition">Login</Link>
            </Navigation>
        </Header>
        <Drawer title={<Link style={{textDecoration: 'none', color: 'black'}} to="/">DocHouse</Link>}>
            <Navigation>
              <Link to="/log-transition">Login</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </Navigation>
        </Drawer>
        <Content>
            <div className="page-content" />
            <Main/>
        </Content>
     </Layout>
</div>
    </UserContext.Provider>
    </Router>
  );
}

export default App;
