import { Icon } from '@amoutonbrady/solid-heroicons';
import { videoCamera } from '@amoutonbrady/solid-heroicons/outline';
import { ECallStatus, usePeer } from '../../../lib/context/peer-context';

export default function VideoCall() {

    const { setCallStatus } = usePeer();

    const handleCall = async () => {
        setCallStatus(ECallStatus.CALLING);
    }

    return (
        <>
            <button type="button" class="ml-4 relative z-30" onClick={handleCall}><Icon path={videoCamera} width={24} height={24} /></button>
        </>
    )
}
