import Peer,{ DataConnection } from "peerjs";
import { Accessor,createContext,createSignal,Setter,useContext } from "solid-js";
import { createStore,SetStoreFunction } from "solid-js/store";
import { IMessage } from "../../models/message.interface";

export interface IPeerContext {
    peer: Accessor<Peer | null>;
    connection: Accessor<DataConnection | null>;
    setPeer: Setter<Peer>;
    setConnection: Setter<DataConnection>;
    messages: IMessage[],
    setMessages: SetStoreFunction<IMessage[]>
}

const PeerContext = createContext<IPeerContext>();

export function PeerProvider(props) {
    const [peerConn,setPeerConn] = createSignal<Peer | null>(props.peer);
    const [connection,setConnection] = createSignal<DataConnection | null>(null);
    const [messages,setMessages] = createStore<IMessage[]>([]);

    return (
        <PeerContext.Provider value={{ peer: peerConn,setPeer: setPeerConn,connection,setConnection,messages,setMessages }}>
            {props.children}
        </PeerContext.Provider>
    )
}

export const usePeer = () => useContext(PeerContext)!;
