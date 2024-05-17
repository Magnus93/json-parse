import { Position } from "../Position"
import { Range } from "../Range"
/*
 {
	 "key": "value",
	 "num": 2,
	 "numDecimal": 1.23,
	 "bool": true,
	 "falsy": false,
	 "obj": {
		 "undef": undefined,
		 "nll": null,
		 "objNested": {
				"longString": "A \"Escape\"!\n and a new Line.",
				"empty": {},
		 }
	 }
 }

WhiteSpace
 TAB
 SPACE
 NEWLINE
Symbol
 OPEN/CLOSED BRACKET {}
 COLON :
 COMMA ,
 QUOTATION "
text
number
 */

export class Token {
	constructor(
		readonly type: "whitespace" | "symbol" | "text" | "number",
		readonly content: string,
		readonly range: Range
	) {}

	private append(character: string): Token {
		return new Token(this.type, this.content + character, this.range)
	}
	merge(token: Token | undefined): Token {
		return !token ? this : new Token(this.type, this.content + token.content, Range.merge(this.range, token.range))
	}
	toString() {
		return this.content
	}
	static tokenize(source: string) {
		const tokens: Token[] = []
		let last: Token | undefined
		let start = { row: 0, column: 0 }
		for (const character of source) {
			const type = characterType(character)
			if (last && type == last.type && (type == "whitespace" || type == "text" || type == "number"))
				last = last.append(character)
			else {
				if (last)
					tokens.push(last)
				last = new Token(type, character, { start, end: Position.add(start, character) })
			}
			start = last.range.end
		}
		last && tokens.push(last)
		return tokens
	}
}

function characterType(character: string): Token["type"] {
	return character.match(/\s/)
		? "whitespace"
		: character.match(/[{}:/"=?!,.-]/)
		? "symbol"
		: character.match(/[\d]/g)
		? "number"
		: "text"
}
