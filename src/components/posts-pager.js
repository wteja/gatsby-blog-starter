import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import classNames from 'classnames';

import './posts-pager.css';

export class PostsPager extends Component {

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

    render() {
        const { total, postsPerPage, currentPage } = this.props;
        const totalPages = Math.ceil(total / postsPerPage);
        const pages = Array.from(Array(totalPages).keys()).map(pageIndex => pageIndex + 1);

        return (
            <div className="posts-pager">
                <ul className="pagination">
                    <li className={classNames('page-item', { 'disabled': currentPage <= 1 })}>
                        <Link className="page-link" to={currentPage > 2 ? `/blog/${currentPage - 1}` : '/blog'} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </Link>
                    </li>

                    {pages.map(page => <li key={page} className={classNames('page-item', { 'active': currentPage === page })}><Link to={page > 1 ? `/blog/${page}` : '/blog'} className="page-link">{page}</Link></li>)}

                    <li className={classNames('page-item', { 'disabled': currentPage >= totalPages })}>
                        <Link className="page-link" to={currentPage < totalPages ? `/blog/${currentPage + 1}` : `/blog/${currentPage}`} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default PostsPager;