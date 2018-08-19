import * as React from 'react';
import { connect } from 'react-redux';
import * as isEqual from 'react-fast-compare';
import { Tabs, Tab } from '../Shared/Tabs';
import IWorkspaceManagerState from './IWorkspaceManager.state';
import {
  addWorkspace,
  removeWorkspace,
  setActive,
  updateWorkspaceTitle,
  updateWorkspace,
} from './WorkspaceManager.actions';
import { IRootState } from '../../store';
import IWorkspace from './Workspace/Workspace.state';

// import * as $ from 'jquery';

interface IWorkspaceManagerDispatchProps {
  addWorkspace: () => void;
  removeWorkspace: (id: number) => void;
  setActive: (index: number) => void;
  updateWorkspaceTitle: (title: string, id: number) => void;
  updateWorkspace: (id: number, workspace: IWorkspace) => void;
}

interface IWorkspaceManagerStateProps {
  manager: IWorkspaceManagerState;
}

interface IWorkspaceManagerPassedProps {
  updateCurrentWorkspace: (workspace: IWorkspace) => IWorkspace;
}

type WorkspaceManagerProps = IWorkspaceManagerDispatchProps &
  IWorkspaceManagerPassedProps &
  IWorkspaceManagerStateProps;

const WorkspaceManager: React.SFC<WorkspaceManagerProps> = ({
  /* eslint-disable no-shadow */
  manager: { activeWorkspace, workspaces },
  setActive,
  removeWorkspace,
  addWorkspace,
  updateWorkspaceTitle,
  updateCurrentWorkspace,
  updateWorkspace,
  /* eslint-enable no-shadow */
}) => {
  const currentWorkspace = workspaces.filter(item => item.id === activeWorkspace)[0];
  const newWorkspace = updateCurrentWorkspace(currentWorkspace);
  if (!isEqual(currentWorkspace, newWorkspace)) {
    updateWorkspace(activeWorkspace, newWorkspace);
  }
  return (
    <React.Fragment>
      <Tabs
        active={activeWorkspace}
        setActive={(index) => {
          setActive(index);
        }}
        addWorkspace={addWorkspace}
        removeWorkspace={removeWorkspace}
        updateTabTitle={(title, id) => updateWorkspaceTitle(title, id)}
        workspaces={workspaces}
      >
        {workspaces.map(workspace => (
          <Tab key={workspace.id} title={workspace.title} workspace={workspace} />
        ))}
      </Tabs>
    </React.Fragment>
  );
};

const mapState2Props = (state: IRootState) => ({ manager: { ...state.WorkspaceManager } });

export default connect<
IWorkspaceManagerStateProps,
IWorkspaceManagerDispatchProps,
IWorkspaceManagerPassedProps
>(
  mapState2Props,
  {
    addWorkspace,
    removeWorkspace,
    setActive,
    updateWorkspaceTitle,
    updateWorkspace,
  },
)(WorkspaceManager);
