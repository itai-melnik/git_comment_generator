import * as vscode from 'vscode';
import { GitService } from './gitService';
import { LLMService } from './llmService';
import { CommitFormatter } from './commitFormatter';
import { ConfigManager } from './config';

let configManager: ConfigManager;
let gitService: GitService;
let commitFormatter: CommitFormatter;

export function activate(context: vscode.ExtensionContext) {
    console.log('Git Commit Generator extension is now active');

    // Initialize services
    configManager = new ConfigManager(context);
    gitService = new GitService();
    commitFormatter = new CommitFormatter();

    // Register the generate commit message command
    const generateCommand = vscode.commands.registerCommand(
        'gitCommentGenerator.generateCommitMessage',
        async () => {
            await generateCommitMessage();
        }
    );

    // Register the change API key command
    const changeApiKeyCommand = vscode.commands.registerCommand(
        'gitCommentGenerator.changeApiKey',
        async () => {
            await configManager.promptForNewApiKey();
        }
    );

    // Register the reset API key command
    const resetApiKeyCommand = vscode.commands.registerCommand(
        'gitCommentGenerator.resetApiKey',
        async () => {
            const confirm = await vscode.window.showWarningMessage(
                'Are you sure you want to delete your stored API key?',
                'Yes', 'No'
            );
            
            if (confirm === 'Yes') {
                await configManager.deleteApiKey();
                vscode.window.showInformationMessage('API key deleted successfully');
            }
        }
    );

    context.subscriptions.push(generateCommand, changeApiKeyCommand, resetApiKeyCommand);
}

async function generateCommitMessage() {
    try {
        // Show progress indicator
        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: 'Generating commit message...',
                cancellable: false
            },
            async (progress) => {
                // Step 1: Get staged changes
                progress.report({ message: 'Reading staged changes...' });
                const diff = await gitService.getStagedChanges();

                // Step 2: Ensure API key is configured
                progress.report({ message: 'Checking configuration...' });
                const apiKey = await configManager.ensureApiKeyConfigured();
                const provider = configManager.getApiProvider();
                const model = configManager.getModel();

                // Step 3: Generate commit message using LLM
                progress.report({ message: 'Generating message with AI...' });
                const llmService = new LLMService(provider, apiKey, model);
                const rawMessage = await llmService.generateCommitMessage(diff);

                // Step 4: Format the message
                progress.report({ message: 'Formatting message...' });
                const formattedMessage = commitFormatter.formatMessage(rawMessage);

                // Step 5: Insert into Source Control commit input
                progress.report({ message: 'Inserting into commit input...' });
                await insertCommitMessage(formattedMessage);

                vscode.window.showInformationMessage(
                    `Commit message generated: ${formattedMessage.substring(0, 50)}${formattedMessage.length > 50 ? '...' : ''}`
                );
            }
        );
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        vscode.window.showErrorMessage(`Failed to generate commit message: ${errorMessage}`);
        console.error('Error generating commit message:', error);
    }
}

async function insertCommitMessage(message: string) {
    // Get the Git extension
    const gitExtension = vscode.extensions.getExtension('vscode.git');
    
    if (!gitExtension) {
        throw new Error('Git extension not found');
    }

    const git = gitExtension.isActive ? gitExtension.exports : await gitExtension.activate();
    const api = git.getAPI(1);

    if (api.repositories.length === 0) {
        throw new Error('No Git repository found');
    }

    // Get the first repository (can be enhanced for multiple repos)
    const repo = api.repositories[0];
    
    // Set the commit message in the input box
    repo.inputBox.value = message;

    // Focus on the Source Control view
    await vscode.commands.executeCommand('workbench.view.scm');
}

export function deactivate() {
    // Cleanup if needed
}

