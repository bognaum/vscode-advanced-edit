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
		isEmpties: boolean[] = [],
		offsets: [number, number][] = [];
	const TAB  = opts.insertSpaces && typeof opts.tabSize === "number" ? 
		" ".repeat(opts.tabSize) : "\t";

	tEditor.edit((edit) => {
		for (const sel of tEditor.selections) {
			const 
				startLine      = doc.lineAt(sel.start),
				indent         = (startLine.text.match(/^\s*/) || [""])[0],
				beforeSel      = EOL + indent + TAB,
				selectedText   = doc.getText(sel),
				isEmpty        = !selectedText.length,
				selTextAsLines = selectedText.split(EOL),
				afterSel       = EOL+indent;

			const resultText = 
				beforeSel + selTextAsLines.join(EOL + TAB) + afterSel;

			edit.replace(sel, resultText);
			offsets.push([(beforeSel).length, -(afterSel).length]);
			isEmpties.push(isEmpty);
		}
	})
	.then((ok) => {
		if (ok) {
			for (const [k,sel] of tEditor.selections.entries()) {
				const 
					[startOffset, endOffset] = offsets[k],
					isEmpty = isEmpties[k],
					end   = doc.positionAt(doc.offsetAt(sel.end) + endOffset  ),
					start = isEmpty ? 
						end 
						: doc.positionAt(doc.offsetAt(sel.start) + startOffset);
				selects.push(new vsc.Selection(start, end));
			}
			tEditor.selections = selects;
		}
	});
}