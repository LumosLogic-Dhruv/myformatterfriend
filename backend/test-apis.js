const { GoogleGenerativeAI } = require("@google/generative-ai");
const OpenAI = require('openai');
require('dotenv').config();

async function testAPIs() {
  console.log('=== API KEY TEST ===');
  console.log('GEMINI_API_KEY exists:', !!process.env.GEMINI_API_KEY);
  console.log('OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
  console.log('GEMINI_API_KEY format:', process.env.GEMINI_API_KEY?.substring(0, 10) + '...');
  
  // Test Gemini
  if (process.env.GEMINI_API_KEY) {
    try {
      console.log('\n=== TESTING GEMINI ===');
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const result = await model.generateContent("Say hello");
      console.log('Gemini SUCCESS:', result.response.text().substring(0, 50));
    } catch (error) {
      console.log('Gemini FAILED:', error.message);
    }
  }
  
  // Test OpenAI
  if (process.env.OPENAI_API_KEY) {
    try {
      console.log('\n=== TESTING OPENAI ===');
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Say hello' }],
        max_tokens: 10
      });
      
      console.log('OpenAI SUCCESS:', completion.choices[0]?.message?.content);
    } catch (error) {
      console.log('OpenAI FAILED:', error.message);
    }
  }
}

testAPIs();