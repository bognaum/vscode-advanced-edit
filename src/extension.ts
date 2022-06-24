import * as vsc from 'vscode';
// import splitBy from './commands/splitBy';
import splitByComa from './commands/splitByComa';
import splitBySemicolon from './commands/splitBySemicolon';

export function activate(context: vsc.ExtensionContext) {
	const commands = [
		vsc.commands.registerCommand('split-by.helloWorld', () => {
			vsc.window.showInformationMessage('Hello World from split-by!');
		}),
		// vsc.commands.registerTextEditorCommand("split-by.splitBy", splitBy),
		vsc.commands.registerTextEditorCommand("split-by.splitByComa", splitByComa),
		vsc.commands.registerTextEditorCommand("split-by.splitBySemicolon", splitBySemicolon)
	];

	context.subscriptions.push(...commands);
}
export function deactivate() {}
