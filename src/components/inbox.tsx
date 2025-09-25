import { Card, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Search, Lock, User } from 'lucide-react'
import { InboxMessage } from '@/libs/types'

const Inbox = ({ inboxMessages }: { inboxMessages: InboxMessage[] }) => {
	console.log('Inbox messages in the inbox :', inboxMessages)
	return (
		<>
			{/* Search */}
			{/* <div className="relative">
				<Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
				<Input
					placeholder="Search messages..."
					className="pl-10 bg-gray-800/50 border-gray-700 text-white"
				/>
			</div> */}

			{/* Email List */}
			<div className="space-y-3">
				{inboxMessages.map((inboxMessage: InboxMessage) => (
					<Card
						key={inboxMessage.objectId}
						className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 cursor-pointer transition-colors"
					>
						<CardContent className="p-4">
							<div className="flex items-start justify-between">
								<div className="flex-1 space-y-2">
									<div className="flex items-center justify-between w-full">
										<div className="flex items-center space-x-2">
											<User className="w-4 h-4 text-gray-400" />
											<span className="text-sm text-gray-400">
												{inboxMessage?.message?.sender}
											</span>
										</div>
										<div className='flex items-center space-x-4'>
											<Badge
												variant="secondary"
												className="bg-green-600/20 text-green-400 border-green-600/50"
											>
												<Lock className="w-3 h-3 mr-1" />
												Encrypted
											</Badge>
											<Badge
												variant="outline"
												className="border-cyan-600/50 text-cyan-400"
											>
												0.1 SUI
											</Badge>
										</div>
									</div>
									<h3 className="text-white font-semibold">
										{inboxMessage?.message?.subject}
									</h3>
									<p className="text-gray-400 text-sm">
										{inboxMessage?.message?.message}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</>
	)
}

export default Inbox
