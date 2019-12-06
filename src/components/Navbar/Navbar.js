import React, { Fragment} from 'react';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom';
import { MdInfo } from 'react-icons/md';
import { DiCode } from 'react-icons/di';
import './Navbar.scss';
import Home  from '../../pages/Home/Home';
import  About  from '../../pages/About/About';
import  Documentation from '../../pages/Documentation/Documentation';

export default function Navbar(){

    return(
        <BrowserRouter>
            <Fragment>
                <nav className="bontrax-navbar">
                    <ul className="bontrax-navbar-pages">
                        <li>DevMap</li>
                        <li><Link to="/" className="bontrax-links">Home</Link></li>
                        <li><Link to="/Documentation" className="bontrax-links">Documentation</Link></li>
                        <li><Link to="/About" className="bontrax-links">About</Link></li>
                    </ul>
                    <div style={{float:'right'}}>
                        <span><MdInfo style={{color:'white', height:'2em', width:'2em'}}/>></span>
                        <span><Link to="/"><DiCode style={{color:'white', height:'2em', width:'3em'}}/></Link></span>
                    </div>
                </nav>
                <Switch>
                    <Route exact path="/" component={ Home } />
                    <Route path="/Documentation" component={ Documentation } />
                    <Route path="/About" component={ About } />
                </Switch>
            </Fragment>
        </BrowserRouter>

    );
}
