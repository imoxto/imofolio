import { differenceInYears } from 'date-fns';
import { ProjectPost, Referrals, Timeline } from '~/types';

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
	name: 'Md. Rafid Hamid',
	role: 'Fullstack Developer',
	bio: getDescription(),
	isBirthday: isBirthday(),
	alias: 'Rafid',
	social: {
		twitter: 'ryon099',
		github: 'imoxto',
		linkedin: 'imoxto',
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

export const blogs = { devto: { username: 'imoxto' } };

export const timeline: Timeline = [
	{
		date: '01-06-2022',
		title: 'First Job or Huge Project!',
		description: 'Start working on a AI startup as a Software Engineer at Reinforz',
		icon: 'feather:briefcase',
		link: {
			text: 'Visit Reinforz',
			url: 'https://www.reinforz.ai/',
		},
	},
	{
		date: '01-01-2020',
		title: 'Start University',
		description: 'Began studying Computer Science and Engineering at Brac University',
		icon: 'feather:book',
		link: {
			text: 'Visit Brac University Website',
			url: 'https://www.bracu.ac.bd/',
		},
	},
	{
		date: '12-04-1999',
		title: 'Birthday!',
		description: 'I was born on 4th December, 1999',
		icon: 'feather:gift',
	},
];

export const projectPosts: Array<ProjectPost> = [];

export const referrals: Referrals = [
	{
		aliases: ['crypto', 'bitcoin'],
		bonus: 'Free £7 in Bitcoin',
		code: '55T1KI',
		color: '#0052ff',
		description: 'Jump start your crypto portfolio',
		homepage: 'https://www.coinbase.com',
		icon: 'heroicons-outline:currency-dollar',
		name: 'Coinbase',
		url: 'https://coinbase.com/join/55T1KI?src=referral-link',
	},
	{
		aliases: ['cloud', 'digital ocean'],
		bonus: 'Free $200 in cloud credits',
		code: '6b93d0857624',
		color: '#0052ff',
		description:
			'Deploy your next app in seconds. Get $200 in cloud credits from DigitalOcean for 2 months.',
		homepage: 'https://www.coinbase.com',
		icon: 'heroicons-outline:cloud',
		name: 'Digital Ocean',
		url: 'https://m.do.co/t/6b93d0857624',
	},
];