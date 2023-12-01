import puppeteer from 'puppeteer';

import Prompt from "./Prompt";
import LLM from "./LLM";

class Research {
	constructor(studyTopic, browser, page) {
		this.studyTopic = studyTopic;
		this.prompt = new Prompt()
		this.llm = new LLM()
		this.browser = browser;
		this.page = page;
	}

	async runLoop(keywords, resources) {
		console.log("Searching Query:", keywords)
		console.log("Resources:", resources)
		if (resources.length >= 5) {
			return resources
		}

		await this.page.goto(`https://scholar.google.com/scholar?hl=en&q=${keywords}`)
		
		const resourceTitleElement = await this.page.$("#gs_res_ccl_mid h3 > a")
		const resourceLink = await this.page.evaluate(el => el.getAttribute('href'), resourceTitleElement);
		const resourceTitle = await this.page.evaluate(el => el.innerText, resourceTitleElement);
		
		const resourceDescriptionElement = await this.page.$("#gs_res_ccl_mid .gs_rs")
		const resourceDescription = await this.page.evaluate(el => el.innerText, resourceDescriptionElement);
		
		const resource = {
			resourceTitle,
			resourceLink,
			resourceDescription
		}
		resources.push(resource);

		// get the next keywords
		const keywordPrompt = this.prompt.getAdditionalKeywords(this.studyTopic, resource)
		const newKeywords = await this.llm.llama2Request(keywordPrompt, true)
		if (newKeywords) {
			console.log(newKeywords)
			keywords = newKeywords['search_query']
		} else {
			console.log("Additional Keywords Broke!")
		}

		return this.runLoop(keywords, resources)
	}	
}

export default Research