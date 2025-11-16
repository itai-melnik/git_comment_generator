/**
 * Formats and validates commit messages according to Conventional Commits specification
 */
export class CommitFormatter {
    private readonly COMMIT_TYPES = [
        'feat', 'fix', 'docs', 'style', 'refactor', 
        'test', 'chore', 'perf', 'ci', 'build'
    ];

    /**
     * Ensures the message follows Conventional Commits format
     * @param message Raw message from LLM
     * @returns Formatted commit message
     */
    formatMessage(message: string): string {
        // Clean up the message
        let cleaned = message.trim();
        
        // Remove markdown code blocks if present
        cleaned = cleaned.replace(/```[a-z]*\n?/g, '').replace(/```/g, '');
        
        // Extract the first line if multi-line
        const lines = cleaned.split('\n');
        let commitMessage = lines[0].trim();
        
        // Check if it already follows conventional commits format
        const conventionalPattern = /^(feat|fix|docs|style|refactor|test|chore|perf|ci|build)(\(.+?\))?!?:\s*.+/;
        
        if (conventionalPattern.test(commitMessage)) {
            return commitMessage;
        }
        
        // Try to extract type from the beginning
        const typeMatch = commitMessage.match(/^(feat|fix|docs|style|refactor|test|chore|perf|ci|build)/i);
        
        if (typeMatch) {
            const type = typeMatch[1].toLowerCase();
            // Remove the type from the message and clean it up
            let description = commitMessage.substring(type.length).trim();
            
            // Remove common separators
            description = description.replace(/^[:\-\s]+/, '').trim();
            
            // Ensure lowercase start
            if (description.length > 0) {
                description = description.charAt(0).toLowerCase() + description.slice(1);
            }
            
            return `${type}: ${description}`;
        }
        
        // If no type found, default to 'chore'
        // Ensure lowercase start
        if (commitMessage.length > 0) {
            commitMessage = commitMessage.charAt(0).toLowerCase() + commitMessage.slice(1);
        }
        
        return `chore: ${commitMessage}`;
    }

    /**
     * Validates if a message follows Conventional Commits format
     * @param message Commit message to validate
     * @returns true if valid, false otherwise
     */
    isValid(message: string): boolean {
        const pattern = /^(feat|fix|docs|style|refactor|test|chore|perf|ci|build)(\(.+?\))?!?:\s*.+/;
        return pattern.test(message.trim());
    }
}

