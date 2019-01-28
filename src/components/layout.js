import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import './layout.css';

import Header from './header'
import Footer from './footer';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            domain
          }
        }
        allMenuJson {
          edges {
            node {
              name
              items {
                title
                path
              }
            }
          }
        }
      }
    `}
    render={data => {
      const { site, allMenuJson } = data;
      const { title, domain } = site.siteMetadata;

      let mainMenu = null;
      let footerMenu = null;
      if(allMenuJson && allMenuJson.edges && allMenuJson.edges.length > 0) {
        const menuNodes = allMenuJson.edges.map(edge => edge.node);
        mainMenu = menuNodes.find(node => node.name === "main-menu");
        footerMenu = menuNodes.find(node => node.name === "footer-menu");
      }

      return (
        <>
          <Header siteTitle={title} menu={mainMenu} />
          <div
            style={{
              margin: `0 auto`,
              padding: `0px 0 1.45rem`,
              paddingTop: 0,
            }}
          >
            {children}
            <Footer domain={domain} menu={footerMenu} />
          </div>
        </>
      )
    }}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
