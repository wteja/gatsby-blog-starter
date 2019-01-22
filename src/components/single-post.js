import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import './single-post.css';

const SinglePostTemplate = ({ data }) => {
    const { markdownRemark } = data;
    const { id, html, frontmatter } = markdownRemark;
    
    let postMeta = "";
    if(frontmatter.date && frontmatter.date) {
        postMeta = `${frontmatter.author} - ${frontmatter.date}`;
    } else if(frontmatter.author) {
        postMeta = frontmatter.author;
    } else if(frontmatter.date) {
        postMeta = frontmatter.date;
    }

    return (
        <Layout>
            <div className="single-post">
                <article className={`post post-${id}`}>
                    {frontmatter.featuredImage ? <div className="featured-image">
                        <img src={frontmatter.featuredImage.publicURL} alt={frontmatter.title} />
                    </div> : null}
                    <div className="container">
                        <h1 className="post-title">{frontmatter.title}</h1>
                        <div className="post-meta">{postMeta}</div>
                        <div className="post-content" dangerouslySetInnerHTML={{ __html: html }}></div>
                    </div>
                </article>
            </div>
        </Layout>
    );
};

export default SinglePostTemplate;

export const query = graphql`
    query($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            id
            html
            frontmatter {
                title
                author
                date(formatString: "DD MMMM, YYYY")
                path
                featuredImage {
                    publicURL
                }
            }
        }
    }
`;