import { format } from 'date-fns';
import { serialize } from 'next-mdx-remote/serialize';

import RehypeAutolinkHeadings from 'rehype-autolink-headings';
import RemarkCodeTitles from 'remark-code-titles';
import RemarkEmoji from 'remark-emoji';
import RemarkPrism from 'remark-prism';
import RemarkSlug from 'remark-slug';

import type { FrontMatter, Post, RawFrontMatter } from '~/types';
import { blogs } from '~/data/profile';

/**
 * Get the slugs of all available blog posts
 */
export async function getAllPostSlugs(): Promise<Array<{ slug: string; path: string }>> {
	let responses: Array<{ slug: string; path: string }> = [];
	const response = await fetch(`https://dev.to/api/articles?username=${blogs.devto.username}`);
	if (response.status === 200) {
		const data = (await response.json()) as Array<{ slug: string; path: string }>;
		responses = responses.concat(data.map((d) => ({ slug: d.slug, path: d.path })));
	}
	return responses;
}

/**
 * Get the frontmatter metadata for all available blog posts
 */
export async function getAllPostsFrontMatter(): Promise<Array<FrontMatter>> {
	let responses: Array<FrontMatter> = [];
	const response = await fetch(`https://dev.to/api/articles?username=${blogs.devto.username}`);
	if (response.status === 200) {
		const data = (await response.json()) as Array<{
			title: string;
			description: string;
			slug: string;
			cover_image: string;
			published_at: string;
			path: string;
		}>;
		responses = responses.concat(
			data.map((d) => ({
				slug: d.slug,
				banner_alt: `${d.title} cover image`,
				banner: d.cover_image,
				date: format(new Date(d.published_at), 'PPP'),
				description: d.description,
				banner_show: true,
				description_show: true,
				title: d.title,
				path: d.path,
			})),
		);
	}
	return responses;
}

/**
 * Get the frontmatter metadata & post MDX contents
 * @param {string} slug - Slug / file name of the blog post to load data from
 */
export async function getPost(path: string): Promise<Post> {
	const response = await fetch(`https://dev.to/api/articles${path}`);
	if (response.status !== 200) {
		return null;
	}
	const responseData = (await response.json()) as {
		title: string;
		description: string;
		slug: string;
		cover_image: string;
		published_at: string;
		path: string;
		body_markdown: string;
	};
	const postRawFrontMatter: RawFrontMatter = {
		banner_alt: `${responseData.title} cover image`,
		banner: responseData.cover_image,
		date: format(new Date(responseData.published_at), 'PPP'),
		description: responseData.description,
		banner_show: true,
		description_show: true,
		title: responseData.title,
	};
	return {
		frontmatter: {
			slug: responseData.slug,
			path: responseData.path,
			...postRawFrontMatter,
		},
		source: await serialize(responseData.body_markdown, {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			scope: postRawFrontMatter as Record<string, any>,
			mdxOptions: {
				rehypePlugins: [[RehypeAutolinkHeadings, {}]],
				remarkPlugins: [RemarkCodeTitles, RemarkEmoji, RemarkPrism, RemarkSlug],
			},
		}),
	};
}
