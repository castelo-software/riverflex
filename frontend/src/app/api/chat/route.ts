import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const provider = createOpenAICompatible({
    name: "riverflex",
    baseURL: `${process.env.BACKEND_URL!}/openai/v1`,
    apiKey: process.env.OPENAI_API_KEY!,
  });
  const model = provider.chatModel(process.env.OPENAI_MODEL!);

  const result = streamText({ model, messages });

  return result.toDataStreamResponse();
}
