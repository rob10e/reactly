import * as React from 'react';
import { Content, Footer, Header } from '../Shared';
import WorkspaceManager from '../WorkspaceManager';

// tslint:disable-next-line:variable-name
const Layout: React.SFC = () => (
  <React.Fragment>
    <Header />
    <Content>
      <WorkspaceManager />
    </Content>
    <Footer />
  </React.Fragment>
);

export default Layout;
