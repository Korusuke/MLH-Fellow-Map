import React, { createRef, useEffect, useRef, useState } from 'react';
import { Container } from 'reactstrap';
import { FellowType } from '../pages';
function PortfolioModal({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (val: boolean) => void;
  fellow?: FellowType;
}) {
  const modalRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!modalRef.current) return;
    const style = modalRef.current.style;
    if (isOpen) {
      style.minHeight = '70vh';
      style.height = 'min-content';
      style.overflowY = 'visible';
      style.top = '30vh';
    } else {
      style.top = (null as unknown) as string;

      setTimeout(() => {
        style.minHeight = (null as unknown) as string;
        style.overflowY = (null as unknown) as string;
        style.height = (null as unknown) as string;
      }, 300);
    }
  }, [isOpen, modalRef.current]);

  return (
    <div className="portfolio-modal" ref={modalRef}>
      <img
        className="profile-image"
        src="/images/willr.jpg"
        alt="profile pic"
      />
      <Container />
    </div>
  );
}

export default PortfolioModal;
