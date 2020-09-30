import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LogIn from './components/LogIn';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import DoctorProfile from './components/DoctorProfile';
import { Link, BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { Layout, Navigation, Header, Drawer, Content} from 'react-mdl';
import Main from './components/Main';


function App() {
  return (
    <Router>
<div className="demo-big-content">
    <Layout>
        <Header className="header-color" title={<Link style={{textDecoration: 'none', color: 'white'}} to="/">DocHouse</Link>} scroll>
            <Navigation>
                <Link to="/contact">Contact</Link>
                <Link to="/about">About</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/login">Login</Link>
            </Navigation>
        </Header>
        <Drawer title={<Link style={{textDecoration: 'none', color: 'black'}} to="/">DocHouse</Link>}>
            <Navigation>
              <Link to="/login">Login</Link>
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
    //   {/* <Switch>
    //       <Route exact path='/' component={LogIn} />
    //       <Route path="/login" component={LogIn} />
    //       <Route path="/register" component={Register} />
    //       <Route path="/user" component={UserProfile} />
    //       <Route path="/doctor" component={DoctorProfile} />
    //   </Switch> */}
    </Router>
  );
}

export default App;
