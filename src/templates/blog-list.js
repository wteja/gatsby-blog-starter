import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PostsList from '../components/posts-list';
import PostsPager from '../components/posts-pager';

const BlogListTemplate = ({ data, pageContext }) => {
    const posts = data.allMarkdownRemark.edges.map(edge => edge.node);
    return (
        <Layout>
            <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
            <div className="container">
                <PostsList posts={posts} />
                <PostsPager currentPage={pageContext.currentPage} postsPerPage={data.site.siteMetadata.postsPerPage} total={data.allMarkdownRemark.totalCount} />
            </div>
        </Layout>
    );
}

export default BlogListTemplate;

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        postsPerPage
      }
    }
    allMarkdownRemark(skip: $skip, limit: $limit, filter: {fileAbsolutePath: {regex: "//content/posts/"}}, sort: { fields: [frontmatter___date], order: DESC}) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            path
            author
            date(formatString: "DD MMMM, YYYY")
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