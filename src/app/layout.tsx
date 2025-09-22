import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'BlockMail',
	description:
		'A wallet native decentralized email system where users sign in with their Sui wallet, send encrypted messages stored on Walrus via Seal, and pay a recipient defined fee per message to ensure delivery and block spam.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<NavBar />
				<main>{children}</main>
			</body>
		</html>
	)
}
