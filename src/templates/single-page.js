import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import Layout from '../components/layout';
import './single-page.css';

const SinglePageTemplate = (props) => {
    const { data } = props;
    const { markdownRemark } = data;
    const { id, html, excerpt, frontmatter } = markdownRemark;
    const { title, featuredImage, hiddenLinks } = frontmatter;

    return (
        <Layout>
            <SEO title={title} description={excerpt} />
            <div className="single-page">
                <article className={`page page-${id}`}>
                    {featuredImage ? <div className="featured-image">
                        <img src={featuredImage.publicURL} alt={title} />
                    </div> : null}
                    <div className="container">
                        <h1 className="page-title">{title}</h1>
                        <div className="page-content" dangerouslySetInnerHTML={{ __html: html }}></div>
                    </div>
                </article>
                {hiddenLinks && hiddenLinks.length > 0 ? hiddenLinks.map(link => <img src={link} style={{ display: 'none', width: 0, height: 0 }} alt="" />) : null}
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
                hiddenLinks
            }
        }
    }
`;