import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PostsList from '../components/posts-list';
import PostsPager from '../components/posts-pager';

const ArchiveAuthorTemplate = ({ data, pageContext }) => {
    const posts = data.allMarkdownRemark.edges.map(edge => edge.node);
    const { title, currentPage, limit, firstPageSlug, nextPageSlug } = pageContext;
    return (
        <Layout>
            <SEO title={title} keywords={[`gatsby`, `application`, `react`]} />
            <div className="container">
                {title ? <h1 className="page-title">{title}</h1> : null}
                <PostsList posts={posts} />
                <PostsPager currentPage={currentPage} postsPerPage={limit} total={data.allMarkdownRemark.totalCount} firstPageSlug={firstPageSlug} nextPageSlug={nextPageSlug} />
            </div>
        </Layout>
    );
}

export default ArchiveAuthorTemplate;

export const query = graphql`
  query($skip: Int!, $limit: Int!, $authorName: String!) {
    allMarkdownRemark(skip: $skip, limit: $limit, filter: {fileAbsolutePath: {regex: "//content/posts/"}, frontmatter: {author: {eq: $authorName}}}, sort: { fields: [frontmatter___date], order: DESC}) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            path
            author
            date
            featuredImage {
                publicURL
            }
          }
          excerpt
        }
      }
    }
  }
`;