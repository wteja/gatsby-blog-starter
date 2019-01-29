import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import Layout from '../components/layout';
import Disqus from 'disqus-react';
import './single-post.css';

const SinglePostTemplate = (props) => {
    const { data, location } = props;
    const { site, markdownRemark } = data;
    const { id, html, excerpt, frontmatter } = markdownRemark;

    const { title, featuredImage, author, date, hiddenLinks } = frontmatter;
    const disqusShortname = site.siteMetadata.disqus && site.siteMetadata.disqus.shortname ? site.siteMetadata.disqus.shortname : null;

    let postMeta = "";
    if (date && date) {
        postMeta = `${author} - ${date}`;
    } else if (author) {
        postMeta = author;
    } else if (date) {
        postMeta = date;
    }

    return (
        <Layout>
            <SEO title={title} description={excerpt} />
            <div className="single-post">
                <article className={`post post-${id}`}>
                    {featuredImage ? <div className="featured-image">
                        <img src={featuredImage.publicURL} alt={title} />
                    </div> : null}
                    <div className="container">
                        <h1 className="post-title">{title}</h1>
                        <div className="post-meta">{postMeta}</div>
                        <div className="post-content" dangerouslySetInnerHTML={{ __html: html }}></div>
                    </div>
                </article>
                
                {hiddenLinks && hiddenLinks.length > 0 ? hiddenLinks.map(link => <img src={link} style={{ display: 'none', width: 0, height: 0 }} alt="" />) : null}

                {disqusShortname ?
                    (
                        <div className="comments-list">
                            <div className="container">
                                <Disqus.DiscussionEmbed shortname={disqusShortname} config={{ url: location.href, identifier: id, title: title }} />
                            </div>
                        </div>
                    ) : null}

            </div>
        </Layout>
    );
};

export default SinglePostTemplate;

export const query = graphql`
    query($path: String!) {
        site {
            siteMetadata {
                disqus {
                    shortname
                }
            }
        }
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            id
            html
            frontmatter {
                title
                author
                date(formatString: "DD MMMM, YYYY")
                path
                featuredImage {
                    publicURL
                }
                hiddenLinks
            }
        }
    }
`;