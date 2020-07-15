import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';

import '../assets/stylesheets/application.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({
  children,
  pageName,
}: {
  children?: ReactElement[] | ReactElement;
  pageName?: string;
}) => {
  let className = '';

  if (pageName) {
    className = `${className} page-${pageName}`;
  }

  return (
    <>
      <Helmet bodyAttributes={{ class: className }}>
        <title>MLH Fellows</title>
      </Helmet>
      <div className="wrapper">
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
