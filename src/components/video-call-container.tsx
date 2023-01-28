import { onMount } from "solid-js";
import { ECallStatus, usePeer } from "../lib/context/peer-context";

let localVideoEl: HTMLVideoElement | undefined;
let remoteVideoEl: HTMLVideoElement | undefined;

export default function VideoCallContainer() {

  const { connection, peer, setCallStatus } = usePeer();

  onMount(async () => {
    const p = peer();
    const conn = connection();

    if (!p || !conn) return;
    if (!localVideoEl || !remoteVideoEl) return;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

    localVideoEl.srcObject = stream;

    const call = p.call(conn.peer, stream);

    call.on('stream', remoteStream => {
      if (remoteVideoEl) {
        setCallStatus(ECallStatus.INCALL);
        remoteVideoEl.srcObject = remoteStream;
      }
    });

    p.on('call', async (call) => {
      console.log("on call", stream.id);
      call.answer(stream);
      call.on('stream', remoteStream => {
        if (remoteVideoEl) {
          remoteVideoEl.srcObject = remoteStream;
        }
      });
    });
  });

  return (
    <div class="fixed inset-0 z-50">
      <div class="absolute inset-0 bg-black flex items-center justify-center">
        <video ref={remoteVideoEl} muted={false} autoplay={true} loop={false} class="object-cover absolute inset-0 w-full height-full" />
      </div>
      <div class="absolute right-5 bottom-5 bg-black flex items-center justify-center overflow-hidden rounded w-32 h-32">
        <video ref={localVideoEl} muted={true} autoplay={true} loop={false} class="object-cover absolute inset-0 w-full height-full" />
      </div>
    </div>
  )
}
