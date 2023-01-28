import Peer from "peerjs";
import { For,onMount,Show } from "solid-js";
import { useNavigate,A } from '@solidjs/router';
import { usePeer } from "../../lib/context/peer-context";
import NewMessageModal from "./components/new-message-modal";
import {Icon} from '@amoutonbrady/solid-heroicons';
import {chevronRight} from '@amoutonbrady/solid-heroicons/outline';

export default function InboxPage() {
    const { peer,setPeer,setConnection,contacts} = usePeer();

    const navigate = useNavigate();

    onMount(async () => {
        if (!localStorage.getItem("id")) {
            navigate("/register",{ replace: false });
        }
        else {
            let p: Peer | null = null;
            if (peer() !== null) {
                p = peer();
            }
            else {
                p = new Peer(localStorage.getItem("id")!);
            }

            if (!p) return;

            setPeer(p);

            p.on("connection",conn => {
                setConnection(conn);

                p!.on('call', call => {
                    navigator.mediaDevices.getUserMedia({video: true,audio: true}).then(stream => {
                        call.answer(stream);
                        call.on('stream', remoteStream => {
                            console.log("getting stream");
                        });
                    }).catch(e => console.log(e));
                });
            });
        }
    });

    return (
        <div class="h-screen">
            <div class="flex flex-col px-5 py-3 border-b border-gray-200">
                <div class="flex items-center justify-between">
                    <h2 class="font-bold text-xl">{peer()?.id}</h2>
                    <NewMessageModal peer={peer} />
                </div>
                <input type="text" name="search" placeholder="Search"
                    class="bg-gray-200 mt-5 rounded py-1 px-2"
                />
            </div>
            <div class="p-5 flex-1">
                <Show when={contacts.length > 0}>
                    <For each={contacts}>
                        {(contact) => <A href={`/directs/${contact}`} class="flex items-center justify-between mb-5 font-medium">
                            {contact}
                            <Icon path={chevronRight} width={18} height={18} />
                        </A>}
                    </For>
                </Show>
                <Show when={contacts.length === 0}>
                    <h4 class="font-medium opacity-60 text-xl text-center">No Messages</h4>
                </Show>
            </div>
        </div>
    )
}
