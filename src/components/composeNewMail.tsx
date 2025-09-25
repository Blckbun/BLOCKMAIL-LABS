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
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client'
import { WalrusClient } from '@mysten/walrus'
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519'

const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') })

const walrusClient = new WalrusClient({
	network: 'testnet',
	suiClient,
})

const ComposeNewMail = () => {
	const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction()
	const account = useCurrentAccount()
	const [txHash, setTxHash] = useState<string | null>(null)

	// Small helper to convert hex → Uint8Array
	function hexToBytes(hex: string): Uint8Array {
		return Uint8Array.from(
			hex
				.replace(/^0x/, '')
				.match(/.{1,2}/g)!
				.map((b) => parseInt(b, 16))
		)
	}

	async function handleSend() {
		if (!account) {
			alert('Please connect your wallet first.')
			return
		}

		// 1. Create a transaction
		const tx = new Transaction()
		const recipient =
			'0xb0c6f9fdfcdf62499f9576941eb5f53120c8fa717c73005f0f23db83c8a5f9be' // Replace with receiver wallet
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
						} catch (e: any) {
							console.error('Walrus write failed:', e)
							return
						}

						return
					} catch (err: any) {
						console.error('General error in :', err)
						return err
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
