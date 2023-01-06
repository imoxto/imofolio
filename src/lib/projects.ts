import emojiRegex from 'emoji-regex';
import { log } from 'next-axiom';

import type { GitHubRepos, Project, ProjectPost } from '~/types';
import { profile } from '~/data/profile';

/**
 * Fetch Projects
 * @TODO Switch to v3 API using GraphQL to save over-fetching
 */
const fetchRepos = async ({
	slug,
	type,
	ignore,
}: typeof profile.projectSrcs[0]): Promise<GitHubRepos> => {
	const response = await fetch(`https://api.github.com/${type}/${slug}/repos`, {
		headers: {
			...(process.env.GITHUB_PAT && {
				authorization: `token ${process.env.GITHUB_PAT}`,
			}),
		},
	});
	if (response.status !== 200) {
		const json = (await response.json()) as {
			documentation_url: string;
			message: string;
		};

		console.error({ error: json });
		log.error('Failed to fetch projects', {
			error: json,
		});

		return null;
	}

	const repos = (await response.json()) as GitHubRepos;

	return repos.filter((repo) => {
		return !ignore.includes(repo.name);
	});
};

export async function fetchProjects(): Promise<Array<Project> | null> {
	const projects = [];
	for (const source of profile.projectSrcs) {
		projects.push(...(await fetchRepos(source)));
	}
	const { default: rawProjectPosts } = await import('~/data/projects.json');
	const projectPosts = rawProjectPosts as Array<ProjectPost>;

	return projects
		.map((repo) => {
			// if (repo.topics.includes('portfolio')) return null;

			if (repo.archived) return null;
			if (repo.fork) return null;

			// Strip the emoji suffix from the repo description
			const trimmedDescription = (repo.description || '').split(' ');
			trimmedDescription.shift();
			const description = trimmedDescription.join(' ');

			// Check if there is a matching blog post to attach
			const repoPost =
				projectPosts.length > 0 &&
				projectPosts.find(
					(post) => post.repository.toLowerCase() === repo.full_name.toLowerCase(),
				);

			return {
				description,
				icon: ((): string => {
					if (!repo.description) return undefined;

					const char = repo.description.split(' ')[0];

					return emojiRegex().test(char) ? char : undefined;
				})(),
				homepage: repo.homepage ?? undefined,
				name: repo.name,
				post: repoPost ? `/blog/${repoPost.post}` : undefined,
				template: false,
				url: repo.html_url.toLowerCase(),
			} as Project;
		})
		.filter((project) => project !== null);
}