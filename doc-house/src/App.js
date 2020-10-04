import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link, BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { Button,Menu, Layout, Navigation, Header, Drawer, Content} from 'react-mdl';
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
                <Link to="/login-transition">Login</Link>
            </Navigation>
        </Header>
        <Drawer title={<Link style={{textDecoration: 'none', color: 'black'}} to="/">DocHouse</Link>}>
            <Navigation>
              <Link to="/login-transition">Login</Link>
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
    </Router>
  );
}

export default App;
