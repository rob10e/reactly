import * as React from 'react';
import TabTitle from './TabTitle';

export interface ITabProps {
  title: string;
  disabled?: boolean;
  active?: boolean;
  content?: React.ReactElement<any>;
  onClick?: () => void;
  removeWorkspace?: () => void;
  updateTabTitle?: (title: string) => void;
  key: string | number;
}

// tslint:disable-next-line:variable-name
const Tab: React.SFC<ITabProps> = ({
  title,
  active,
  disabled,
  onClick,
  content,
  removeWorkspace,
  updateTabTitle,
}) => (
  <li className="nav-item" key={title}>
    <a
      onClick={onClick}
      className={`nav-link${active ? ' active' : ''}${disabled ? ' disabled' : ''}`}
      href="#"
    >
      <TabTitle
        title={title}
        updateTabTitle={newTitle => updateTabTitle && content && updateTabTitle(newTitle)}
      />
      {content && (
        <button
          onClick={(e) => {
            if (removeWorkspace) {
              e.stopPropagation();
              removeWorkspace();
            }
          }}
          type="button"
          className="btn bmd-btn-icon bmd-btn-icon-sm"
        >
          <i className="icon icon-sm">
cancel-circle
          </i>
        </button>
      )}
    </a>
  </li>
);

export default Tab;
