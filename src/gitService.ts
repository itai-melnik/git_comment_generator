import * as vscode from 'vscode';

export interface GitExtension {
    getAPI(version: 1): GitAPI;
}

export interface GitAPI {
    repositories: Repository[];
}

export interface Repository {
    state: RepositoryState;
    diffIndexWithHEAD(path: string): Promise<string>;
    diffIndexWith(ref: string, path: string): Promise<string>;
}

export interface RepositoryState {
    indexChanges: Change[];
    workingTreeChanges: Change[];
}

export interface Change {
    uri: vscode.Uri;
    status: number;
    originalUri?: vscode.Uri;
}

export class GitService {
    private gitExtension: GitExtension | undefined;

    constructor() {
        this.initializeGitExtension();
    }

    private initializeGitExtension(): void {
        const extension = vscode.extensions.getExtension<GitExtension>('vscode.git');
        if (extension) {
            this.gitExtension = extension.isActive ? extension.exports : undefined;
            if (!this.gitExtension && !extension.isActive) {
                extension.activate().then((exports) => {
                    this.gitExtension = exports;
                });
            }
        }
    }

    private getRepository(): Repository | undefined {
        if (!this.gitExtension) {
            throw new Error('Git extension is not available');
        }

        const api = this.gitExtension.getAPI(1);
        if (api.repositories.length === 0) {
            throw new Error('No Git repository found in workspace');
        }

        // Return the first repository (or could be enhanced to handle multiple repos)
        return api.repositories[0];
    }

    async getStagedChanges(): Promise<string> {
        const repo = this.getRepository();
        if (!repo) {
            throw new Error('No Git repository found');
        }

        const stagedChanges = repo.state.indexChanges;
        
        if (stagedChanges.length === 0) {
            throw new Error('No staged changes found. Please stage your changes first.');
        }

        // Get diff for all staged files
        const diffs: string[] = [];
        
        for (const change of stagedChanges) {
            try {
                const diff = await repo.diffIndexWithHEAD(change.uri.fsPath);
                if (diff) {
                    diffs.push(diff);
                }
            } catch (error) {
                // For new files, diffIndexWithHEAD might fail, so we'll read the file content
                try {
                    const content = await vscode.workspace.fs.readFile(change.uri);
                    const textContent = Buffer.from(content).toString('utf8');
                    diffs.push(`New file: ${change.uri.fsPath}\n${textContent}`);
                } catch (readError) {
                    console.error(`Failed to get diff for ${change.uri.fsPath}:`, readError);
                }
            }
        }

        if (diffs.length === 0) {
            throw new Error('Could not retrieve diff for staged changes');
        }

        return diffs.join('\n\n');
    }

    getStagedFilesCount(): number {
        const repo = this.getRepository();
        if (!repo) {
            return 0;
        }
        return repo.state.indexChanges.length;
    }
}

