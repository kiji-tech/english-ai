'use client';
import { AiFillAudio } from 'react-icons/ai';
import styles from './audio.button.module.scss';
import { handleSpeech } from '@/utils/common.util';
import { useCallback, useState } from 'react';

type AudioButtonProps = {
    text: string;
    lang?: 'es-US' | 'jp';
    rate?: number;
};
const AudioButton = ({ text, lang = 'es-US', rate = 1.0 }: AudioButtonProps) => {
    const [isSpeech, setIsSpeech] = useState(false);

    const onClick = useCallback(async () => {
        if (!isSpeech) {
            setIsSpeech(true);
            await handleSpeech(text, rate, lang);
            setIsSpeech(false);
        }
    }, [isSpeech]);

    return <AiFillAudio className={styles.audioButton} onClick={onClick} />;
};
export default AudioButton;
