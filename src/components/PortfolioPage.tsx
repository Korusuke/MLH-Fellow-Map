import React from 'react';
import { Fellow } from '../data/fellow-type';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { Link } from 'gatsby';
import PortfolioSocialLinks from './PortfolioSocialLinks';
import NavigationHeader from './NavigationHeader';

const shortcodes = { a: Link }; // Provide common components here

function PortfolioPage({ fellow }: { fellow: Fellow }) {
  return (
    <div className="portfolio-page">
      <NavigationHeader fellow={fellow} />
      {fellow && (
        <>
          <img
            className="profile-image"
            src={fellow.profilePictureUrl}
            alt={`Profile of ${fellow.name}`}
          />
          <div className="heading">{fellow.name}</div>
          <div className="subheading">{fellow.bio}</div>

          <PortfolioSocialLinks fellow={fellow} />
          <div className="u-margin-top">
            <img src={`http://ghchart.rshah.org/${fellow.github}`} />
          </div>
          {fellow.body && (
            <div className="body">
              <MDXProvider components={shortcodes}>
                <MDXRenderer>{fellow.body}</MDXRenderer>
              </MDXProvider>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PortfolioPage;
