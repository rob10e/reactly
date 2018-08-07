import IWorkspace from './Workspace/Workspace.state';
import {
  ADD_WORKSPACE,
  REMOVE_WORKSPACE,
  SET_ACTIVE,
  UPDATE_WORKSPACE_TITLE,
  UPDATE_WORKSPACE,
} from './WorkspaceManager.constants';

export interface IAddWorkspaceAction {
  type: typeof ADD_WORKSPACE;
  payload?: null;
}
export interface IRemoveWorkspaceAction {
  type: typeof REMOVE_WORKSPACE;
  payload: number;
}
export interface ISetActiveAction {
  type: typeof SET_ACTIVE;
  payload: number;
}
export interface IUpdateWorkspaceTitleAction {
  type: typeof UPDATE_WORKSPACE_TITLE;
  payload: { title: string; id: number };
}
export interface IUpdateWorkspaceAction {
  type: typeof UPDATE_WORKSPACE;
  payload: { workspace: IWorkspace; id: number };
}

export const addWorkspace = (): IAddWorkspaceAction => ({
  type: ADD_WORKSPACE,
});
export const removeWorkspace = (id: number): IRemoveWorkspaceAction => ({
  payload: id,
  type: REMOVE_WORKSPACE,
});
export const setActive = (id: number): ISetActiveAction => ({
  payload: id,
  type: SET_ACTIVE,
});
export const updateWorkspaceTitle = (title: string, id: number): IUpdateWorkspaceTitleAction => ({
  payload: { title, id },
  type: UPDATE_WORKSPACE_TITLE,
});
export const updateWorkspace = (id: number, workspace: IWorkspace): IUpdateWorkspaceAction => ({
  payload: { workspace, id },
  type: UPDATE_WORKSPACE,
});
