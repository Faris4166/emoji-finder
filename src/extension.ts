import * as vscode from 'vscode';

const emojiList: Record<string, string> = {
    happy: "😄",
    sad: "😢",
    love: "❤️",
    fire: "🔥",
    coffee: "☕",
    idea: "💡"
};

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('emoji-finder.findEmoji', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found!');
            return;
        }

        const keyword = await vscode.window.showInputBox({
            prompt: 'Search for emoji (e.g. happy, sad, fire)',
        });

        if (!keyword) {
            return;
        }

        const emoji = emojiList[keyword.toLowerCase()];
        if (!emoji) {
            vscode.window.showWarningMessage('Emoji not found!');
            return;
        }

        // Insert emoji at current cursor position
        editor.edit(editBuilder => {
            const selections = editor.selections;
            selections.forEach(selection => {
                if (selection.isEmpty) {
                    editBuilder.insert(selection.start, emoji);
                } else {
                    editBuilder.replace(selection, emoji);
                }
            });
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
