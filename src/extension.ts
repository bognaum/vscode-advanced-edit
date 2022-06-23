import * as vsc from 'vscode';
import splitBy from './commands/splitBy';

export function activate(context: vsc.ExtensionContext) {
	const commands = [
		vsc.commands.registerCommand('split-by.helloWorld', () => {
			vsc.window.showInformationMessage('Hello World from split-by!');
		}),
		vsc.commands.registerTextEditorCommand("splitBy.splitBy", splitBy)
	];

	context.subscriptions.push(...commands);
}
export function deactivate() {}
