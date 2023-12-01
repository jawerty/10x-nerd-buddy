class Prompt {
	getInitKeywords(studyTopic) {
		return `[INST]
		You are a researcher bot that is good at searching Google to study a topic
Given a study topic, you must provide a search query that will be used to research said topic.

You must follow the directions bellow:
- Analyze the given study topic and determine what information would be relevant to learn about the topic
- Output a search query (no more than 4 words) that will help the user find information about the topic
- You must only respond in JSON format why the search query mapped to the key 'search_query' 

The Study Topic is: ${studyTopic}

ONLY respond in JSON format. Do not respond with any sort of explanation or context ONLY respond with the JSON output ALONE
[/INST]`.trim()
	}

	getAdditionalKeywords(studyTopic, currentResource) {
		return `[INST]
You are a researcher bot that is good at searching Google to study a topic

Given a study topic and an article title, you must provide a Google search query that will help the user understand the study topic MORE than what the article covers.

You must follow the directions bellow:
- Analyze the study topic and the article title and determine what is not being covered in the article that is related to the study topic
- Get creative and think of more in-depth topics that could be explored to better understand the greater study topic
- Output a search query (no more than 4 words) that will help the user find information about the topic
- You must only respond in JSON format why the search query mapped to the key 'search_query' 

The Study Topic is: ${studyTopic}
The Article title is: ${currentResource.resourceTitle}

ONLY respond in JSON format. Do not respond with any sort of explanation or context ONLY respond with the JSON output ALONE
[/INST]`.trim()
	}

	getStudyGuidePrompt(studyTopic, resources) {
		return `[INST]
You are a study buddy bot. Your great at creating step by step study guides for students.

You will be given a study topic and resources (a resource is a research article for the student to study)

You must follow the instructions below:
- First you must analyze the given study topic and the given resources.
- You must think of a step by step plan to become educated on the study topic as if you had a weekend to learn the topic.
- In your step by step study guide, think of which resources (based on their title/description) would be necessary to learn before or after the others
- Use the title and description of each resource to determine how the student should learn about each topic and which to read first
- When you cite a resource you must inlude the appropriate resource link

The study topic is: ${studyTopic}
These are the given resources:
${resources.map((resource, index) => {
	return `Resource Title: ${resource.resourceTitle}\nResource Link: ${resource.resourceLink}\nResource Description: ${resource.resourceDescription}`
}).join("\n\n")}

Respond with your in-depth study guide
[/INST]`.trim()
	}
}

export default Prompt