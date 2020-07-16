import React from 'react';
import { Container } from 'reactstrap';
import { Fellow } from '../data/fellow-type';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { Link } from 'gatsby';
const shortcodes = { a: Link }; // Provide common components here
function PortfolioModal({ fellow }: { fellow: Fellow }) {
  return (
    <div className="portfolio-modal">
      {fellow && (
        <>
          <img
            className="profile-image"
            src={fellow.profilePictureUrl}
            alt={`Profile of ${fellow.name}`}
          />
          <h3>{fellow.name}</h3>
          <p>{fellow.bio}</p>
          <p>{fellow.podId}</p>
          <p>{fellow.podName}</p>
          <p>
            <MDXProvider components={shortcodes}>
              <MDXRenderer>{fellow.body}</MDXRenderer>
            </MDXProvider>
          </p>
        </>
      )}

      <Container />
    </div>
  );
}

export default PortfolioModal;
