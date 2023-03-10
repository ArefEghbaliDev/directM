import Peer, { DataConnection } from "peerjs";
import { Accessor, createContext, createEffect, createSignal, Setter, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { IMessage } from "../../models/message.interface";

export enum ECallStatus {
    IDLE,
    CALLING,
    INCALL
}
export interface IPeerContext {
    peer: Accessor<Peer | null>;
    connection: Accessor<DataConnection | null>;
    setPeer: Setter<Peer>;
    setConnection: Setter<DataConnection>;
    messages: IMessage[];
    setMessages: SetStoreFunction<IMessage[]>
    contacts: string[];
    setContacts: SetStoreFunction<string[]>
    callStatus: Accessor<ECallStatus>,
    setCallStatus: Setter<ECallStatus>
}

const PeerContext = createContext<IPeerContext>();

export function PeerProvider(props) {
    const [peerConn, setPeerConn] = createSignal<Peer | null>(props.peer);
    const [connection, setConnection] = createSignal<DataConnection | null>(null);
    const [messages, setMessages] = createStore<IMessage[]>([]);
    const [contacts, setContacts] = createStore<string[]>([]);
    const [callStatus, setCallStatus] = createSignal<ECallStatus>(ECallStatus.IDLE);

    createEffect(() => {
        const conn = connection();
        if (!conn) return;

        conn.on("data", async data => {
            if (contacts.includes(conn.peer) === false) {
                setContacts(prev => [...prev, conn.peer]);
            }
            const message: IMessage = JSON.parse(data as string);
            setMessages(prev => ([...prev, message]));
        });
    });

    createEffect(() => {
        const p = peerConn();
        if(!p) return;

        p.on('call', () => {
            setCallStatus(ECallStatus.CALLING);
        });
    });

    return (
        <PeerContext.Provider 
        value={{ peer: peerConn, setPeer: setPeerConn, connection, setConnection, messages, setMessages, contacts, setContacts, callStatus, setCallStatus }}>
            {props.children}
        </PeerContext.Provider>
    )
}

export const usePeer = () => useContext(PeerContext)!;
