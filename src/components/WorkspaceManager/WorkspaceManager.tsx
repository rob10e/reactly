import * as React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from '../Shared/Tabs';
import { IWorkspaceManagerState } from './IWorkspaceManager.state';
import {
  addWorkspace,
  removeWorkspace,
  setActive,
  updateWorkspaceTitle,
} from './WorkspaceManager.actions';
import { IRootState } from '../../store';

// import * as $ from 'jquery';

export interface IWorkspaceManagerProps {
  addWorkspace: () => void;
  removeWorkspace: (id: number) => void;
  setActive: (index: number) => void;
  updateWorkspaceTitle: (title: string, id: number) => void;
  manager: IWorkspaceManagerState;
}

const WorkspaceManager: React.SFC<IWorkspaceManagerProps> = ({
  /* eslint-disable no-shadow */
  manager: { activeWorkspace, workspaces },
  setActive,
  removeWorkspace,
  addWorkspace,
  updateWorkspaceTitle,
  /* eslint-enable no-shadow */
}) => (
  <React.Fragment>
    <Tabs
      active={activeWorkspace}
      setActive={(index) => {
        setActive(index);
      }}
      addWorkspace={addWorkspace}
      removeWorkspace={removeWorkspace}
      updateTabTitle={(title, id) => updateWorkspaceTitle(title, id)}
    >
      {workspaces.map(({ id, title, content }) => <Tab key={id} title={title} content={content} />)}
    </Tabs>
  </React.Fragment>
);

const mapState2Props = (state: IRootState) => ({ manager: { ...state.WorkspaceManager } });

export default connect(
  mapState2Props,
  {
    addWorkspace,
    removeWorkspace,
    setActive,
    updateWorkspaceTitle,
  },
)(WorkspaceManager as any);
