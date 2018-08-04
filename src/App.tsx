import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
import * as React from 'react';
import './App.css';
import { Content, Header } from './components/Shared';
import { Footer } from './components/Shared/Footer';

class App extends React.Component {
  public componentDidMount() {
    // tslint:disable:no-string-literal
    window['jQuery'] = require('jquery');
    window['Popper'] = require('popper.js').default;
    // tslint:disable-next-line:no-var-requires
    require('bootstrap-material-design');
  }
  public render() {
    return (
      <div>
        <Header />
        <Content>Content</Content>
        <Footer />
      </div>
    );
  }
}

export default App;
