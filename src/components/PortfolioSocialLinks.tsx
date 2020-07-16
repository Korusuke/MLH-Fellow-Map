import React from 'react';
import { Fellow, SocialLinks, SocialType } from '../data/fellow-type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

const icons = {
  github: faGithub,
  linkedin: faLinkedin,
  twitter: faTwitter,
};

function PortfolioSocialLinks({ fellow }: { fellow: Fellow }) {
  const SocialLink = ({ name }: { name: SocialType }) => {
    if (!fellow[name]) return null;
    return (
      <div>
        <a
          href={`${SocialLinks[name]}/${fellow[name]}`}
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            className="portfolio-social-icon"
            size="lg"
            icon={icons[name]}
            color="#73737D"
          />
        </a>
      </div>
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
