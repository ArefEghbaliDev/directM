import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import {Icon} from '@amoutonbrady/solid-heroicons';
import {paperAirplane} from '@amoutonbrady/solid-heroicons/outline';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [peerId, setPeerId] = createSignal<string>("");

  const handleContinue = () => {
    if(peerId() === "") return;

    localStorage.setItem("id", peerId());
    navigate('/inbox', { replace: true });
  }
  return (
    <div class='p-5'>
      <h2 class='font-bold text-xl'>Register</h2>
      <p>Choose an ID to use so you and others can connect to each other</p>
      <div class='flex items-center justify-between rounded-full border border-gray-200 p-3 mt-8'>
      <input type="text" name="peer-id" value={peerId()} placeholder='Enter a ID' onInput={(e) => { setPeerId(e.currentTarget.value) }} class='flex-1 focus:outline-none' />
      <button type="button" onClick={handleContinue} class="rotate-90"><Icon path={paperAirplane} width={24} height={24} /></button>
      </div>
    </div>
  )
}
