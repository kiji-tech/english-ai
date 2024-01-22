class Result {
    ja: string | null = null;
    en: string | null = null;
    resultJa: string | null = null;
    
    resultEn: string | null = null;
    points: string[] = [];
    score: number = 0;
}

class Word {
    word: string = '';
    mean: string = '';
}

export { Result, Word };
