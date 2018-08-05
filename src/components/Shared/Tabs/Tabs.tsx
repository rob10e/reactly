import * as React from 'react';

export interface ITabsProps {
  children: React.ReactElement<ITabProps>[] | React.ReactElement<ITabProps>;
  active: number;
  setActive: (index: number) => void;
}

export const Tabs: React.SFC<ITabsProps> = ({ children, active, setActive }) => {
  const child = Array.isArray(children)
    ? (children as React.ReactElement<ITabProps>[])
      .filter((_, index) => index + 1 === active)
      .map(child1 => child1)[0]
    : children;
  const componentChildren = Array.isArray(children)
    ? (children as React.ReactElement<ITabProps>[])
    : [children];
  return (
    <div>
      <ul className="nav nav-tabs">
        {componentChildren.map((child1, index) => {
          const isActive = index + 1 === active;
          return React.cloneElement(child1, {
            key: `${child1.props.title}_${index}`,
            active: isActive,
            onClick: () => {
              setActive(index + 1);
            },
          });
        })}
      </ul>
      {child.props.content}
    </div>
  );
};

export interface ITabProps {
  title: string;
  disabled?: boolean;
  active?: boolean;
  content: React.ReactElement<any>;
  onClick?: () => void;
}

// tslint:disable-next-line:variable-name
export const Tab: React.SFC<ITabProps> = ({
  title, active, disabled, onClick,
}) => (
  <li className="nav-item" key={title}>
    <a
      onClick={onClick}
      className={`nav-link${active ? ' active' : ''}${disabled ? ' disabled' : ''}`}
      href="#"
    >
      {title}
    </a>
  </li>
);
