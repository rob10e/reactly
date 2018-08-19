import * as React from 'react';
import Tab, { ITabProps } from './Tab';
import IWorkspace from '../../WorkspaceManager/Workspace/Workspace.state';
import Workspace from '../../WorkspaceManager/Workspace/Workspace';

export interface ITabsProps {
  children: React.ReactElement<ITabProps>[] | React.ReactElement<ITabProps>;
  active: number;
  setActive: (index: number) => void;
  addWorkspace: () => void;
  removeWorkspace: (id: number) => void;
  updateTabTitle: (title: string, id: number) => void;
  workspaces: ReadonlyArray<IWorkspace>;
}

const Tabs: React.SFC<ITabsProps> = ({
  children,
  active,
  setActive,
  addWorkspace,
  removeWorkspace,
  updateTabTitle,
  workspaces,
}) => {
  const child = Array.isArray(children)
    ? (children as React.ReactElement<ITabProps>[])
      .filter(tab => Number(tab.key) === active)
      .map(child1 => child1)[0]
    : children;
  const componentChildren = Array.isArray(children)
    ? (children as React.ReactElement<ITabProps>[])
    : [children];
  const blankWorkspace: IWorkspace = { id: 0, content: '', title: '' };
  return (
    <div className="flex">
      <ul className="nav nav-tabs tabbar-row">
        <Tab title="+" onClick={addWorkspace} key="+" />
        {componentChildren.map((child1) => {
          const id = Number(child1.key);
          const isActive = id === active;
          return React.cloneElement(child1, {
            active: isActive,
            onClick: () => {
              setActive(id);
            },
            removeWorkspace: () => {
              removeWorkspace(id);
            },
            updateTabTitle: (title) => {
              updateTabTitle(title, id);
            },
          });
        })}
      </ul>
      <div className="card content">
        <Workspace {...child.props.workspace || blankWorkspace} />
      </div>
    </div>
  );
};

export default Tabs;
