'use client'
import { Shield, Zap, Users, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../components/ui/card'
import Link from 'next/link'

export default function HomePage() {
	const features = [
		{
			icon: Shield,
			title: 'Decentralized Email',
			description:
				'Secure, private messaging powered by the Sui blockchain and end-to-end encryption.',
		},
		{
			icon: Zap,
			title: 'Pay-to-Send System',
			description:
				'Revolutionary spam prevention through customizable fee requirements for incoming messages.',
		},
		{
			icon: Users,
			title: 'Wallet-Based Identity',
			description:
				'Your Sui wallet address serves as your unique, non-custodial email identity.',
		},
	]

	const howItWorks = [
		{
			step: '1',
			title: 'Connect Your Sui Wallet',
			description:
				'Authenticate using your existing Sui wallet. Your wallet address becomes your unique email identity.',
		},
		{
			step: '2',
			title: 'Set Your Pay-to-Send Fee',
			description:
				'Configure the fee required for others to send you messages, preventing spam automatically.',
		},
		{
			step: '3',
			title: 'Send & Receive Encrypted Messages',
			description:
				'Messages are encrypted locally and stored on Walrus decentralized storage with on-chain validation.',
		},
	]

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
			{/* Hero Section */}
			<div className="relative pt-30 px-4 py-20 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
						The Future of Email is Decentralized
					</h1>
					<p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
						BlockMail revolutionizes communication with wallet-based identity,
						spam-resistant messaging, and end-to-end encryption on the Sui
						blockchain.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							size="lg"
							variant="primary"
						>
							Get Started
							<ArrowRight className="ml-2 w-5 h-5" />
						</Button>
						<Link href="#how-it-works">
							<Button
								size="lg"
								variant="outline"
							>
								Learn More
							</Button>
						</Link>
					</div>
				</div>
			</div>

			{/* Feature Cards */}
			<div className="px-4 py-16 sm:px-6 lg:px-8">
				<div className="max-w-6xl mx-auto">
					<div className="grid md:grid-cols-3 gap-8">
						{features.map((feature, index) => (
							<Card
								key={index}
								className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors"
							>
								<CardHeader>
									<div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mb-4">
										<feature.icon className="w-6 h-6 text-white" />
									</div>
									<CardTitle className="text-cyan-400">
										{feature.title}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-gray-300">
										{feature.description}
									</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>

			{/* Founding Sponsor Section */}
			<div className="px-4 py-16 sm:px-6 lg:px-8 bg-gray-800/30">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-4xl mb-6">Become a Founding Sponsor</h2>
					<p className="text-xl text-gray-300 mb-8">
						Support BlockMail and earn a share of platform revenue—forever.
						Stake your NFT and join the future!
					</p>
					<Link href="/sponsors">
						<Button
							size="lg"
							variant="primary"
						>
							Learn About Sponsorship
						</Button>
					</Link>
				</div>
			</div>

			{/* How It Works */}
			<div
				className="px-4 py-16 sm:px-6 lg:px-8"
				id="how-it-works"
			>
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl text-center mb-12 text-cyan-400">
						How It Works
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						{howItWorks.map((item, index) => (
							<div
								key={index}
								className="text-center"
							>
								<div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
									<span className="text-2xl font-bold text-white">
										{item.step}
									</span>
								</div>
								<h3 className="text-xl mb-4">{item.title}</h3>
								<p className="text-gray-300">{item.description}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Benefits Section */}
			<div className="px-4 py-16 sm:px-6 lg:px-8 bg-gray-800/30">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-4xl text-center mb-12">Why Choose BlockMail?</h2>
					<div className="grid md:grid-cols-2 gap-8">
						<div className="space-y-6">
							{[
								'End-to-end encryption for complete privacy',
								'Spam-resistant with customizable fees',
								'Wallet-based identity - no personal data required',
								'Decentralized storage on Walrus protocol',
								'Open-source and community-driven',
							].map((benefit, index) => (
								<div
									key={index}
									className="flex items-center space-x-3"
								>
									<CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
									<span className="text-gray-300">{benefit}</span>
								</div>
							))}
						</div>
						<div className="bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-lg">
							<h3 className="text-2xl mb-4 text-cyan-400">
								Ready to Get Started?
							</h3>
							<p className="text-gray-300 mb-6">
								Join the revolution in decentralized communication. Connect your
								Sui wallet and experience the future of email.
							</p>
							<Link href='/mailbox'>
								<Button
									className="w-full"
									variant="primary"
								>
									Launch BlockMail
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
