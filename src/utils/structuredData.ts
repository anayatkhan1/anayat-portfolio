import {
	type Article,
	type Person,
	type WebSite,
	type WithContext,
} from "schema-dts";
import avatar from "../assets/avatar.png";
import evalsCover from "../assets/evals-cover.svg";
import type { CollectionEntry } from "astro:content";

export const thoughtsWebsite: WithContext<WebSite> = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	url: `${import.meta.env.SITE}/thoughts/`,
	name: "Anayat Khan • Thoughts",
	description: "Thoughts, writings from Anayat Khan",
	inLanguage: "en_US",
};

export const mainWebsite: WithContext<WebSite> = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	url: import.meta.env.SITE,
	name: "Anayat Khan",
	description: "Anayat Khan's personal portfolio website",
	inLanguage: "en_US",
};

export const personSchema: WithContext<Person> = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Anayat Khan",
	url: `${import.meta.env.SITE}`,
	image: `${import.meta.env.SITE}${avatar.src}`,
	sameAs: [
		"https://www.twitter.com/anayatkhan09",
		
		"https://www.linkedin.com/in/anayatkhan/",
	],
};

export function getArticleSchema(post: CollectionEntry<"thoughts">) {
	const articleStructuredData: WithContext<Article> = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: post.data.title,
		url: `${import.meta.env.SITE}/thoughts/${post.id}/`,
		image: {
			"@type": "ImageObject",
			url: `${import.meta.env.SITE}${evalsCover.src}`,
		},
		description: post.data.excerpt,
		datePublished: post.data.date.toString(),
		publisher: {
			"@type": "Person",
			name: "Anayat Khan",
			url: import.meta.env.SITE,
			image: import.meta.env.SITE + avatar.src,
		},
		author: {
			"@type": "Person",
			name: "Anayat Khan",
			url: import.meta.env.SITE,
			image: import.meta.env.SITE + avatar.src,
		},
	};
	return articleStructuredData;
}
