import type { APIRoute } from "astro";
import { streamText, convertToCoreMessages } from "ai";
import aboutMe from "../../utils/aboutMe";
import { validateMessageContent } from "../../utils/sanitize";
import { createAnthropic } from "@ai-sdk/anthropic";

export const prerender = false;

const anthropic = createAnthropic({
	apiKey: import.meta.env.ANTHROPIC_API_KEY,
});

export const POST: APIRoute = async ({ request }) => {
	try {
		const { messages } = await request.json();

		if (!Array.isArray(messages)) {
			return new Response(JSON.stringify({ error: "Invalid messages format" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		for (const message of messages) {
			if (message.role === "user" && !validateMessageContent(message.content)) {
				return new Response(JSON.stringify({ error: "Invalid message content" }), {
					status: 400,
					headers: { "Content-Type": "application/json" },
				});
			}
		}

		const result = streamText({
			model: anthropic("claude-3-5-haiku-20241022"),
			system: aboutMe(),
			temperature: 0.5,
			messages: convertToCoreMessages(messages),
		});

		return result.toDataStreamResponse();
	} catch (error) {
		return new Response(JSON.stringify({ error: "Internal server error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};
