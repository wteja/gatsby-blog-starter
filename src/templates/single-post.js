import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import './single-post.css';

const SinglePostTemplate = ({ data }) => {
    const { markdownRemark } = data;
    const { id, html, frontmatter } = markdownRemark;
    return (
        <Layout>
            <div className="single-post">
                <article className={`post post-${id}`}>
                    <h1 className="post-title">{frontmatter.title}</h1>
                    <div className="post-meta">{frontmatter.date}</div>
                    <div className="post-content" dangerouslySetInnerHTML={{ __html: html }}></div>
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
                date(formatString: "DD MMMM, YYYY")
                path
            }
        }
    }
`;