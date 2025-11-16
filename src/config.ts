import * as vscode from 'vscode';

export class ConfigManager {
    private context: vscode.ExtensionContext;
    private readonly API_KEY_SECRET = 'gitCommentGenerator.apiKey';

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }

    async getApiKey(): Promise<string | undefined> {
        return await this.context.secrets.get(this.API_KEY_SECRET);
    }

    async setApiKey(apiKey: string): Promise<void> {
        await this.context.secrets.store(this.API_KEY_SECRET, apiKey);
    }

    getApiProvider(): 'openai' | 'gemini' {
        const config = vscode.workspace.getConfiguration('gitCommentGenerator');
        return config.get<'openai' | 'gemini'>('apiProvider', 'openai');
    }

    getModel(): string {
        const config = vscode.workspace.getConfiguration('gitCommentGenerator');
        const provider = this.getApiProvider();
        const defaultModel = provider === 'openai' ? 'gpt-3.5-turbo' : 'gemini-pro';
        return config.get<string>('model', defaultModel);
    }

    async deleteApiKey(): Promise<void> {
        await this.context.secrets.delete(this.API_KEY_SECRET);
    }

    async ensureApiKeyConfigured(): Promise<string> {
        let apiKey = await this.getApiKey();
        
        if (!apiKey) {
            const provider = this.getApiProvider();
            apiKey = await vscode.window.showInputBox({
                prompt: `Enter your ${provider === 'openai' ? 'OpenAI' : 'Google Gemini'} API key`,
                password: true,
                placeHolder: 'API Key',
                ignoreFocusOut: true
            });

            if (!apiKey) {
                throw new Error('API key is required to generate commit messages');
            }

            await this.setApiKey(apiKey);
            vscode.window.showInformationMessage('API key saved securely');
        }

        return apiKey;
    }

    async promptForNewApiKey(): Promise<void> {
        const provider = this.getApiProvider();
        const apiKey = await vscode.window.showInputBox({
            prompt: `Enter your ${provider === 'openai' ? 'OpenAI' : 'Google Gemini'} API key`,
            password: true,
            placeHolder: 'API Key',
            ignoreFocusOut: true
        });

        if (apiKey) {
            await this.setApiKey(apiKey);
            vscode.window.showInformationMessage('API key updated successfully');
        } else {
            vscode.window.showWarningMessage('API key update cancelled');
        }
    }
}

