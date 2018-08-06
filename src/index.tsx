import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
// import 'material-design-icons/iconfont/material-icons.css';

require('typeface-roboto');

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
