export type InboxMessage = {
	objectId: string
	message: {
		sender: string
		subject: string
		message: string
	}
}
