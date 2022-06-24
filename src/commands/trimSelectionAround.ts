import * as vsc from "vscode";

export default function trimSelectionAround(tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, ...args: any[]) {
	const 
		doc  = tEditor.document,
		opts = tEditor.options,
		EOL  = ["", "\n", "\r\n"][doc.eol],
		TAB  = opts.insertSpaces && typeof opts.tabSize === "number" ? 
		" ".repeat(opts.tabSize) : "\t";
	
	tEditor.edit((edit) => {
		for (let sel of tEditor.selections) {
			edit.replace(sel, doc.getText(sel).trim());
		}
	});
}