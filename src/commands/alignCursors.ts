import * as vsc from 'vscode';

export default function alignCursors (tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, args: any[]) {
	const cellNumbers = [];

	for (const sel of tEditor.selections) {
		cellNumbers.push(sel.end.character);
	}

	const max = Math.max(... cellNumbers);
	
	for (const [k, sel] of tEditor.selections.entries()) {
		edit.insert(sel.start, " ".repeat(max - cellNumbers[k]));
	}
}