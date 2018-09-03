import * as React from 'react';
// import Konva from 'konva';
// import { Stage, Layer } from 'react-konva';
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
  // <Stage width={window.innerWidth} height={window.innerHeight} style={styles.background}>
  //   <Layer>
  //     {content}
  //   </Layer>
  // </Stage>
);

export default Workspace;
