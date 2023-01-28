import { useNavigate, useParams } from "@solidjs/router"
import { createSignal, For } from "solid-js";
import { usePeer } from "../../lib/context/peer-context";
import { IMessage } from "../../models/message.interface";
import { Icon } from '@amoutonbrady/solid-heroicons';
import { phone, videoCamera, paperAirplane, arrowLeft } from '@amoutonbrady/solid-heroicons/outline';
import SingleMessage from "./components/single-message";

export default function DirectsPage() {
    const [message, setMessage] = createSignal<string>("");

    const { pid } = useParams();
    const { connection, setMessages, messages, peer } = usePeer();

    const navigate = useNavigate();

    const handleSendMessage = () => {
        const conn = connection();

        if (!conn) return;

        const payload: IMessage = {
            senderId: localStorage.getItem("id")!,
            sendDate: Date.now().toString(),
            content: message()
        }

        conn.send(JSON.stringify(payload));
        setMessages(prev => ([...prev, payload]));

        setMessage("");
    }

    const handleGoBack = () => {
        navigate("/inbox");
    }

    return (
        <div class="h-screen flex flex-col items-stretch overflow-hidden">
            <div class="px-5 py-3 flex items-center justify-between w-full">
                <div class="flex items-center">
                    <button type="button" class="mr-3" onClick={handleGoBack}>
                        <Icon path={arrowLeft} width={24} height={24} />
                    </button>
                    <h2 class="font-bold text-lg">{pid}</h2>
                </div>
                <div class="flex items-center justify-end">
                    <button type="button" class="ml-4"><Icon path={phone} width={24} height={24} /></button>
                    <button type="button" class="ml-4"><Icon path={videoCamera} width={24} height={24} /></button>
                </div>
            </div>
            <div class="flex-1 flex flex-col align-stretch justify-between p-5 relative overflow-y-auto pb-20">
                <div class="flex-1 flex flex-col items-stretch justify-end mb-5">
                    <For each={messages}>
                        {(message) => (
                            <SingleMessage message={message} peerName={peer()?.id ?? ""} />
                        )}
                    </For>
                </div>
                <div class="fixed bottom-0 left-0 right-0 bg-white p-5">
                    <div class="flex items-center justify-between p-3 border rounded-full border-gray-200">
                        <input type="text" name="message" autocomplete="off" placeholder="Message..." value={message()} onInput={(e) => setMessage(e.currentTarget.value)} class="flex-1 focus:outline-none" />
                        <button type="button" onClick={handleSendMessage} class="transform rotate-90">
                            <Icon path={paperAirplane} width={24} height={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
