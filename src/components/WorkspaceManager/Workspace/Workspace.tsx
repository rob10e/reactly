import * as React from 'react';
import IWorkspace from './Workspace.state';

const styles = {
  background: {
    backgroundColor: '#fff',
  },
};

const Workspace: React.SFC<IWorkspace> = ({ content }) => (
  <svg width={window.innerWidth} height={window.innerHeight} style={styles.background}>
    <g>
      {content}
    </g>
  </svg>
);

export default Workspace;
