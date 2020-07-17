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
          <div className="heading u-margin-top-lg">{fellow.name}</div>
          <div className="subheading">{fellow.bio}</div>
          <div className="pod u-margin-top">
            &laquo;
            <span className="modal-pod">
              {' '}
              {fellow.podId + ' : ' + fellow.podName}{' '}
            </span>{' '}
            &raquo;
          </div>
          <PortfolioSocialLinks fellow={fellow} />

          {fellow.body && (
            <div className="body">
              <MDXProvider components={shortcodes}>
                <MDXRenderer>{fellow.body}</MDXRenderer>
              </MDXProvider>
            </div>
          )}
          <div>
            <img src={`http://ghchart.rshah.org/${fellow.github}`} />
          </div>
          <div className="u-margin-top u-margin-bottom">
            <a
              className="u-color-green"
              href={
                'https://github.com/Korusuke/MLH-Fellow-Map/tree/v2/src/profiles'
              }
              target="_blank"
              rel="noreferrer noopener"
            >
              <svg
                fill="#21af90"
                height="1.2em"
                width="1.2em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 40 40"
                style={{
                  marginRight: '0.3em',
                  verticalAlign: 'sub',
                }}
              >
                <g>
                  <path d="m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z" />
                </g>
              </svg>
              <span className="u-color-green">
                Is this you? Edit this page! :)
              </span>
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default PortfolioModal;
