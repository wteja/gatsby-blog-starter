/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');
const moment = require('moment');
const { getPrettyName } = require('./src/utils/common');

const postsPerPage = Number(process.env.POSTS_PER_PAGE) || 5;

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const blogListTemplate = path.resolve(`src/templates/blog-list.js`);
  const singlePostTemplate = path.resolve(`src/templates/single-post.js`);
  const singlePageTemplate = path.resolve(`src/templates/single-page.js`);
  const archiveYearTemplate = path.resolve(`src/templates/archive-year.js`);
  const archiveMonthTemplate = path.resolve(`src/templates/archive-month.js`);
  const archiveAuthorTemplate = path.resolve(`src/templates/archive-author.js`);
  const archiveTagTemplate = path.resolve(`src/templates/archive-tag.js`);
  const linkRedirectTemplate = path.resolve(`src/templates/link-redirect.js`);

  return graphql(`
      query {
        postsMarkdownRemark: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "//content/posts/"}}) {
          edges {
            node {
              frontmatter {
                author
                date
                path
                tags
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

    const authors = posts.map(({ node }) => node.frontmatter.author).filter((author, index, arr) => !!author && arr.indexOf(author) === index);

    const tags = [].concat.apply([], posts.map(({ node }) => node.frontmatter.tags).filter(tags => !!tags));

    // Create Posts List Pages.
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const firstPageSlug = `/blog`;
    const nextPageSlug = `/blog/`;
    Array.from({ length: totalPages }).forEach((_, i) => {
      const currentPage = i + 1;
      const path = currentPage === 1 ? firstPageSlug : `${nextPageSlug}${currentPage}`;
      createPage({
        path,
        component: blogListTemplate,
        context: {
          title: "Blog",
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
      const firstPageSlug = `/archive/${year}`;
      const nextPageSlug = `/archive/${year}/page/`;
      Array.from({ length: totalPages }).forEach((_, i) => {
        const currentPage = i + 1;
        const path = currentPage === 1 ? firstPageSlug : `${nextPageSlug}${currentPage}`;
        createPage({
          path,
          component: archiveYearTemplate,
          context: {
            title: `Posts in ${year}`,
            regex: yearRegExp.toString(),
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
      const monthSlug = month.replace('-', '/');
      const monthMoment = moment(`${month}-01`);
      const firstPageSlug = `/archive/${monthSlug}`;
      const nextPageSlug = `/archive/${monthSlug}/page/`;
      Array.from({ length: totalPages }).forEach((_, i) => {
        const currentPage = i + 1;
        const path = currentPage === 1 ? firstPageSlug : `${nextPageSlug}${currentPage}`;
        createPage({
          path,
          component: archiveMonthTemplate,
          context: {
            title: `Posts in ${monthMoment.format("MMMM YYYY")}`,
            regex: monthRegExp.toString(),
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

    // Create Author's Posts List Pages.
    authors.forEach(authorName => {
      const prettyName = getPrettyName(authorName);
      const authorPosts = posts.filter(({ node }) => !!node.frontmatter.author && node.frontmatter.author === authorName);
      const totalPages = Math.ceil(authorPosts.length / postsPerPage);
      const firstPageSlug = `/author/${prettyName}`;
      const nextPageSlug = `/author/${prettyName}/page/`;
      Array.from({ length: totalPages }).forEach((_, i) => {
        const currentPage = i + 1;
        const path = currentPage === 1 ? firstPageSlug : `${nextPageSlug}${currentPage}`;
        createPage({
          path,
          component: archiveAuthorTemplate,
          context: {
            title: `${authorName}'s Posts`,
            authorName,
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

    // Create Tag's Posts List Pages.
    tags.forEach(tagName => {
      const prettyName = getPrettyName(tagName);
      const tagRegExp = `/${tagName}/i`;
      const tagPosts = posts.filter(({ node }) => !!node.frontmatter.tags && node.frontmatter.tags.indexOf(tagName) > -1);
      const totalPages = Math.ceil(tagPosts.length / postsPerPage);
      const firstPageSlug = `/tag/${prettyName}`;
      const nextPageSlug = `/tag/${prettyName}/page/`;
      Array.from({ length: totalPages }).forEach((_, i) => {
        const currentPage = i + 1;
        const path = currentPage === 1 ? firstPageSlug : `${nextPageSlug}${currentPage}`;
        createPage({
          path,
          component: archiveTagTemplate,
          context: {
            title: `Tag: ${tagName} Posts`,
            regex: tagRegExp,
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