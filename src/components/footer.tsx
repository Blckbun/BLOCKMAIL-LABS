import Image from 'next/image'
const Footer = ()=>{
    return(
			<footer className="px-4 py-6 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
				<div className="max-w-6xl mx-auto text-center">
					<div className="flex items-center justify-center space-x-2 mb-4">
						<span className="text-gray-400">Powered by</span>
						<Image
							src="/sui.webp"
							alt="Sui Logo"
							width={80}
							height={20}
						/>
					</div>
					<p className="text-gray-500">
						© 2025 BlockMail. Built on Sui blockchain with Walrus storage.
					</p>
				</div>
			</footer>
    )
}

export default Footer