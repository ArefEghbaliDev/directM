import {createSignal} from 'solid-js';
import {useNavigate} from '@solidjs/router';

export default function RegisterPage() {
    const navigate = useNavigate();

  const [peerId,setPeerId] = createSignal<string>("");

  const handleContinue = () => {
      localStorage.setItem("id",peerId());
      navigate('/inbox', {replace: true});
  }
    return (
    <div>
      <h2>Your ID</h2>
      <p>{peerId()}</p>
      <h2>Enter Peer ID</h2>
      <p>Choose an ID to use so you and others can connect to each other</p>
      <input type="text" name="peer-id" value={peerId()} onInput={(e) => {setPeerId(e.currentTarget.value)}} />
      <button type="button" onClick={handleContinue}>Continue</button>
    </div>
    )
}
