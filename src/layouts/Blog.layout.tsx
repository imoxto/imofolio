import { NextSeo } from 'next-seo';

import { Navbar } from '~/components';
import { useSeoProps } from '~/lib';

import type { ComponentProps, PropsWithChildren } from 'react';
import { profile } from '~/data/profile';

interface BlogLayoutProps {
	seo?: Partial<ComponentProps<typeof NextSeo>>;
}

export function BlogLayout({ children, seo }: PropsWithChildren<BlogLayoutProps>): JSX.Element {
	const seoProps = useSeoProps({
		title: `${profile.alias} ─ blog`,
		...seo,
	});

	return (
		<>
			<NextSeo {...seoProps} />
			<Navbar.Standard />
			<main className="flex flex-col justify-center sm:px-8">{children}</main>
		</>
	);
}
