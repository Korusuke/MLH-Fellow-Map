import React from 'react';
import { Container } from 'reactstrap';
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
          <div className="heading">{fellow.name}</div>
          <div className="subheading">{fellow.bio}</div>

          <PortfolioSocialLinks fellow={fellow} />

          <div className="body">
            <MDXProvider components={shortcodes}>
              <MDXRenderer>{fellow.body}</MDXRenderer>
            </MDXProvider>
          </div>
        </>
      )}

      <Container />
    </div>
  );
}

export default PortfolioModal;
