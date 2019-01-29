import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PostsList from '../components/posts-list';
import PostsPager from '../components/posts-pager';

const IndexPage = ({ data, pageContext }) => {
  const { allMarkdownRemark } = data;
  const posts = allMarkdownRemark.edges.map(edge => edge.node);
  return (
    <Layout>
      <SEO title="Home" />
      <div className="container">
        <PostsList posts={posts} />
        <PostsPager total={allMarkdownRemark.totalCount} />
      </div>
    </Layout>
  );
}

export default IndexPage

export const query = graphql`
  query($limit: Int!) {
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "//content/posts/"}}, limit: $limit, sort: { fields: [frontmatter___date], order: DESC}) {
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