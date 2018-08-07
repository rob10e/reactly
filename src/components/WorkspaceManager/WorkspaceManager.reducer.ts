import IWorkspaceManagerState from './IWorkspaceManager.state';

import IWorkspace from './Workspace/Workspace.state';
import {
  IAddWorkspaceAction,
  IRemoveWorkspaceAction,
  ISetActiveAction,
  IUpdateWorkspaceTitleAction,
  IUpdateWorkspaceAction,
} from './WorkspaceManager.actions';
import {
  ADD_WORKSPACE,
  REMOVE_WORKSPACE,
  SET_ACTIVE,
  UPDATE_WORKSPACE_TITLE,
  UPDATE_WORKSPACE,
} from './WorkspaceManager.constants';

export const initialState: IWorkspaceManagerState = {
  activeWorkspace: 1,
  workspaces: [{ id: 1, title: 'Workspace 1', content: null }],
};

type actions = | IAddWorkspaceAction
  | IRemoveWorkspaceAction
  | ISetActiveAction
  | IUpdateWorkspaceTitleAction
  | IUpdateWorkspaceAction;

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
      } as IWorkspace);
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
    case UPDATE_WORKSPACE:
      return {
        ...state,
        workspaces: state.workspaces.map(
          item => (item.id === action.payload.id
            ? { ...item, content: action.payload.workspace.content }
            : item),
        ),
      };
    default:
      return state;
  }
};
