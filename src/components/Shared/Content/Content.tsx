import * as React from 'react';

interface IContent {
  children: React.ReactNode;
}

// tslint:disable-next-line:variable-name
const Content: React.SFC<IContent> = (props) => {
  return <div className="content">{props.children}</div>;
};

export default Content;
