import { Component } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import RegisterPage from './pages/register/register-page';
import InboxPage from './pages/inbox/inbox-page';
import DirectsPage from './pages/directs/directs-page';

const App: Component = () => {
  return (
    <Routes>
      <Route path="/register" component={RegisterPage} />
      <Route path="/inbox" component={InboxPage} />
      <Route path="/directs/:pid" component={DirectsPage} />
    </Routes>
  );
};

export default App;
