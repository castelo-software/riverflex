import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { streamText } from "ai";

/**
 * This route handler is used to receive messages submitted by the user from the UI, send them to our backend,
 * and stream the responses back to the UI.
 *
 * The backend where the AI Assistant is implemented provides an OpenAI-compatible API that we can use to interact
 * with it using the ai library.
 *
 * All messages that are part of the conversation are submitted to the model, which makes it possible to work in a
 * stateless manner.
 *
 * @param req Request object containing the messages that are part of the conversation.
 * @returns The response stream that will be sent back to the UI.
 */
export async function POST(req: Request) {
  // Extract the messages from the request body.
  const { messages } = await req.json();

  // Create an OpenAI-compatible provider that will be used to interact with the backend.
  const provider = createOpenAICompatible({
    name: "riverflex",
    baseURL: `${process.env.BACKEND_URL!}/openai/v1`,
    apiKey: process.env.OPENAI_API_KEY!,
  });

  // Create a chat model that will be used to interact with the backend.
  const model = provider.chatModel(process.env.OPENAI_MODEL!);

  // Stream the text to the model and get the response.
  const result = streamText({ model, messages });

  // Return the response stream that will be sent back to
  return result.toDataStreamResponse();
}
