import React, { Fragment} from 'react';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom';
import { MdInfo, MdHome } from 'react-icons/md';
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
                    <div className="navbar-title-container">
                    <span className="navbar-title-header">SamverksKartan</span>
                    <br/>
                    <span className="navbar-title-sub-header"><i>-Den gemensamma kartan</i></span>
                    </div>
                    <ul className="bontrax-navbar-pages">
                        <li><MdHome style={{color:'white', height:'2em', width:'2em'}}/><Link to="/" className="bontrax-links">Home</Link></li>
                        <li><DiCode style={{color:'white', height:'2em', width:'3em'}}/><Link to="/Documentation" className="bontrax-links">Documentation</Link></li>
                        <li><MdInfo style={{color:'white', height:'2em', width:'2em'}}/><Link to="/About" className="bontrax-links">About</Link></li>
                    </ul>
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
