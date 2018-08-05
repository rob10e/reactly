import { IWorkspaceState } from './Workspace/Workspace.state';

export interface IWorkspaceManagerState {
  activeWorkspace: number;
  workspaces: ReadonlyArray<IWorkspaceState>;
}
