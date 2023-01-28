import { IMessage } from "../../../models/message.interface"
import clsx from 'clsx';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { createMemo } from "solid-js";

dayjs.extend(calendar);

interface IProps {
    message: IMessage,
    peerName: string;
}

export default function SingleMessage({ message, peerName }: IProps) {

    const sentDate = createMemo(() => dayjs().calendar(dayjs(message.sendDate)));

    return (
        <div class={clsx("flex items-center mt-5", {
            "justify-end": message.senderId === peerName
        })}>
            <div class="flex flex-col items-start">
                <p class="p-3 rounded-full bg-gray-100 text-sm">{message.content}</p>
                <p class="text-xs opacity-60 mt-1">{sentDate}</p>
            </div>
        </div>
    )
}
