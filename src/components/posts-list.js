import React from 'react';
import { Link } from 'gatsby';
import './posts-list.css';

const PostsList = ({ posts }) => {
    const postsList = posts && posts.length > 0 ?
        posts.map(post => (
            <article key={post.id} className={`post post-${post.id}`}>
                <h2 className="post-title"><Link to={post.frontmatter.path}>{post.frontmatter.title}</Link></h2>
                <div className="post-meta">{post.frontmatter.date}</div>
                <div className="post-excerpt">{post.excerpt}</div>
            </article>
        )) : <div className="empty-post">There is no new post.</div>;

    return (
        <div className="posts-list">
            {postsList}
        </div>
    );
}

export default PostsList;