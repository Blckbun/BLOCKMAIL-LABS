import {
	useSignAndExecuteTransaction,
	useCurrentAccount,
} from '@mysten/dapp-kit'
import { Transaction } from '@mysten/sui/transactions'
import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Send, Lock } from 'lucide-react'

const ComposeNewMail = () => {
	const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction()
	const account = useCurrentAccount()
	const [txHash, setTxHash] = useState<string | null>(null)

	async function handleSend() {
		if (!account) {
			alert('Please connect your wallet first.')
			return
		}
		const recipient = (
						document.getElementById('recipient') as HTMLInputElement
					).value

		// 1. Create a transaction
		const tx = new Transaction()
		const suiAmount: number = 0.01 // in SUI
		const amount = BigInt(suiAmount * 1_000_000_000) // convert to MIST

		// Split `amount` from the gas coin
		const [coin] = tx.splitCoins(tx.gas, [tx.pure.u64(amount)])

		// Transfer that coin
		tx.transferObjects([coin], tx.pure.address(recipient))

		tx.setGasBudget(BigInt(10000000)) // set gas budget

		// 2. Sign & execute transaction
		await signAndExecuteTransaction(
			{
				transaction: tx,
			},
			{
				onSuccess: async (resp) => {
					console.log('successful ', resp.digest)
					await setTxHash(resp.digest)

					const sender = account.address
					const subject = (
						document.getElementById('subject') as HTMLInputElement
					).value
					const message = (
						document.getElementById('message') as HTMLTextAreaElement
					).value

					// Create JSON payload
					const payload = {
						sender,
						subject,
						message,
					}
					try {
						// Encode message
						const encoder = new TextEncoder()
						const messageBytes = encoder.encode(JSON.stringify(payload))

						// Store on Walrus
						try {
							// Example: Store a string as a blob
							const res = await fetch(
								`https://publisher.walrus-testnet.walrus.space/v1/blobs?send_object_to=${recipient}`,
								{
									method: 'PUT',
									body: messageBytes,
									headers: {
										'Content-Type': 'application/octet-stream',
									},
								}
							)
							const data = await res.json()
							console.log(data)
						} catch (e: unknown) {
							if (e instanceof Error) {
								console.error('Error storing message:', e.message)
							}
							return 'An unknown error occurred.'
						}

						return
					} catch (err: unknown) {
						if (err instanceof Error) {
							console.error('Error encoding message:', err.message)
						}
						return 'An unknown error occurred.'
					}
				},
				onError: (err) => {
					console.error('Transaction failed:', err)
				},
			}
		)
	}

	return (
		<Card className="bg-gray-800/50 border-gray-700">
			<CardHeader>
				<CardTitle className="flex items-center text-cyan-400">
					<Send className="w-5 h-5 mr-2" />
					Compose New Message
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div>
					<Label htmlFor="recipient">Recipient Wallet Address</Label>
					<Input
						id="recipient"
						placeholder="0x..."
						className="bg-gray-700 border-gray-600 text-white"
					/>
				</div>
				<div>
					<Label htmlFor="subject">Subject</Label>
					<Input
						id="subject"
						placeholder="Enter subject..."
						className="bg-gray-700 border-gray-600 text-white"
					/>
				</div>
				<div>
					<Label htmlFor="message">Message</Label>
					<Textarea
						id="message"
						placeholder="Type your encrypted message..."
						className="bg-gray-700 border-gray-600 text-white min-h-32"
					/>
				</div>
				<div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
					<div className="flex items-center space-x-2">
						<Lock className="w-4 h-4 text-green-400" />
						<span className="text-sm text-green-400">
							Message will be encrypted
						</span>
					</div>
					<div className="text-sm text-gray-400">Fee required: 0.1 SUI</div>
				</div>
				<div className="flex space-x-4">
					<Button
						variant="primary"
						onClick={handleSend}
					>
						<Send className="w-4 h-4 mr-2" />
						Send Message
					</Button>
					{/* <Button
						variant="outline"
						className="border-gray-600 text-gray-300 hover:bg-gray-800"
					>
						Save Draft
					</Button> */}
				</div>
			</CardContent>
		</Card>
	)
}

export default ComposeNewMail
