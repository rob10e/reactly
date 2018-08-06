import * as React from 'react';

export interface ITabTitleProps {
  updateTabTitle: (title: string) => void;
  title: string;
}

export interface ITabTitleState {
  editMode: boolean;
  title: string;
}

export default class TabTitle extends React.Component<ITabTitleProps, ITabTitleState> {
  public state: ITabTitleState = {
    editMode: false,
    /* eslint-disable react/destructuring-assignment */
    title: this.props.title,
  };

  updateTitle = (e: any) => {
    e.stopPropagation();
    this.setState({ editMode: false });
    this.props.updateTabTitle(this.state.title);
  };

  renderEditMode = () => {
    const { title } = this.state;
    return (
      <input
        className="form-control"
        type="text"
        value={title}
        onKeyDown={(e) => {
          e.persist();
          const { keyCode } = e;
          if (keyCode === 13) {
            this.updateTitle(e);
          }
        }}
        onBlur={this.updateTitle}
        onChange={e => this.setState({ title: e.target.value })}
      />
    );
  };

  render() {
    return this.state.editMode ? (
      this.renderEditMode()
    ) : (
      <span onDoubleClick={() => this.setState({ editMode: true })}>
        {this.state.title}
      </span>
    );
  }
}
