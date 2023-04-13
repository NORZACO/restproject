const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const myDiv = document.querySelector('body > div > pre:nth-child(3)')
// body > div > pre:nth-child(3)
// const myDivId = myDiv.id;

// console.log(`The ID of myDiv is ${myDivId}.`);

const errorMessage = "ReferenceError: foo is not defined";
const prompt = `Generate a solution to the following error:\n\n${myDiv}`;

async function generateSolution(prompt) {
  const completion = await openai.createCompletion({
    engine: "text-davinci-002",
    prompt: prompt,
    maxTokens: 512,
    temperature: 0.5,
    n: 1,
    stop: "\n\n"
  });

  return completion.data.choices[0].text.trim();
}

async function main() {
  try {
    const solution = await generateSolution(prompt);
    console.log(`Solution: ${solution}`);
  } catch (error) {
    console.error(`OpenAI API error: ${error.message}`);
  }
}

main();
