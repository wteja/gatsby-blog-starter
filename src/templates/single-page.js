import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import Layout from '../components/layout';
import './single-page.css';

const SinglePageTemplate = (props) => {
    const { data } = props;
    const { markdownRemark } = data;
    const { id, html, excerpt, frontmatter } = markdownRemark;

    return (
        <Layout>
            <SEO title={frontmatter.title} description={excerpt} />
            <div className="single-page">
                <article className={`page page-${id}`}>
                    {frontmatter.featuredImage ? <div className="featured-image">
                        <img src={frontmatter.featuredImage.publicURL} alt={frontmatter.title} />
                    </div> : null}
                    <div className="container">
                        <h1 className="page-title">{frontmatter.title}</h1>
                        <div className="page-content" dangerouslySetInnerHTML={{ __html: html }}></div>
                    </div>
                </article>

            </div>
        </Layout>
    );
};

export default SinglePageTemplate;

export const query = graphql`
    query($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            id
            html
            excerpt
            frontmatter {
                title
                path
                featuredImage {
                    publicURL
                }
            }
        }
    }
`;