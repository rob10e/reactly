import { IWorkspaceManagerState } from './IWorkspaceManager.state';

import { IWorkspaceState } from './Workspace/Workspace.state';
import {
  IAddWorkspaceAction,
  IRemoveWorkspaceAction,
  ISetActiveAction,
  IUpdateWorkspaceTitleAction,
} from './WorkspaceManager.actions';
import {
  ADD_WORKSPACE,
  REMOVE_WORKSPACE,
  SET_ACTIVE,
  UPDATE_WORKSPACE_TITLE,
} from './WorkspaceManager.constants';

export const initialState: IWorkspaceManagerState = {
  activeWorkspace: 1,
  workspaces: [{ id: 1, title: 'Workspace 1', content: 'Content 1' }],
};

type actions = | IAddWorkspaceAction
  | IRemoveWorkspaceAction
  | ISetActiveAction
  | IUpdateWorkspaceTitleAction;

export default (state: IWorkspaceManagerState = initialState, action: actions) => {
  let workspaces;
  const newWorkspaceId = state.workspaces.length + 1;
  switch (action.type) {
    case ADD_WORKSPACE:
      workspaces = [...state.workspaces];
      workspaces.push({
        id: newWorkspaceId,
        title: `Workspace ${newWorkspaceId}`,
        content: `Content ${newWorkspaceId}`,
      } as IWorkspaceState);
      return { ...state, workspaces };
    case REMOVE_WORKSPACE:
      return {
        ...state,
        workspaces: state.workspaces.filter(workspace => workspace.id !== action.payload),
      };
    case SET_ACTIVE:
      return {
        ...state,
        activeWorkspace: action.payload,
      };
    case UPDATE_WORKSPACE_TITLE:
      return {
        ...state,
        workspaces: state.workspaces.map(
          item => (item.id === action.payload.id ? { ...item, title: action.payload.title } : item),
        ),
      };
    default:
      return state;
  }
};
