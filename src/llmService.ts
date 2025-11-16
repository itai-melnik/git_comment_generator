import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface LLMProvider {
    generateCommitMessage(diff: string): Promise<string>;
}

export class OpenAIProvider implements LLMProvider {
    private client: OpenAI;
    private model: string;

    constructor(apiKey: string, model: string = 'gpt-3.5-turbo') {
        this.client = new OpenAI({ apiKey });
        this.model = model;
    }

    async generateCommitMessage(diff: string): Promise<string> {
        const prompt = this.buildPrompt(diff);
        
        const response = await this.client.chat.completions.create({
            model: this.model,
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant that generates concise, meaningful commit messages following the Conventional Commits specification.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 100
        });

        const message = response.choices[0]?.message?.content?.trim();
        if (!message) {
            throw new Error('Failed to generate commit message from OpenAI');
        }

        return message;
    }

    private buildPrompt(diff: string): string {
        return `Generate a commit message following the Conventional Commits format for the following git diff.

The format should be: type(scope): description

Where type is one of: feat, fix, docs, style, refactor, test, chore, perf, ci, build
The scope is optional.
The description should be concise and in lowercase.

Git diff:
\`\`\`
${diff}
\`\`\`

Respond with ONLY the commit message, nothing else.`;
    }
}

export class GeminiProvider implements LLMProvider {
    private client: GoogleGenerativeAI;
    private model: string;

    constructor(apiKey: string, model: string = 'gemini-pro') {
        this.client = new GoogleGenerativeAI(apiKey);
        this.model = model;
    }

    async generateCommitMessage(diff: string): Promise<string> {
        const prompt = this.buildPrompt(diff);
        
        const model = this.client.getGenerativeModel({ model: this.model });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const message = response.text().trim();

        if (!message) {
            throw new Error('Failed to generate commit message from Gemini');
        }

        return message;
    }

    private buildPrompt(diff: string): string {
        return `Generate a commit message following the Conventional Commits format for the following git diff.

The format should be: type(scope): description

Where type is one of: feat, fix, docs, style, refactor, test, chore, perf, ci, build
The scope is optional.
The description should be concise and in lowercase.

Git diff:
\`\`\`
${diff}
\`\`\`

Respond with ONLY the commit message, nothing else.`;
    }
}

export class LLMService {
    private provider: LLMProvider;

    constructor(providerType: 'openai' | 'gemini', apiKey: string, model: string) {
        if (providerType === 'openai') {
            this.provider = new OpenAIProvider(apiKey, model);
        } else {
            this.provider = new GeminiProvider(apiKey, model);
        }
    }

    async generateCommitMessage(diff: string): Promise<string> {
        // Truncate diff if it's too long (keep first 4000 characters to stay within token limits)
        const truncatedDiff = diff.length > 4000 ? diff.substring(0, 4000) + '\n... (truncated)' : diff;
        return await this.provider.generateCommitMessage(truncatedDiff);
    }
}

