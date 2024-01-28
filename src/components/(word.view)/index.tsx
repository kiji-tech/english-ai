'use client';
import { Word } from '@/entities/result';

type WordViewProps = {
    words: Word[];
};
export default function WordView({ words = [] }: WordViewProps) {
    console.dir(words);
    return (
        <div>
            {words.map((w, index) => {
                return (
                    <div key={w.word}>
                        {w.word}：{w.mean}
                    </div>
                );
            })}
        </div>
    );
}
