import React from 'react';
import { graphql, Link } from 'gatsby';
import * as moment from 'moment';
import SEO from '../components/seo';
import Layout from '../components/layout';
import Disqus from 'disqus-react';
import { getPrettyName, getArchiveAuthorUrl, getArchiveMonthUrl } from '../utils/common';
import './single-post.css';

const SinglePostTemplate = (props) => {
    const { data, location } = props;
    const { site, markdownRemark } = data;
    const { id, html, excerpt, frontmatter } = markdownRemark;

    const { title, featuredImage, author, date, tags, hiddenLinks } = frontmatter;
    const disqusShortname = site.siteMetadata.disqus && site.siteMetadata.disqus.shortname ? site.siteMetadata.disqus.shortname : null;

    let postMeta = "";
    if (date && date) {
        postMeta = <>Posted on {getArchiveDateLink(date)}, by {getArchiveAuthorLink(author)}</>;
    } else if (author) {
        postMeta = <>Posted by {getArchiveAuthorLink(author)}</>;
    } else if (date) {
        postMeta = <>Posted on {getArchiveDateLink(date)}</>;
    }

    let postTags = null;
    if(tags && tags.length > 0) {
        const tagArr = tags && tags.length > 0 ? tags.map(tag => ({ name: tag, path: '/tag/' + getPrettyName(tag) })) : [];
        postTags = <div className="post-tags"><span className="tag-label">Tags:</span> {tagArr.map((tag, index) => <Link key={index} to={tag.path} className="badge badge-light">{tag.name}</Link>)}</div>
    }

    return (
        <Layout>
            <SEO title={title} description={excerpt} keywords={tags} />
            <div className="single-post">
                <article className={`post post-${id}`}>
                    {featuredImage ? <div className="featured-image">
                        <img src={featuredImage.publicURL} alt={title} />
                    </div> : null}
                    <div className="container">
                        <h1 className="post-title">{title}</h1>
                        <div className="post-meta">{postMeta}</div>
                        <div className="post-content" dangerouslySetInnerHTML={{ __html: html }}></div>
                        {postTags}
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

function getArchiveAuthorLink(authorName) {
    return <Link to={getArchiveAuthorUrl(authorName)}>{authorName}</Link>
}

function getArchiveDateLink(date) {
    const dateMoment = moment(date);
    return <Link to={getArchiveMonthUrl(date)}>{dateMoment.format("DD MMMM YYYY")}</Link>
}

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
                date(formatString: "DD MMMM YYYY")
                tags
                featuredImage {
                    publicURL
                }
                hiddenLinks
            }
        }
    }
`;