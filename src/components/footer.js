import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Footer = ({ domain, menu }) => (
    <footer id="site-footer">
        
        {menu ? (
          <nav id="footer-menu" className="menu">
            <ul className="menu-list">
              {menu.items.map((item, index) => (<li key={index} className="menu-item"><Link to={item.path}>{item.title}</Link></li>))}
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
