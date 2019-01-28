import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ siteTitle, menu }) => (
  <header id="site-header">
      <div className="container">

          <nav id="main-menu" className="navbar navbar-expand-lg navbar-light justify-content-between px-0">
            <h1 className="navbar-brand" style={{ margin: 0 }}>
              <Link
                to="/"
                style={{
                  fontFamily: `Pacifico, Serif`,
                  color: `black`,
                  textDecoration: `none`,
                  margin: 0
                }}
              >
                {siteTitle}
              </Link>
            </h1>
            
          {menu ? (
            <>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu-content" aria-controls="main-menu-content" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="main-menu-content">
              <ul className="navbar-nav ml-auto text-center">
                {menu.items.map((item, index) => (<li key={index} className="nav-item"><Link to={item.path} className="nav-link">{item.title}</Link></li>))}
              </ul>
            </div>
            </>
          ) : null}
          </nav>

      </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  menu: PropTypes.object
}

Header.defaultProps = {
  siteTitle: ``,
  menu: null
}

export default Header
