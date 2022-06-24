import * as vsc from "vscode";
import splitBy from "./splitBy";

export default function splitByComa(tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, ...args: any[]) {
	splitBy(tEditor, edit, ",\\s*");
}