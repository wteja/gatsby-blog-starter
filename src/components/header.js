import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `white`,
      marginBottom: `2rem`,
      boxShadow: `1px 2px 3px rgba(0, 0, 0, 0.16)`
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.8rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
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
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
