/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';

import './assets/styles/main.css';

import App from './App';
import { PeerProvider } from './lib/context/peer-context';

render(() => <Router>
  <PeerProvider peer={null}>
    <App />
  </PeerProvider>
</Router>, document.getElementById('root') as HTMLElement);
