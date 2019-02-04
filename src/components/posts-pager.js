import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import classNames from 'classnames';

import './posts-pager.css';

export class PostsPager extends Component {

    static propTypes = {
        type: PropTypes.string,
        currentPage: PropTypes.number,
        postsPerPage: PropTypes.number,
        total: PropTypes.number,
        firstPageSlug: PropTypes.string
    };

    static defaultProps = {
        currentPage: 1,
        total: 0,
        postsPerPage: process.env.POSTS_PER_PAGE ? Number(process.env.POSTS_PER_PAGE) : 5,
        type: 'default',
        firstPageSlug: '/blog',
        nextPageSlug: '/blog/'
    };

    render() {
        const { total, postsPerPage, currentPage, type, firstPageSlug, nextPageSlug } = this.props;
        const totalPages = Math.ceil(total / postsPerPage);
        const pages = Array.from(Array(totalPages).keys()).map(pageIndex => pageIndex + 1);
        
        let pager = null;

        if (type === "number") {
            pager = (
                <ul className="pagination">
                    <li className={classNames('page-item', { 'disabled': currentPage <= 1 })}>
                        <Link className="page-link" to={currentPage > 2 ? `/blog/${currentPage - 1}` : '/blog'} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </Link>
                    </li>

                    {pages.map(page => <li key={page} className={classNames('page-item', { 'active': currentPage === page })}><Link to={page > 1 ? `${nextPageSlug}${page}` : firstPageSlug} className="page-link">{page}</Link></li>)}

                    <li className={classNames('page-item', { 'disabled': currentPage >= totalPages })}>
                        <Link className="page-link" to={currentPage < totalPages ? `${nextPageSlug}${currentPage + 1}` : `${nextPageSlug}${currentPage}`} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </Link>
                    </li>
                </ul>
            );
        } else {
            // Default style.
            pager = (
                <div className="clearfix">
                    {currentPage < totalPages ? (
                        <Link className="btn btn-outline-dark float-left" to={currentPage < totalPages ? `${nextPageSlug}${currentPage + 1}` : `${nextPageSlug}${currentPage}`} aria-label="Next">
                            <span aria-hidden="true">&larr; Older posts</span>
                            <span className="sr-only">Older posts</span>
                        </Link>
                    ) : null}

                    {currentPage > 1 ? (
                        <Link className="btn btn-outline-dark float-right" to={currentPage > 2 ? `${nextPageSlug}${currentPage - 1}` : firstPageSlug} aria-label="Previous">
                            <span aria-hidden="true">Newer posts &rarr;</span>
                            <span className="sr-only">Newer posts</span>
                        </Link>
                    ) : null}
                </div>
            );
        }

        return (
            <div className="posts-pager">
                {pager}
            </div>
        );
    }
}

export default PostsPager;