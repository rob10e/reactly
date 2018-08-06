import * as React from 'react';
import Tab, { ITabProps } from './Tab';

export interface ITabsProps {
  children: React.ReactElement<ITabProps>[] | React.ReactElement<ITabProps>;
  active: number;
  setActive: (index: number) => void;
  addWorkspace: () => void;
  removeWorkspace: (id: number) => void;
  updateTabTitle: (title: string, id: number) => void;
}

const Tabs: React.SFC<ITabsProps> = ({
  children,
  active,
  setActive,
  addWorkspace,
  removeWorkspace,
  updateTabTitle,
}) => {
  const child = Array.isArray(children)
    ? (children as React.ReactElement<ITabProps>[])
      .filter(tab => Number(tab.key) === active)
      .map(child1 => child1)[0]
    : children;
  const componentChildren = Array.isArray(children)
    ? (children as React.ReactElement<ITabProps>[])
    : [children];
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
        {child && child.props.content}
      </div>
    </div>
  );
};

export default Tabs;
