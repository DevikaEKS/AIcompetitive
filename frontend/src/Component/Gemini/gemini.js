import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import axios from "axios";
// import { v4 as uuidv4 } from "uuid"; // For generating unique IDs
dotenv.config({ path: "../../../.env" });

const gemini = async (topic) => {
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
        Generate 10 random questions on the topic "${topic}". 
        Each question should be in the following JSON format:
        {
        "id": "unique_question_id", // Unique identifier for the question
        "question": "<p>Question text?</p><p><br></p>",
        "options": [
            {"option": "Option 1", "feedback": "Feedback for Option 1"},
            {"option": "Option 2", "feedback": "Feedback for Option 2"},
            {"option": "Option 3", "feedback": "Feedback for Option 3"},
            {"option": "Option 4", "feedback": "Feedback for Option 4"}
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
        const rawResponse = result.response.text();
        const sanitizedResponse = rawResponse.replace(/```json/g, "").replace(/```/g, "");

        let questions = JSON.parse(sanitizedResponse);
        const response = await axios.post("http://localhost:5000/quiz/addAiQuestion", questions, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log("Questions successfully posted to the server:", response.data);
        // console.log( questions);
    } catch (error) {
        console.error("Error generating content:", error);
    }
};

// Replace 'Trains Aptitude' with the desired topic.
gemini("")

export default gemini;
