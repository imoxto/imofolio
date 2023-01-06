import { differenceInYears } from 'date-fns';

const today = new Date();
const birthday = new Date('1999-04-12');

function isBirthday(): boolean {
	return today.getDate() === birthday.getDate() && today.getMonth() === birthday.getMonth();
}

function getDescription(): string {
	const age = differenceInYears(today, birthday);
	return `I am a ${age} year old full stack developer with a strong passion for web development and artificial intelligence.`;
}

export const profile = {
	name: 'Rafid',
	role: 'developer',
	bio: getDescription(),
	isBirthday: isBirthday(),
	alias: 'rafid',
	social: {
		twitter: 'ryon099',
		github: 'imoxto',
	},
	projectSrcs: [
		{
			type: 'users',
			slug: 'imoxto',
			ignore: [],
		},
	],
	pagesIgnore: [],
	domain: 'imoxto.me',
};

export const Blogs = { devto: { username: 'imoxto' } };
