import * as vsc from 'vscode';
// import splitBy from './commands/splitBy';
import splitByComa from './commands/splitByComa';
import splitBySemicolon from './commands/splitBySemicolon';
import trimSelectionAround from './commands/trimSelectionAround';
import tripleSplit from './commands/tripleSplit';

export function activate(context: vsc.ExtensionContext) {
	const commands = [
		/* vsc.commands.registerCommand('advanced-edit.helloWorld', () => {
			vsc.window.showInformationMessage('Hello World from advanced-edit!');
		}), */
		// vsc.commands.registerTextEditorCommand("advanced-edit.splitBy", splitBy),
		vsc.commands.registerTextEditorCommand("advanced-edit.splitByComa", splitByComa),
		vsc.commands.registerTextEditorCommand("advanced-edit.splitBySemicolon", splitBySemicolon),
		vsc.commands.registerTextEditorCommand("advanced-edit.trimSelectionAround", trimSelectionAround),
		vsc.commands.registerTextEditorCommand("advanced-edit.tripleSplit", tripleSplit),
	];

	context.subscriptions.push(...commands);
}
export function deactivate() {}
