import * as React from 'react';
import IWorkspace from './Workspace.state';

const Workspace: React.SFC<IWorkspace> = ({ content }) => (
  <div>
    {content}
  </div>
);

export default Workspace;
