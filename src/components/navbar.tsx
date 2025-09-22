'use client'
import { useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Link2, Wallet } from 'lucide-react'

interface NavigationLink {
	href: string
	label: string
}

export default function NavBar() {
	const [isWalletConnected, setIsWalletConnected] = useState(false)

	const handleConnectWallet = () => {
		// Mock wallet connection - in real app this would integrate with Sui wallet
		setIsWalletConnected(!isWalletConnected)
	}
	const navLinks: NavigationLink[] = [
		{ href: '/', label: 'Home' },
		{ href: '/profile', label: 'Profile' },
		{ href: '/mailbox', label: 'Mailbox' },
		{ href: '/sponsors', label: 'Sponsors' },
	]

	return (
		<nav className="bg-gray-900/10 backdrop-blur-md p-2 fixed w-full left-0 top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						{/* Logo */}
            <Link href='/'>
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
								<Link2 className="w-6 h-6 text-white" />
							</div>
							<span className="text-xl font-semibold text-white">
								BlockMail
							</span>
						</div>
            </Link>

						{/* Navigation Links */}
						<div className="hidden md:flex items-center space-x-8">
							{navLinks.map((link) => (
								<Link
									key={link.label}
									href={link.href}
									className="text-white hover:text-blue-400 hover:font-semibold px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
								>
									{link.label}
								</Link>
							))}
						</div>

						{/* Connect Wallet Button */}
						<Button
							onClick={handleConnectWallet}
							variant={'primary'}
						>
							<Wallet className="w-4 h-4" />
							<span>Connect Wallet</span>
						</Button>
					</div>
				</div>
		</nav>
	)
}
