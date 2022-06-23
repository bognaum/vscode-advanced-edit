import * as vsc from 'vscode';
export function activate(context: vsc.ExtensionContext) {
	const commands = [
		vsc.commands.registerCommand('split-by.helloWorld', () => {
			vsc.window.showInformationMessage('Hello World from split-by!');
		})
	];

	context.subscriptions.push(...commands);
}
export function deactivate() {}
