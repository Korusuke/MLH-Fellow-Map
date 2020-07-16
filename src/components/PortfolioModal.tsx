import React, { createRef, useEffect } from 'react';
import { Button, Container } from 'reactstrap';
import { Fellow } from '../data/fellow-type';

function PortfolioModal({
  isOpen,
  setOpen,
  fellow,
}: {
  isOpen: boolean;
  setOpen: (val: boolean) => void;
  fellow?: Fellow;
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
      }, 300); // length of animation, may have to be changed in scss too if changed
    }
  }, [isOpen, modalRef.current]);

  return (
    <div className="portfolio-modal" ref={modalRef}>
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
        </>
      )}

      <Button color="danger" onClick={() => setOpen(false)}>
        Close
      </Button>

      <Container />
    </div>
  );
}

export default PortfolioModal;
