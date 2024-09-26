import { HfInference } from "@huggingface/inference";
import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

const inference = new HfInference(process.env.HUGGING_FACE_TOKEN);

export const chat = action({
  args: {
    messageBody: v.string(),
    conversation: v.id("conversations"),
  },
  async handler(ctx, args) {
    try {
        console.log(`hf.chat action called with message: ${args.messageBody} for conversation: ${args.conversation}`);
  
        let fullResponse = '';
  
        for await (const chunk of inference.chatCompletionStream({
          model: "mistralai/Mistral-Nemo-Instruct-2407",
          messages: [
            {
              role: "system",
              content: "You are a chatopex bot responding to questions",
            },
            {
              role: "user",
              content: args.messageBody,
            },
          ],
          max_tokens: 200,
        })) {
          const contentChunk = chunk.choices[0]?.delta?.content || "";
          fullResponse += contentChunk;
  
          console.log(`Received chunk: ${contentChunk}`);
        }
  
        // Log the final response before sending the ChatGPT message
        console.log(`Final GPT response: ${fullResponse}`);
  
        await ctx.runMutation(api.messages.sendChatGPTMessage, {
          content: fullResponse,
          conversation: args.conversation,
          messageType: "text",
        });
      } catch (error) {
        console.error("Error in hf.chat action:", error);
      }
    // Store the final response in the conversation once streaming is complete
    // await ctx.db.patch(args.conversation, { fullResponse });
  },
});
