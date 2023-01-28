import Peer from "peerjs";
import { For, onMount, Show } from "solid-js";
import { useNavigate, A } from '@solidjs/router';
import { usePeer } from "../../lib/context/peer-context";
import { openDB } from "idb";
import { IMessage } from "../../models/message.interface";
import NewMessageModal from "./components/new-message-modal";

export default function InboxPage() {
    const { peer, setPeer, setConnection,setMessages,messages } = usePeer();

    const navigate = useNavigate();

    onMount(async () => {
        if (!localStorage.getItem("id")) {
            navigate("/register", { replace: false });
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

            const db = await openDB("inbox", 1, {
                upgrade(db) {
                    db.createObjectStore('messages')
                }
            });

            p.on("connection", conn => {
                setConnection(conn);
                conn.on("data", async data => {
                    const message: IMessage = JSON.parse(data as string);
                    await db.put('messages', [message], conn.peer);
                    setMessages(prev => ([...prev, message]));
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
                <Show when={messages.length > 0}>
                    <For each={messages}>
                        {(message) => <A href={`/directs/${message.senderId}`}>
                            <p class="font-medium mb-2">{message.senderId}</p>
                            {messages[messages.length - 1].sendDate}
                        </A>}
                    </For>
                </Show>
                <Show when={messages.length === 0}>
                    <h4 class="font-medium opacity-60 text-xl text-center">No Messages</h4>
                </Show>
            </div>
        </div>
    )
}
