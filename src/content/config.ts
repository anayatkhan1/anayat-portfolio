import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const postsCollection = defineCollection({
	loader: glob({pattern: "**/*.mdx", base: "src/content/thoughts"}),
	schema: () =>
		z.object({
			title: z.string(),	
			date: z.coerce.date(),
			excerpt: z.string(),
		}),
});


export const collections = {
	thoughts: postsCollection,
};	
