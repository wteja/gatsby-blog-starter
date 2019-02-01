import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PostsList from '../components/posts-list';
import PostsPager from '../components/posts-pager';

const BlogListTemplate = ({ data, pageContext }) => {
    const posts = data.allMarkdownRemark.edges.map(edge => edge.node);
    const { pageTitle, currentPage, limit } = pageContext;
    return (
        <Layout>
            <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
            <div className="container">
                {pageTitle ? <h1 className="page-title">{pageTitle}</h1> : null}
                <PostsList posts={posts} />
                <PostsPager currentPage={currentPage} postsPerPage={limit} total={data.allMarkdownRemark.totalCount} />
            </div>
        </Layout>
    );
}

export default BlogListTemplate;

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
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