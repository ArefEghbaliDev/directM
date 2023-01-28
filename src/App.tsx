import { Component, Show } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import RegisterPage from './pages/register/register-page';
import InboxPage from './pages/inbox/inbox-page';
import DirectsPage from './pages/directs/directs-page';
import { ECallStatus, usePeer } from './lib/context/peer-context';
import VideoCallContainer from './components/video-call-container';

const App: Component = () => {
  const { callStatus } = usePeer();

  return (
    <div class='relative'>
      <Routes>
        <Route path="/register" component={RegisterPage} />
        <Route path="/inbox" component={InboxPage} />
        <Route path="/directs/:pid" component={DirectsPage} />
      </Routes>
      <Show when={callStatus() !== ECallStatus.IDLE}>
        <VideoCallContainer />
      </Show>
    </div>
  );
};

export default App;
