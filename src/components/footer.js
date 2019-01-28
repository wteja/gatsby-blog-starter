import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Footer = ({ domain, menu }) => (
    <footer id="site-footer">
        
        {menu ? (
          <nav id="footer-menu" className="navbar navbar-light navbar-expand-lg px-0">
          <ul className="navbar-nav mx-auto text-center">
          {menu.items.map((item, index) => (<li key={index} className="nav-item"><Link to={item.path} className="nav-link">{item.title}</Link></li>))}
          </ul>
          </nav>
        ) : null}

        <div className="copyrights">&copy; {new Date().getFullYear()}, {domain}</div>
    </footer>
)

Footer.propTypes = {
    domain: PropTypes.string.isRequired,
    menu: PropTypes.object
}

Footer.defaultProps = {
    domain: ``,
    menu: null
}

export default Footer
