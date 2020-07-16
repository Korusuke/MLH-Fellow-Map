import React from 'react';
import {
  Fellow,
  FellowType,
  SocialLinks,
  SocialType,
} from '../data/fellow-type';

function PortfolioSocialLinks({ fellow }: { fellow: Fellow }) {
  const SocialLink = ({ name }: { name: SocialType }) => {
    if (!fellow[name]) return null;
    return (
      <a
        href={`${SocialLinks[name]}/${fellow[name]}`}
        target="_blank"
        rel="noreferrer"
      >
        <i className={`fab fa-${name}`} />
      </a>
    );
  };

  const socialLinks = Object.keys(SocialLinks).map((socialName, i) => (
    <SocialLink name={socialName as SocialType} key={i} />
  ));

  return (
    <div>
      <div className="portfolio-social-links">{socialLinks}</div>
    </div>
  );
}

export default PortfolioSocialLinks;
