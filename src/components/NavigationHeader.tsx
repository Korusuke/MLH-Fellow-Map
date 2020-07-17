import React from 'react';
import Logo from './Logo';
import { Fellow } from '../data/fellow-type';

function NavigationHeader({ fellow }: { fellow: Fellow }) {
  return (
    <>
      <div className="navContainer">
        <a href={`/`} target="_blank" rel="noreferrer">
          <Logo />
        </a>
        <div className="pod">
          <img
            className="pod-image"
            src={fellow.podLogoUrl}
            alt={fellow.podName}
          />
          <span>
            <div className="pod-id"> {fellow.podId} </div>
            <div className="pod-name">{fellow.podName}</div>
          </span>
        </div>
      </div>
    </>
  );
}

export default NavigationHeader;
