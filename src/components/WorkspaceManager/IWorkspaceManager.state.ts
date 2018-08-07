import IWorkspace from './Workspace/Workspace.state';

export default interface IWorkspaceManagerState {
  activeWorkspace: number;
  workspaces: ReadonlyArray<IWorkspace>;
}
