import React from 'react';
import './Nav.scss';
import Utils from "../../utils";



const Nav = props => {

    return (
        <div>
          <div className="site-mobile-menu site-navbar-target">
            <div className="site-mobile-menu-header">
              <div className="site-mobile-menu-close mt-3">
                <span className="icon-close2 js-menu-toggle"></span>
              </div>
            </div>
            <div className="site-mobile-menu-body"></div>
          </div>
          <div className="site-mobile-menu site-navbar-target">
            <div className="site-mobile-menu-header">
              <div className="site-mobile-menu-close mt-3">
                <span className="icon-close2 js-menu-toggle"></span>
              </div>
            </div>
            <div className="site-mobile-menu-body"></div>
          </div>
         
          <header className="site-navbar py-4 bg-white js-sticky-header site-navbar-target" role="banner">

            <div className="container">
              <div className="row align-items-center">
                
                <div className="col-6 col-xl-2">
                  <h1 className="mb-0 site-logo"><a href="index.html" className="text-black h2 mb-0">Bliz<span className="text-primary">.</span> </a></h1>
                </div>
                <div className="col-12 col-md-10 d-none d-xl-block">
                  <nav className="site-navigation position-relative text-right" role="navigation">

                    <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                      <li><a href="./#/" className="nav-link">Home</a></li>
                      <li><a href="./#/wallet" className="nav-link">Wallet</a></li>
                      
                    </ul>

                  </nav>
                </div>


                <div className="col-6 d-inline-block d-xl-none ml-md-0 py-3" style={{position: "relative", top: "3px"}}><a href="#" className="site-menu-toggle js-menu-toggle text-black float-right"><span className="icon-menu h3"></span></a></div>

              </div>
            </div>
            
          </header>
      </div>
    
    );
};

export default Nav;