import { combineReducers, createStore } from 'redux';
import IWorkspaceManagerState from './components/WorkspaceManager/IWorkspaceManager.state';
import WorkspaceManagerReducer from './components/WorkspaceManager/WorkspaceManager.reducer';

export interface IRootState {
  WorkspaceManager: IWorkspaceManagerState;
}

const root = combineReducers({
  WorkspaceManager: WorkspaceManagerReducer,
});

export default createStore(
  root,
  /* eslint-disable no-underscore-dangle */
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  /* eslint-enable no-underscore-dangle */
);
