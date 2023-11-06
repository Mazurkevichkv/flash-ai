import { OpenAIStream, StreamingTextResponse } from "ai";
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai-edge";
import { TokenCompletionMode } from "@/types";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { prompt, mode } = await req.json();

  const modeMessage = {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content:
      mode === TokenCompletionMode.DETAILED_INFO
        ? `Please provide short grammar explanation and example ( not more than 3 ) of usage for given Spanish word`
        : mode === TokenCompletionMode.TOKEN_GENERATION
        ? `Take the text provided by user and extract all the spanish words one by one. Omit repetitions. Translation should include up to 3 different translations separated by coma. Return response in this format: c:w:t|c:w:t. c - category, w - word, t - translation (up to 3) and | is delimiter between tokens. Example: interjection:Hola:Hello|adjective:comido:eaten, taken.`
        : "",
  };

  const messages = [
    modeMessage,
    { role: ChatCompletionRequestMessageRoleEnum.User, content: prompt },
  ];

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
