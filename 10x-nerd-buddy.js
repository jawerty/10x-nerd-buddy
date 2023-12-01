// Research Loop
  // 1) Get keywords (for the search) from the prompt (LLama 2) 
  // 2) Search google scholar
  // 3) Analyze which results are revelant
  // 4) Catalogue the relevant results
  // 5) Find additional keywords to search using the relevant results
  // 6) Go to 2)

// Study Guide prompt
  // Generates a study guide using the research resource

import Research from "./lib/Research";
import Prompt from "./lib/Prompt";
import LLM from "./lib/LLM";

import { setupBrowser } from "./lib/utils";

process.on("SIGINT", () => {
  console.log("FORCE EXIT");
  process.exit(0);
});

async function main() {
  const prompt = new Prompt();
  const llm = new LLM();

  const inputPrompt = "Your Nerd Buddy Prompt: ";
  process.stdout.write(inputPrompt);

  for await (const nerdBuddyPrompt of console) {
    const [browser, page] = await setupBrowser();
    const research = new Research(nerdBuddyPrompt, browser, page);

    const keywordsPrompt = await prompt.getInitKeywords(nerdBuddyPrompt);
    let keywords = await llm.llama2Request(keywordsPrompt, true)

    if (!keywords) {
      keywords = nerdBuddyPrompt
      console.log("Using the user's prompt as the init keywords");
    } else {
      keywords = keywords['search_query']
    }

    // get research items
    const researchItems = await research.runLoop(keywords, []);
    console.log(researchItems)

    // generate study guide
    const studyGuidePrompt = await prompt.getStudyGuidePrompt(nerdBuddyPrompt, researchItems)
    let studyGuide = await llm.llama2Request(studyGuidePrompt, false)
    console.log("\n\n------YOUR STUDY GUIDE-------\n\n")
    console.log(studyGuide)
    console.log(researchItems.map((resource) => {
      return `Resource: ${resource.resourceTitle} (${resource.resourceLink})`
    }).join("\n"))
    break;
  }
}

main()
