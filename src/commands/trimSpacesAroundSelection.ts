import * as vsc from "vscode";

export default function trimSpacesAroundSelection(tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, ...args: any[]) {
	const 
		doc  = tEditor.document,
		opts = tEditor.options,
		EOL  = ["", "\n", "\r\n"][doc.eol],
		TAB  = opts.insertSpaces && typeof opts.tabSize === "number" ? 
		" ".repeat(opts.tabSize) : "\t",
		newSelections: vsc.Selection[] = [];
	
	tEditor.edit((edit) => {
		for (let sel of tEditor.selections) {
			const range = invadeSpacesAround(doc, sel);
			edit.replace(range, " " + doc.getText(range).trim() + " ");
			const newSel = sel.isReversed ? 
				new vsc.Selection(range.end, range.start) :
				new vsc.Selection(range.start, range.end);
			newSelections.push(newSel);
		}
		tEditor.selections = newSelections;
	});
}

function invadeSpacesAround(doc: vsc.TextDocument, range: vsc.Range): vsc.Range {
	const
		text = doc.getText(),
		given = {
			startOffset: doc.offsetAt(range.start),
			endOffset: doc.offsetAt(range.end),
		},
		calc = {...given};
	let i = 0, nextI = 0;

	nextI = given.startOffset - 1;
	while (text[i = nextI--]) {
		if (text[i].match(/\s/)) {
			calc.startOffset = i;
		} else {
			break;
		}
	}

	nextI = given.endOffset;
	while (text[i = nextI++]) {
		if (text[i].match(/\s/)) {
			continue;
		} else {
			calc.endOffset = i;
			break;
		}
	}

	const 
		startP = doc.positionAt(calc.startOffset),
		endP = doc.positionAt(calc.endOffset);
	
	return new vsc.Range(startP, endP);
}