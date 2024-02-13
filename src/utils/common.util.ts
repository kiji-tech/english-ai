const handleSpeech = async (text: string, rate = 1.0, lang = 'en-US') => {
    if (!text) return;
    return new Promise<void>((resolve, reject) => {
        if (!window) {
            console.error('window is not found.');
            reject();
        }

        // 発言を設定
        const uttr = new SpeechSynthesisUtterance();
        uttr.text = text;
        uttr.rate = rate;
        uttr.lang = lang;
        uttr.addEventListener('end', () => {
            console.log('end speech');
            resolve();
        });
        // 発言を再生
        window.speechSynthesis.speak(uttr);
    });
};

export { handleSpeech };
