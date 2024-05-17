import { Token } from "./Token"

describe("Token", () => {
	it("tokenize", () => {
		const tokens = Token.tokenize(`{
	"key": "value",
	"bool": true,
	"obj": {
		"pos": 3,
		"decimal": 21.342,
		"neg": -10,
		"negDecimal": -10.0,
		"nll": null,
		"key-with-dash": true,
		"-tricky-key": true,
	}
}`)
		console.log(tokens.map(t => t.toString()))
		expect(tokens).toBeTruthy()
	})
})
