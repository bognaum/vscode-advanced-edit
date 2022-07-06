import * as vsc from "vscode";

export default function joinLinesWithSpaces (
	tEditor: vsc.TextEditor, 
	edit: vsc.TextEditorEdit, 
	...args: any[]
) {
	const 
		doc  = tEditor.document,
		opts = tEditor.options,
		EOL  = ["", "\n", "\r\n"][doc.eol],
		TAB  = opts.insertSpaces && typeof opts.tabSize === "number" ? 
		" ".repeat(opts.tabSize) : "\t",
		re = new RegExp(`\\s*${EOL}\\s*`, "");
	
	tEditor.edit((edit) => {
		for (let sel of tEditor.selections) {
			const 
				text = doc.getText(sel),
				lines = text.split(re),
				newText = lines.join(" ");
			edit.replace(sel, newText);
			// newSelections.push(sel);
		}
	});
}
