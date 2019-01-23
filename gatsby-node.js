/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;
    const blogListTemplate = path.resolve(`src/templates/blog-list.js`);
    const singlePostTemplate = path.resolve(`src/templates/single-post.js`);

    return graphql(`
        query {
            site {
                siteMetadata {
                    postsPerPage
                }
            }
            allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date]}) {
                edges {
                    node {
                        frontmatter {
                            path
                        }
                    }
                }
            }
        }
    `).then(result => {
            if (result.errors)
                return Promise.reject(result.errors);

            const { allMarkdownRemark, site } = result.data;

            const posts = allMarkdownRemark.edges;

            // Create Posts List Pages.
            const postsPerPage = site.siteMetadata.postsPerPage;
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


            // Create Post Pages.
            posts.forEach(({ node }) => {
                createPage({
                    path: node.frontmatter.path,
                    component: singlePostTemplate
                });
            });
        });
};