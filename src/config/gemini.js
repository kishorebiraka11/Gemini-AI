const APIKEY = "AIzaSyC2eVx-f4ReeWgSoZ162zi5OoRtBrmOzK8";

import {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = APIKEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
	model: "gemini-1.5-flash",
});

const generationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 64,
	maxOutputTokens: 8192,
	responseMimeType: "text/plain",
};

async function runChat(prompt) {
	const chatSession = model.startChat({
		generationConfig,
		// safetySettings: Adjust safety settings
		// See https://ai.google.dev/gemini-api/docs/safety-settings
		history: [],
	});

	const result = await chatSession.sendMessage(prompt);
	console.log(result.response.text(), "helloworld");
    return result.response.text()
}

export default runChat;
