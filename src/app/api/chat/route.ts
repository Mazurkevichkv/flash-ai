import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
    // Extract the `messages` from the body of the request
    const { messages } = await req.json()

    const systemMessage = {
        role: 'system',
        content: `Take the text provided by user and extract all the spanish words. 
        Omit repetitions. Categorize words by part of speech. Return response in this format: c:w:t|c:w:t.
        c - category, w - word, t - translation and | is delimiter between tokens. Example: interjection:Hola:Hello|verb:casa:house`
    }

    const prompt = messages[messages.length - 1];
    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [systemMessage, prompt]
    })
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response)
    // Respond with the stream
    return new StreamingTextResponse(stream)
}