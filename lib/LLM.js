class LLM {
	constructor() {
		this.API_KEY = process.env.API_KEY;
	}

	async llama2Request(prompt, json) {
		const response = await fetch('https://api.runpod.ai/v2/llama2-13b-chat/runsync', {
			method: "POST",
			headers: {
				'accept': 'application/json',
				'authorization': this.API_KEY,
				'content-type': 'application/json'
			},
			body: JSON.stringify({
			    "input": {
					"prompt": prompt,
					"sampling_params": {
					   "max_tokens": 4096,
					   "n": 1,
					   "frequency_penalty": 0.01,
					   "temperature": 0.95,
					}
			    }
			})
		});
		const result = await response.json()

		const textResponse = result['output']['text'][0]
		if (json) {
			let jsonResponse;
			try {
				jsonResponse = JSON.parse(textResponse)
			} catch(e) {
				console.log("JSON parsing failed")
				console.log(textResponse)
				const indexStart = textResponse.indexOf("{")
				const indexEnd = textResponse.indexOf("}") + 1
				try {
					jsonResponse = JSON.parse(textResponse.slice(indexStart, indexEnd))
				} catch(e) {
					console.log(e)
					jsonResponse = null
				}
			}
			return jsonResponse;
		} else {
			return textResponse;
		}
	}
}

export default LLM