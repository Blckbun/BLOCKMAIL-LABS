BlockMail 📧
============

Decentralized Email with Pay-to-Send and Spam Filtering
-------------------------------------------------------

BlockMail is a Web3-native communication protocol and platform that combines **wallet-based identity**, **trustless encryption**, and **economic spam prevention**. Built on **Sui**, with **Walrus** for decentralized storage and **Seal** for encryption, BlockMail delivers secure, spam-resistant, fully decentralized email for the next era of the internet.

* * * * *

✨ Why BlockMail?
----------------

Email is broken. Traditional email is plagued by:

-   **Spam**: 45% of emails are spam.

-   **Centralization**: Big providers own user data.

-   **Privacy risks**: Centralized servers can be hacked or surveilled.

-   **Identity limitations**: Emails don't align with Web3 wallets.

BlockMail fixes this by design:

-   **Spam** becomes economically infeasible via pay-to-send fees.

-   **Private messages** are end-to-end encrypted with wallet keys.

-   **Zero custody** → Data is stored on Walrus blobs, accessible only to recipients.

-   **Wallet = inbox identity** → Seamless for Web3-native users.

* * * * *

🚀 Features
-----------

-   ✅ Wallet-native login (Sui wallet = your email ID).

-   ✅ Spam-proof inbox (economic pay-to-send, set by recipients).

-   ✅ End-to-end encryption (E2EE) for all content + attachments.

-   ✅ Decentralized blob storage backed by Walrus.

-   ✅ Sender pays fee to reach recipient (on-chain enforcement).

-   ✅ Receiver defines fee threshold (dynamic anti-spam pricing).

-   ✅ Fully open-source & trustless architecture.

* * * * *

🏛 Architecture
---------------

BlockMail's architecture has 3 decentralized pillars:

-   **Sui Blockchain (Logic Layer):**

    -   Smart contracts validate messages.

    -   Ensures only fee-paid, authenticated emails are registered.

-   **Walrus Storage (Data Layer):**

    -   Emails + attachments stored as encrypted blobs.

    -   Blob IDs referenced on-chain.

-   **Seal Cryptography (Security Layer):**

    -   Encrypts messages with recipient's public key.

    -   Recipient decrypts with private wallet keys.

Code snippet

```
sequenceDiagram
    participant Sender
    participant Seal
    participant Walrus
    participant SuiChain
    participant Recipient

    Sender->>Seal: Encrypt message with recipient's pubkey
    Seal->>Walrus: Upload encrypted data
    Walrus-->>Sender: Blob ID
    Sender->>SuiChain: Submit payment + Blob ID
    SuiChain-->>Recipient: Inbox updated
    Recipient->>Walrus: Fetch encrypted blob
    Recipient->>Seal: Decrypt with private key
    Seal-->>Recipient: Plaintext message

```

* * * * *

🔄 User Flows
-------------

### Registration

1.  User connects their Sui Wallet.

2.  BlockMail maps user wallet → inbox.

3.  User defines a pay-to-send fee (default: 0.01 SUI).

### Sending a Message

1.  Sender writes message.

2.  Message encrypted locally with Seal.

3.  Upload → Walrus → return blob ID.

4.  Sender pays recipient's fee + submits blob ID on-chain.

5.  Contract validates payment + logs message reference.

### Receiving a Message

1.  Recipient queries inbox smart contract.

2.  Finds new blob IDs registered to wallet.

3.  Downloads encrypted data → decrypts with Seal.

4.  Inbox shows decrypted content.

### Spam Elimination

-   Zero-fee messages rejected outright.

-   Recipients filter further by raising fees for strangers.

-   Optionally whitelist frequent contacts (reduced fees).

* * * * *

🛠 Technical Stack
------------------

-   **Chain**: Sui

-   **Smart Contracts**: Move

-   **Decentralized Storage**: Walrus blobs

-   **Encryption**: Seal (libsodium-based E2EE system)

-   **Frontend**: Next.js + TS + TailwindCSS

-   **Wallet Integration**: Sui Wallet Adapter

* * * * *

⚙️ Developer Setup
------------------

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://www.google.com/search?q=%5Bhttps://nextjs.org/docs/app/api-reference/cli/create-next-app%5D(https://nextjs.org/docs/app/api-reference/cli/create-next-app)).

### Prerequisites

-   Node.js v18+

-   Yarn/npm

-   Sui CLI & Wallet

-   Access to Walrus endpoint

### Getting Started

First, run the development server:

Bash

```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `client/pages/index.tsx`. The page auto-updates as you edit the file.

### Environment Variables (.env)

Plaintext

```
NEXT_PUBLIC_SUI_NETWORK=https://sui-testnet-rpc.com
NEXT_PUBLIC_WALRUS_ENDPOINT=https://walrus.storage
NEXT_PUBLIC_CONTRACT_ADDRESS=0x123456789

```

* * * * *

📂 Repository Structure
-----------------------

Plaintext

```
blockmail/
├── contracts/          # Move smart contracts
│   ├── FeeManager.move
│   ├── InboxRegistry.move
│   └── MessageRegistry.move
│
├── client/             # Next.js-based frontend
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   └── utils/
│
├── scripts/            # Deployment & testing utils
├── tests/              # End-to-end & unit tests
└── docs/               # Extended documentation

```

* * * * *

🔧 Example Code
---------------

### Move Contract (FeeManager.move)

Plaintext

```
module blockmail::fee_manager {

    struct Fee has store {
        amount: u64,
    }

    public fun set_fee(account: &signer, amount: u64) {
        move_to(account, Fee { amount });
    }

    public fun get_fee(addr: address): u64 acquires Fee {
        borrow_global<Fee>(addr).amount
    }
}

```

### React Hook (useInbox.ts)

TypeScript

```
import { useWallet } from "@suiet/wallet-kit";
import { fetchBlob, decryptMessage } from "../utils/encryption";

export function useInbox() {
  const { address } = useWallet();

  async function getMessages() {
    // Query Move contract for blob IDs
    const blobIds = await queryOnChainInbox(address);
    return Promise.all(blobIds.map(async id => {
      const encrypted = await fetchBlob(id);
      return decryptMessage(encrypted, address);
    }));
  }

  return { getMessages };
}

```

* * * * *

🧭 Roadmap
----------

-   MVP (send/receive, pay-to-send, spam prevention)

-   Dynamic fee control (contacts vs strangers)

-   Group messaging & mailing lists

-   Federated filters (AI/ML)

-   Fully mobile wallet client (React Native)

-   ZKP-based read receipts (privacy-preserving delivery proofs)

* * * * *

🤝 Contributing
---------------

Contributions are essential for BlockMail's growth.

### Contribution Steps

Fork repo & branch:

Bash

```
git checkout -b feature/my-feature

```

Implement feature + add documentation.

Submit PR with description + screenshots.

### Contribution Guidelines

-   All PRs must include tests (smart contract or frontend).

-   Use conventional commits for commit messages.

-   Document all public smart contract functions.

* * * * *

💡 Use Cases
------------

-   **Personal use**: Spam-free wallet-native inbox.

-   **DAOs**: Only allow paid, spam-free proposals into governance inbox.

-   **Business**: Service desks avoid spam with dynamic pay-to-send fees.

-   **Web3 Networks**: Plug into ENS/DID identity for decentralized comms.

* * * * *

📖 FAQ
------

**Q1: How does this prevent spam?** A: Spammers can't afford to pay the fee per message. The economics eliminate mass mailing.

**Q2: Can I forward emails to non-wallet users?** A: Not directly. BlockMail is wallet-native. External bridges may be developed.

**Q3: Are messages visible on-chain?** A: No. Only blob IDs + transaction fees are recorded. Content stays encrypted off-chain on Walrus.

**Q4: What happens if Walrus goes offline?** A: Redundancy in Walrus ensures blob persistence. Future versions may integrate multiple storage backends.

* * * * *

📜 License
----------

MIT License --- see LICENSE file. Copyright (c) 2025 BlockMail

* * * * *

Deploy on Vercel
----------------

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

