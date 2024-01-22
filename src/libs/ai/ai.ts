import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPEN_AI_SECRET });

export class AI {
    private static instance: AI | undefined;
    public static getInstance() {
        if (!this.instance) this.instance = new AI();
        return this.instance;
    }

    public async run(systemContent: string, userContent: string) {
        if (!systemContent) {
            console.warn('SystemContent is not found.');
            throw new Error('SystemContent is not found.');
        }
        const modelName = process.env.NEXT_PUBLIC_OPEN_AI_MODEL!;
        try {
            const completion = await openai.chat.completions.create({
                messages: [
                    { role: 'system', content: systemContent },
                    {
                        role: 'user',
                        content: userContent,
                    },
                ],
                response_format: { type: 'json_object' },
                model: modelName,
                top_p: 0.9,
            });
            const content = completion.choices[0].message.content;
            if (!content) {
                throw new Error('qa is not found');
            }
            return JSON.parse(content);
        } catch (e) {
            return e;
        }
    }
}
