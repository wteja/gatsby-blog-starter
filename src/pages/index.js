import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PostsList from '../components/posts-list';
import PostsPaging from '../components/posts-paging';

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map(edge => edge.node);
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className="container">
        <PostsList posts={posts} />
        <PostsPaging postsPerPage={data.site.siteMetadata.postsPerPage} total={data.allMarkdownRemark.totalCount} />
      </div>
    </Layout>
  );
}

export default IndexPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        postsPerPage
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC}) {
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