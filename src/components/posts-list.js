import React from 'react';
import { Link } from 'gatsby';
import * as moment from 'moment';
import { getPrettyName } from '../utils/common';
import './posts-list.css';

const PostsList = ({ posts }) => {

    const postsList = posts && posts.length > 0 ?
        posts.map(post => {

            const { id, frontmatter, excerpt } = post;

            let postMeta = "";
            if (frontmatter.date && frontmatter.date) {
                postMeta = <>{getArchiveAuthorLink(frontmatter.author)} - {getArchiveDateLink(frontmatter.date)}</>;
            } else if (frontmatter.author) {
                postMeta = getArchiveAuthorLink(frontmatter.author);
            } else if (frontmatter.date) {
                postMeta = getArchiveDateLink(frontmatter.date);
            }

            return (
                <article key={id} className={`post post-${id}`}>
                    {frontmatter.featuredImage ? <div className="featured-image">
                        <Link to={frontmatter.path}>
                            <img src={frontmatter.featuredImage.publicURL} alt={frontmatter.title} />
                        </Link>
                    </div> : null}
                    <h2 className="post-title"><Link to={frontmatter.path}>{frontmatter.title}</Link></h2>
                    <div className="post-meta">{postMeta}</div>
                    <div className="post-excerpt">{excerpt}</div>
                </article>
            );
        }) :
        <div className="empty-post">There is no new post.</div>;

    return (
        <div className="posts-list">
            {postsList}
        </div>
    );
}

function getArchiveAuthorLink(authorName) {
    const prettyName = getPrettyName(authorName);
    return <Link to={`/${prettyName}`}>{authorName}</Link>
}

function getArchiveDateLink(date) {
    const dateMoment = moment(date);
    return <Link to={`/${dateMoment.format("YYYY/MM")}`}>{dateMoment.format("DD MMMM, YYYY")}</Link>
}

export default PostsList;