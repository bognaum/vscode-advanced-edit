import * as vsc from "vscode";

export default function splitBy(tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, splitter: string) {
	const 
		doc  = tEditor.document,
		opts = tEditor.options,
		EOL  = ["", "\n", "\r\n"][doc.eol],
		TAB  = opts.insertSpaces && typeof opts.tabSize === "number" ? 
		" ".repeat(opts.tabSize) : "\t";
	
	tEditor.edit((edit) => {
		for (let sel of tEditor.selections) {
			const 
				text          = doc.getText(sel),
				firstLineText = doc.lineAt(sel.start.line).text,
				baseIndent    = (firstLineText.match(/^\s*/) || [""])[0],
				re = new RegExp(splitter, "g"),
				splitters = text.match(re) || [],
				splitted      = text.split(re);

			for (const [k, v]of splitted.entries()) {}

			const joiners = splitters.map(v => v + EOL + baseIndent);
			joiners.push("");
			const resultText = splitted
				.map((v, i) =>  v + joiners[i])
				.join("")
				.split(EOL)
				.filter(v => !v.match(/^\s*$/))
				.join(EOL);

			edit.replace(sel, resultText);
		}
	});
}