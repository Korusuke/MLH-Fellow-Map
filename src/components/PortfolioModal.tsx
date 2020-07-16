import React from 'react';
import { Fellow } from '../data/fellow-type';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { Link } from 'gatsby';
import PortfolioSocialLinks from './PortfolioSocialLinks';

const shortcodes = { a: Link }; // Provide common components here

function PortfolioModal({ fellow }: { fellow: Fellow }) {
  return (
    <div className="portfolio-page">
      {fellow && (
        <>
          <img
            className="modal-profile-image"
            src={fellow.profilePictureUrl}
            alt={`Profile of ${fellow.name}`}
          />
          <PortfolioSocialLinks fellow={fellow} />
          <div className="heading">{fellow.name}</div>
          <div className="subheading">{fellow.bio}</div>
          <div className="pod u-margin-top">
            &laquo;
            <span className="modal-pod">
              {' '}
              {fellow.podId + ' : ' + fellow.podName}{' '}
            </span>{' '}
            &raquo;
          </div>
          <div className="u-margin-top">
            <img src={`http://ghchart.rshah.org/${fellow.github}`} />
          </div>
          <div className="body">
            <MDXProvider components={shortcodes}>
              <MDXRenderer>{fellow.body}</MDXRenderer>
            </MDXProvider>
          </div>
        </>
      )}
    </div>
  );
}

export default PortfolioModal;
