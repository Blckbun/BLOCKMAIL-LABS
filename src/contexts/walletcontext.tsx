'use client'
import {
	createNetworkConfig,
	SuiClientProvider,
	WalletProvider,
} from '@mysten/dapp-kit'
import { getFullnodeUrl } from '@mysten/sui/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const WalletConnectionContext = ({ children }: any) => {
	const { networkConfig } = createNetworkConfig({
		testnet: { url: getFullnodeUrl('testnet') },
	})

	// query client
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: 3,
				staleTime: 1000 * 60 * 5, // 5 minutes
				refetchOnWindowFocus: false,
			},
		},
	})

	return (
		<QueryClientProvider client={queryClient}>
			<SuiClientProvider
				networks={networkConfig}
				defaultNetwork="testnet"
			>
				<WalletProvider
					autoConnect={true}
					// theme={{ mode: "dark" }} // Optional: set theme
				>
					{children}
				</WalletProvider>
			</SuiClientProvider>
		</QueryClientProvider>
	)
}

export default WalletConnectionContext
