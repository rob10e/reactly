import * as React from 'react';
import { Content, Footer, Header } from '../Shared';
import WorkspaceManager from '../WorkspaceManager';
import IWorkspace from '../WorkspaceManager/Workspace/Workspace.state';

class Layout extends React.Component {
  private updateActiveWorkspace = (workspace: IWorkspace): IWorkspace => ({
    ...workspace,
    content: 'Test',
  });

  render() {
    return (
      <React.Fragment>
        <Header />
        <Content>
          <WorkspaceManager updateCurrentWorkspace={this.updateActiveWorkspace} />
        </Content>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Layout;
