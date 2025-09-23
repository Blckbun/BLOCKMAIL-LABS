'use client'
import { useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Link2, Wallet } from 'lucide-react'
import {
	ConnectModal,
	useCurrentAccount,
	useDisconnectWallet,
} from '@mysten/dapp-kit'

interface NavigationLink {
	href: string
	label: string
}

export default function NavBar() {
	const currentAccount = useCurrentAccount()
	const { mutate: disconnect } = useDisconnectWallet()
	const [open, setOpen] = useState<boolean>(false)

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
					<Link href="/">
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

					{currentAccount ? (
						<Button
							size="lg"
							onClick={() => {
								disconnect()
							}}
							variant="outline"
						>
							<Wallet className="w-4 h-4" />
							<p className="text-white text-sm flex justify-between items-center">
								{currentAccount.address.slice(0, 6)}...
								{currentAccount.address.slice(-4)}
							</p>
						</Button>
					) : (
						<ConnectModal
							trigger={
								<Button
									variant={!!currentAccount ? 'outline' : 'primary'}
									disabled={!!currentAccount}
								>
									<Wallet className="w-4 h-4" />
									<p>Connect Wallet</p>
								</Button>
							}
							open={open}
							onOpenChange={(isOpen) => setOpen(isOpen)}
						/>
					)}
				</div>
			</div>
		</nav>
	)
}
