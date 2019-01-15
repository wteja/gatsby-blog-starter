import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PostsList from '../components/posts-list';

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map(edge => edge.node);
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <PostsList posts={posts} />
    </Layout>
  );
}

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC}) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            path
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`;