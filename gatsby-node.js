/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');

const postsPerPage = process.env.POSTS_PER_PAGE || 5;

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const blogListTemplate = path.resolve(`src/templates/blog-list.js`);
  const singlePostTemplate = path.resolve(`src/templates/single-post.js`);
  const singlePageTemplate = path.resolve(`src/templates/single-page.js`);
  const linkRedirectTemplate = path.resolve(`src/templates/link-redirect.js`);

  return graphql(`
      query {
        postsMarkdownRemark: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "//content/posts/"}}) {
          edges {
            node {
              frontmatter {
                path
              }
            }
          }
        }
        pagesMarkdownRemark: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "//content/pages/"}}) {
          edges {
            node {
              frontmatter {
                path
              }
            }
          }
        }
        allLinksJson {
          edges {
            node {
              path
              url
            }
          }
        }
      }
    `).then(result => {
    if (result.errors)
      return Promise.reject(result.errors);

    const { postsMarkdownRemark, pagesMarkdownRemark, allLinksJson } = result.data;

    const posts = postsMarkdownRemark && postsMarkdownRemark.edges ? postsMarkdownRemark.edges : [];
    const pages = pagesMarkdownRemark && pagesMarkdownRemark.edges ? pagesMarkdownRemark.edges : [];
    const links = allLinksJson.edges;

    // Create Posts List Pages.
    const totalPages = Math.ceil(posts.length / postsPerPage);
    Array.from({ length: totalPages }).forEach((_, i) => {
      const currentPage = i + 1;
      createPage({
        path: currentPage === 1 ? '/blog' : `/blog/${i + 1}`,
        component: blogListTemplate,
        context: {
          currentPage,
          totalPages,
          limit: postsPerPage,
          skip: postsPerPage * i
        }
      })
    });

    // Create pages from post markdown.
    posts.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: singlePostTemplate,
        context: {
          page: node.frontmatter.path,
          postType: 'post'
        }
      });
    });

    // Create pages from page markdown.
    pages.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: singlePageTemplate,
        context: {
          page: node.frontmatter.path,
          postType: 'page'
        }
      });
    });

    links.forEach(({ node }) => {
      createPage({
        path: node.path,
        component: linkRedirectTemplate,
        context: {
          url: node.url
        }
      });
    });
  });
};

exports.onCreatePage = ({ page, actions, graphql }) => {
  const { createPage, deletePage } = actions;

  if (page.path === '/') {
    deletePage(page);

    createPage({
      ...page,
      context: {
        limit: postsPerPage
      }
    });
  }
}