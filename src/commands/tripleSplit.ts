import * as vsc from 'vscode';

export default function tripleSplit(
	tEditor: vsc.TextEditor, 
	edit: vsc.TextEditorEdit, 
	...args: any[]
) {
	const 
		doc  = tEditor.document,
		opts = tEditor.options,
		EOL  = ["", "\n", "\r\n"][doc.eol],
		selects: vsc.Selection[]    = [],
		offsets: [number, number][] = [];
	const TAB  = opts.insertSpaces && typeof opts.tabSize === "number" ? 
		" ".repeat(opts.tabSize) : "\t";

	tEditor.edit((edit) => {
		for (const sel of tEditor.selections) {
			const 
				startLine    = doc.lineAt(sel.start),
				indent       = (startLine.text.match(/^\s*/) || [""])[0],
				beforeSel    = EOL + indent + TAB,
				selectedText = doc.getText(sel),
				selTextAsLines = selectedText.split(EOL),
				afterSel     = EOL+indent;

			const resultText = 
				beforeSel + selTextAsLines.join(EOL + TAB) + afterSel;

			/* const resultText = 
				selTextAsLines.map(v => EOL + indent + TAB + v.trimStart()).join() 
					+ EOL + indent; */
			edit.replace(sel, resultText);
			offsets.push([(EOL + indent + TAB).length, -(EOL + indent).length]);
		}
	})
	.then((ok) => {
		if (ok) {
			for (const [k,sel] of tEditor.selections.entries()) {
				const 
					start = doc.positionAt(doc.offsetAt(sel.start) + offsets[k][0]),
					end   = doc.positionAt(doc.offsetAt(sel.end)   + offsets[k][1]);
				selects.push(new vsc.Selection(start, end));
			}
			tEditor.selections = selects;
		}
	});
}