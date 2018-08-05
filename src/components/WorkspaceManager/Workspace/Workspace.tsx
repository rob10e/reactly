import * as React from 'react';

export interface IWorkspaceProps {
  index: number;
  title: string;
}

const Workspace: React.SFC<IWorkspaceProps> = ({ title }) => (
  <div>
    {title}
  </div>
);

export default Workspace;
