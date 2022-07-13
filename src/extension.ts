import * as vsc from 'vscode';
import splitBy                   from './commands/splitBy';
import trimSelectionAround       from './commands/trimSelectionAround';
import trimSpacesAroundSelection from './commands/trimSpacesAroundSelection';
import tripleSplit               from './commands/tripleSplit';
import tripleJoin                from './commands/tripleJoin';
import joinLines                 from './commands/joinLines';
import joinLinesWithSpaces       from './commands/joinLinesWithSpaces';
import joinLinesWithoutSpaces    from './commands/joinLinesWithoutSpaces';
import alignCursors              from './commands/alignCursors';

export function activate(context: vsc.ExtensionContext) {
	const commands = [
		vsc.commands.registerTextEditorCommand("advanced-edit.trimSelectionAround", 
			trimSelectionAround),
		vsc.commands.registerTextEditorCommand("advanced-edit.tripleSplit", 
			tripleSplit),
		vsc.commands.registerTextEditorCommand("advanced-edit.joinLines", 
			joinLines),
		vsc.commands.registerTextEditorCommand("advanced-edit.joinLinesWithSpaces", 
			joinLinesWithSpaces),
		vsc.commands.registerTextEditorCommand("advanced-edit.joinLinesWithoutSpaces", 
			joinLinesWithoutSpaces),
		vsc.commands.registerTextEditorCommand("advanced-edit.trimSpacesAroundSelection", 
			trimSpacesAroundSelection),
		vsc.commands.registerTextEditorCommand("advanced-edit.tripleJoin", 
			tripleJoin),
		vsc.commands.registerTextEditorCommand("advanced-edit.alignCursors", 
			alignCursors),
		vsc.commands.registerTextEditorCommand("advanced-edit.splitByComa", 
			function splitByComa( tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, ) {
				splitBy(tEditor, edit, ",\\s*");
			}
		),
		vsc.commands.registerTextEditorCommand("advanced-edit.splitBySemicolon", 
			function splitSemicolon( tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, ) {
				splitBy(tEditor, edit, ";\\s*");
			}
		),
		vsc.commands.registerTextEditorCommand("advanced-edit.splitBySpace", 
			function splitSpace( tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, ) {
				splitBy(tEditor, edit, "\\s+");
			}
		),
		vsc.commands.registerTextEditorCommand("advanced-edit.splitByPoint", 
			function splitPoint( tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, ) {
				splitBy(tEditor, edit, "\\s*\\.\\s*");
			}
		),
		vsc.commands.registerTextEditorCommand("advanced-edit.splitByGT", 
			function splitGT( tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, ) {
				splitBy(tEditor, edit, ">\\s*");
			}
		),
		vsc.commands.registerTextEditorCommand("advanced-edit.splitByLT", 
			function splitLT( tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, ) {
				splitBy(tEditor, edit, "\\s*<", {eolBefore: true});
			}
		),
	];

	context.subscriptions.push(...commands);
}
export function deactivate() {}
