import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
import * as React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Layout from './components/Layout/Layout';
import store from './store';

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
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}

export default App;
