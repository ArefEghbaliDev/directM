import { useNavigate } from "@solidjs/router";
import Peer from "peerjs";
import { Accessor, createSignal, Show } from "solid-js"
import { usePeer } from "../../../lib/context/peer-context";
import { Icon } from '@amoutonbrady/solid-heroicons';
import { plus } from '@amoutonbrady/solid-heroicons/outline';

interface IProps {
    peer: Accessor<Peer | null>;
}

export default function NewMessageModal({ peer }: IProps) {
    const [userId, setUserId] = createSignal<string>("");
    const [show, setShow] = createSignal<boolean>(false);

    const { setConnection, connection } = usePeer();
    const navigate = useNavigate();

    const handleConnect = () => {

    console.log("new message",connection());

        if (connection()) {
            navigate(`/directs/${userId()}`);
        }
        else {
            const p = peer();
            if (!p) return;

            const conn = p.connect(userId());

            setConnection(conn);

            console.log("connection new", conn);

            conn.on("open", () => {
                navigate(`/directs/${userId()}`);
            });
        }
    }

    const handleToggleShow = () => {
        setShow(prev => !prev);
    }

    return (
        <>
            <button type="button" onClick={handleToggleShow}>
                <Icon path={plus} stroke="#333" width={24} height={24} />
            </button>
            <Show when={show()}>
                <div class="bg-black opacity-20 fixed inset-0 z-10" onClick={handleToggleShow}></div>
                <div class="bg-white fixed bottom-0 left-0 right-0 p-5 z-20">
                    <h4 class="font-medium text-lg text-center">New Message</h4>
                    <div class="flex items-stretch justify-end flex-col">
                        <label class="mt-8">To</label>
                        <input type="text" name="to" placeholder="User ID to message" value={userId()}
                            onInput={(e) => setUserId(e.currentTarget.value)} class="mt-3 focus:outline-none" />
                        <button type="button" onClick={handleConnect}
                            class="bg-blue-500 text-white px-3 py-2 rounded mt-5"
                        >Message</button>
                    </div>
                </div>
            </Show>
        </>
    )
}
