import { Card, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Search, Lock, Calendar, User } from 'lucide-react'
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { useEffect } from 'react'

const Inbox = () => {
	const account = useCurrentAccount()

	const client = new SuiClient({ url: getFullnodeUrl('testnet') })
	/**
	 * Fetch and decode inbox messages for a user.
	 */
	async function getInboxMessages(ownerAddress: string) {
		// 1. Get all objects owned by this wallet
		const owned = await client.getOwnedObjects({
			owner: ownerAddress,
			options: { showContent: true, showType: true },
		})

		// 2. Filter Walrus blobs (by type name)
		const walrusObjs = owned.data.filter((obj) => {
			return obj.data?.type?.includes('blob::Blob')
		})

		const messages: any[] = []

		// 3. For each Walrus blob → fetch, decrypt, decode
		for (const obj of walrusObjs) {
			try {
				const objectId = obj?.data?.objectId
				if (!objectId) continue

				// 3a. Fetch blob bytes from Walrus storage node
				const resp = await fetch(
					`https://aggregator.walrus-testnet.walrus.space/v1/blobs/by-object-id/${objectId}`
				)
				if (!resp.ok) throw new Error(`Failed to fetch blob ${objectId}`)
				const encryptedBytes = new Uint8Array(await resp.arrayBuffer())

				// 3c. Decode bytes → string → object
				const decoder = new TextDecoder()
				const messageString = decoder.decode(encryptedBytes)

				let message: any
				try {
					message = JSON.parse(messageString)
				} catch {
					message = messageString // fallback if plain text
				}

                console.log("object data is ",obj)
				messages.push({
					objectId,
					message,
				})
			} catch (err) {
				console.error('Failed to process Walrus blob', err)
			}
		}
		return messages
	}

	useEffect(() => {
		async function fetchInbox() {
			if (account === null) return
			const inbox = await getInboxMessages(account.address)
			console.log('📩 Inbox messages:', inbox)
		}
		fetchInbox()
	}, [account?.address])

	return (
		<>
			{/* Search */}
			<div className="relative">
				<Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
				<Input
					placeholder="Search messages..."
					className="pl-10 bg-gray-800/50 border-gray-700 text-white"
				/>
			</div>

			{/* Email List */}
			{/* <div className="space-y-3">
				{emails.map((email) => (
					<Card
						key={email.objectId}
						className={`bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 cursor-pointer transition-colors ${
							!email.read ? 'border-cyan-500/50' : ''
						}`}
					>
						<CardContent className="p-4">
							<div className="flex items-start justify-between">
								<div className="flex-1 space-y-2">
									<div className="flex items-center space-x-3">
										<div className="flex items-center space-x-2">
											<User className="w-4 h-4 text-gray-400" />
											<span className="text-sm text-gray-400">
												{email.from}
											</span>
										</div>
										{email.encrypted && (
											<Badge
												variant="secondary"
												className="bg-green-600/20 text-green-400 border-green-600/50"
											>
												<Lock className="w-3 h-3 mr-1" />
												Encrypted
											</Badge>
										)}
										<Badge
											variant="outline"
											className="border-cyan-600/50 text-cyan-400"
										>
											{email.fee}
										</Badge>
									</div>
									<h3
										className={`${
											!email.read ? 'text-white font-semibold' : 'text-gray-300'
										}`}
									>
										{email.subject}
									</h3>
									<p className="text-gray-400 text-sm">{email.preview}</p>
								</div>
								<div className="flex items-center space-x-2 text-sm text-gray-400">
									<Calendar className="w-4 h-4" />
									<span>{email.timestamp}</span>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div> */}
		</>
	)
}

export default Inbox
