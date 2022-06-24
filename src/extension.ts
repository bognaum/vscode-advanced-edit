import * as vsc from 'vscode';
// import splitBy from './commands/splitBy';
import splitByComa from './commands/splitByComa';
import splitBySemicolon from './commands/splitBySemicolon';

export function activate(context: vsc.ExtensionContext) {
	const commands = [
		/* vsc.commands.registerCommand('jttss.helloWorld', () => {
			vsc.window.showInformationMessage('Hello World from jttss!');
		}), */
		// vsc.commands.registerTextEditorCommand("jttss.splitBy", splitBy),
		vsc.commands.registerTextEditorCommand("jttss.splitByComa", splitByComa),
		vsc.commands.registerTextEditorCommand("jttss.splitBySemicolon", splitBySemicolon)
	];

	context.subscriptions.push(...commands);
}
export function deactivate() {}
