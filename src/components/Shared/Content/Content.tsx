import * as React from 'react';

interface IContent {
  children: React.ReactNode;
}

// tslint:disable-next-line:variable-name
const Content: React.SFC<IContent> = ({ children }) => (
  <div className="content">
    {children}
  </div>
);

export default Content;
