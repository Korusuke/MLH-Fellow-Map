import React, { ReactElement } from 'react';

function Container({
  children,
  className,
  type,
}: {
  children: ReactElement[];
  className: string;
  type: string;
}) {
  let containerClassName = 'container';

  if (type) {
    containerClassName = `${containerClassName} container-${type}`;
  }

  if (className) {
    containerClassName = `${containerClassName} ${className}`;
  }

  return <div className={containerClassName}>{children}</div>;
}

export default Container;
