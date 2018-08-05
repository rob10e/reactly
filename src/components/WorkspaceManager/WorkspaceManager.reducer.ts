import { IWorkspaceManagerState } from './IWorkspaceManager.state';

import { IWorkspaceState } from './Workspace/Workspace.state';
import {
  IAddWorkspaceAction,
  IRemoveWorkspaceAction,
  ISetActiveAction,
} from './WorkspaceManager.actions';
import { ADD_WORKSPACE, REMOVE_WORKSPACE, SET_ACTIVE } from './WorkspaceManager.constants';

export const initialState: IWorkspaceManagerState = {
  activeWorkspace: 1,
  workspaces: [
    { id: 1, title: 'Workspace 1', content: 'Content 1' },
    { id: 2, title: 'Workspace 2', content: 'Content 2' },
    { id: 3, title: 'Workspace 3', content: 'Content 3' },
  ],
};

type actions = IAddWorkspaceAction | IRemoveWorkspaceAction | ISetActiveAction;

export default (state: IWorkspaceManagerState = initialState, action: actions) => {
  let workspaces;
  switch (action.type) {
    case ADD_WORKSPACE:
      workspaces = [...state.workspaces];
      workspaces.push({} as IWorkspaceState);
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
    default:
      return state;
  }
};
