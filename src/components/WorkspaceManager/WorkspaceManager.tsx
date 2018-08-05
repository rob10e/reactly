import * as React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from '../Shared/Tabs/Tabs';
import { IWorkspaceManagerState } from './IWorkspaceManager.state';
import { addWorkspace, removeWorkspace, setActive } from './WorkspaceManager.actions';
import { IRootState } from '../../store';
import { Workspace } from '.';

// import * as $ from 'jquery';

export interface IWorkspaceManagerProps {
  addWorkSpace: (workspace: typeof Workspace) => void;
  removeWorkspace: (workspace: typeof Workspace) => void;
  setActive: (index: number) => void;
  manager: IWorkspaceManagerState;
}

class WorkspaceManager extends React.Component<IWorkspaceManagerProps, IWorkspaceManagerState> {
  /* eslint-disable react/destructuring-assignment */
  public state: IWorkspaceManagerState = { ...this.props.manager };

  // public componentDidMount() {}
  public render() {
    return (
      <div>
        <Tabs
          active={this.props.manager.activeWorkspace}
          setActive={(index) => {
            this.props.setActive(index);
          }}
        >
          {this.props.manager.workspaces.map((workspace, index) => (
            <Tab key={index} title={workspace.title} content={workspace.content} />
          ))}
        </Tabs>
      </div>
    );
  }
}

const mapState2Props = (state: IRootState) => ({ manager: { ...state.WorkspaceManager } });

export default connect(
  mapState2Props,
  { addWorkspace, removeWorkspace, setActive },
)(WorkspaceManager as any);
