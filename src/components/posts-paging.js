import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import classNames from 'classnames';

import './posts-paging.css';

export class PostsPaging extends Component {
    static defaultProps = {
        currentPage: 1,
        postsPerPage: 5,
        total: 0
    };

    static propTypes = {
        currentPage: PropTypes.number,
        postsPerPage: PropTypes.number,
        total: PropTypes.number
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            currentPage: 1
        };
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.current !== prevState.current) {
            return { current: nextProps.current };
        } else {
            return null;
        }
    }

    render() {
        const { total, postsPerPage } = this.props;
        const { currentPage } = this.state;
        const totalPages = Math.ceil(total / postsPerPage);
        const pages = Array.from(Array(totalPages).keys()).map(pageIndex => pageIndex + 1);

        return (
            <div className="posts-paging">
                <ul className="pagination">
                    {pages.map(page => <li className={classNames('page-item', { 'active': currentPage === page })}><Link to={`/blog/${page}`} className="page-link">{page}</Link></li>)}
                </ul>
            </div>
        );
    }
}

export default PostsPaging;