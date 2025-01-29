import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const gemini = async (topic) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
        Generate 10 random questions on the topic "${topic}". 
        Each question should be in the following JSON format:
        {
        "id": "unique_question_id", // Unique identifier for the question
        "question": "<p>Question text?</p><p><br></p>",
        "options": [
            {"option": "Option 1", "feedback": ""},
            {"option": "Option 2", "feedback": ""},
            {"option": "Option 3", "feedback": ""},
            {"option": "Option 4", "feedback": ""}
        ],
        "correctAnswer": "Correct Option Text"
        }

        Make sure:
        1. Each "id" is a unique identifier (e.g., a UUID or incrementing value).
        2. Questions are diverse and relevant to the topic "${topic}".
        3. Correct answers match one of the options provided.
        4. Questions are clear and concise.
        5. feedback is provided for each option based on the correct answer.
        `;

    try {
        const result = await model.generateContent(prompt);
        console.log("Generated Questions:");
        console.log(result.response.text());
    } catch (error) {
        console.error("Error generating content:", error);
    }
};

// Replace 'Percentage' with the desired topic.
gemini("Ratio and Proportion");

export default gemini;
