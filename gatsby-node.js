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
                date
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

      const dateRegExp = /\d{4}-\d{2}-\d{2}/;
      const dates = posts.map(({ node }) => node.frontmatter.date).filter(date => !!date && dateRegExp.test(date)).filter((date, index, arr) => arr.indexOf(date) === index);
      const years = dates.map(date => date.split('-')[0]).filter((year, index, arr) => arr.indexOf(year) === index);
      const months = dates.map(date => { const dateParts = date.split('-'); return `${dateParts[0]}-${dateParts[1]}`; }).filter((month, index, arr) => arr.indexOf(month) === index);

      // Create Posts List Pages.
      const totalPages = Math.ceil(posts.length / postsPerPage);
      Array.from({ length: totalPages }).forEach((_, i) => {
        const currentPage = i + 1;
        const firstPageSlug = `/blog`;
        const nextPageSlug = `/blog/${i + 1}`;
        const path = currentPage === 1 ? firstPageSlug : nextPageSlug;
        createPage({
          path,
          component: blogListTemplate,
          context: {
            currentPage,
            totalPages,
            limit: postsPerPage,
            skip: postsPerPage * i,
            firstPageSlug,
            nextPageSlug
          }
        })
      });

      // Create Year's Posts List Pages.
      years.forEach(year => {
        const yearRegExp = new RegExp(`${year}-\\d{2}-\\d{2}`);
        const yearPosts = posts.filter(({ node }) => !!node.frontmatter.date && yearRegExp.test(node.frontmatter.date));
        const totalPages = Math.ceil(yearPosts.length / postsPerPage);
        Array.from({ length: totalPages }).forEach((_, i) => {
          const currentPage = i + 1;
          const firstPageSlug = `/${year}`;
          const nextPageSlug = `/${year}/page/${i + 1}`;
          const path = currentPage === 1 ? firstPageSlug : nextPageSlug;
          createPage({
            path,
            component: blogListTemplate,
            context: {
              title: `Posts in ${year}:`,
              currentPage,
              totalPages,
              limit: postsPerPage,
              skip: postsPerPage * i,
              firstPageSlug,
              nextPageSlug
            }
          })
        });
      });

      // Create Month's Posts List Pages.
      months.forEach(month => {
        const monthRegExp = new RegExp(`${month}-\\d{2}`);
        const monthPosts = posts.filter(({ node }) => !!node.frontmatter.date && monthRegExp.test(node.frontmatter.date));
        const totalPages = Math.ceil(monthPosts.length / postsPerPage);
        Array.from({ length: totalPages }).forEach((_, i) => {
          const currentPage = i + 1;
          const monthSlug = month.replace('-', '/');
          const firstPageSlug = `/${monthSlug}`;
          const nextPageSlug = `/${monthSlug}/page/${i + 1}`;
          const path = currentPage === 1 ? firstPageSlug : nextPageSlug;
          createPage({
            path,
            component: blogListTemplate,
            context: {
              title: `Posts in ${monthSlug}:`,
              currentPage,
              totalPages,
              limit: postsPerPage,
              skip: postsPerPage * i
            }
          })
        });
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

function getSlug(name) {
  return name.replace(/s+/g, '-');
}