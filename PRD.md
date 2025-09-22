Product Requirements Document (PRD): BlockMail MVP
==================================================

-   **Document Version:** 1.0

-   **Prepared By:** BlockMail Product Team

-   **Date:** 2025-09-22

-   **Status:** In Development

-   **Project Name:** BlockMail MVP

* * * * *

1.0 Executive Summary
---------------------

This document defines the requirements for the initial release (MVP) of the BlockMail protocol and platform. BlockMail is a decentralized, spam-resistant email service built on the Sui blockchain. The primary objective of the MVP is to deliver a functional, secure, and fully decentralized email solution that validates the core concepts of wallet-based identity, on-chain fee enforcement, and end-to-end encrypted messaging. This release will serve as the foundation for future development and community-led contributions.

* * * * *

2.0 Project Goals & Objectives
------------------------------

### **2.1 Business Objectives**

-   **Problem Statement:** Traditional email is plagued by spam, centralization, and privacy risks, which are antithetical to the principles of Web3. There is a market need for a communication protocol that aligns with decentralized identity and a trustless security model.

-   **Opportunity:** BlockMail can capture a significant portion of the Web3 user base that values privacy, security, and control over their data, establishing itself as the de-facto decentralized communication standard.

-   **Target Market:** The initial target users are Web3-native individuals, developers, and organizations (e.g., DAOs) who already use Sui wallets and understand on-chain transactions.

### **2.2 Success Metrics (KPIs)**

-   **User Adoption:** Achieve 1,000 active users within 3 months of launch.

-   **Retention:** Maintain a 30% month-over-month user retention rate.

-   **Engagement:** Achieve an average of 5 on-chain message transactions per active user per week.

-   **Developer Community:** Recruit at least 10 active contributors to the open-source repository.

* * * * *

3.0 Stakeholders
----------------

| Stakeholder | Role / Responsibility |
| --- | --- |
| Product Manager | Document owner, defines requirements and manages roadmap. |
| Engineering Lead | Responsible for technical architecture and implementation. |
| UI/UX Designer | Responsible for user experience design and wireframes. |
| QA Engineer | Responsible for testing and quality assurance. |
| Marketing Lead | Responsible for product messaging and go-to-market strategy. |

Export to Sheets

* * * * *

4.0 User Personas
-----------------

### **Persona: Alex (The Crypto Native)**

-   **Background:** A software engineer who actively participates in DAOs, DeFi, and other Web3 projects.

-   **Goals:** Needs a secure way to receive governance proposals and notifications from DAOs without spam. Wants a wallet-native inbox that aligns with their existing identity.

-   **Pain Points:** Existing email is cluttered with spam and irrelevant promotions. They don't trust centralized providers with sensitive information.

* * * * *

5.0 Requirements
----------------

The requirements for BlockMail are categorized using a MoSCoW prioritization model.

### **5.1 Must-Haves (Core Functionality for MVP)**

-   **FR-1: Wallet-based Login & Identity:** Users must authenticate and log in using a Sui wallet. The user's Sui wallet address shall serve as their unique, non-custodial email identity.

-   **FR-2: Onboarding Flow:** A guided first-time user experience that prompts new users to set an initial pay-to-send fee.

-   **FR-3: Message Composition:** A user interface for composing a new message with fields for recipient wallet address, subject, and body text.

-   **FR-4: Message Encryption:** All message content must be locally encrypted on the sender's device using the recipient's public key (via the Seal library) before transmission.

-   **FR-5: Decentralized Storage Integration:** Encrypted message data must be uploaded to Walrus, and the resulting blob ID must be returned to the sender.

-   **FR-6: On-Chain Fee Enforcement:** The sender's transaction to register the message must include the recipient's specified pay-to-send fee, which is validated by a Sui smart contract.

-   **FR-7: Inbox Retrieval:** The user's inbox must dynamically fetch and display new messages by querying the Sui blockchain for blob IDs registered to their wallet address.

-   **FR-8: Message Decryption:** The application must automatically decrypt retrieved messages upon retrieval using the user's private key via their wallet provider.

-   **FR-9: Pay-to-Send Fee Management:** Users must be able to change their personal pay-to-send fee threshold at any time.

### **5.2 Should-Haves (Post-MVP Enhancements)**

-   **FR-10: Dynamic Fee Tiers:** Implement the ability for users to set different fees for different categories of senders (e.g., contacts vs. strangers).

-   **FR-11: Contact Whitelisting:** Provide a feature to whitelist specific wallet addresses, allowing them to send messages with a reduced or zero fee.

-   **FR-12: Attachment Support:** Enable users to attach files to their messages. These attachments will also be encrypted and stored on Walrus.

### **5.3 Could-Haves (Long-Term Vision)**

-   **FR-13: Group Messaging:** Support for sending a single message to a predefined group of recipients.

-   **FR-14: Federated Spam Filters:** Integrate with a decentralized AI/ML protocol for advanced spam and phishing detection.

-   **FR-15: Mobile Client:** A dedicated mobile application that provides a native experience for BlockMail users.

* * * * *

6.0 Non-Functional Requirements (NFRs)
--------------------------------------

-   **NFR-1 (Security):** All data must be end-to-end encrypted. User private keys must remain securely stored within their wallet and never be handled by the application's servers or code.

-   **NFR-2 (Performance):** Inbox loading time (querying the chain and fetching blobs) must not exceed 5 seconds for a user with 100 messages.

-   **NFR-3 (Scalability):** The architecture must be designed to handle a large volume of daily transactions without network congestion or significant latency. The off-chain storage solution (Walrus) should be horizontally scalable.

-   **NFR-4 (Usability):** The UI must be intuitive and easy to navigate for users familiar with both traditional email and Web3 wallets.

-   **NFR-5 (Compliance):** The protocol will be fully open-source with an MIT License.

* * * * *

7.0 Assumptions, Constraints, & Dependencies
--------------------------------------------

-   **Assumption:** The Sui network remains stable, performant, and reliable for on-chain transactions.

-   **Assumption:** Walrus decentralized storage provides reliable and persistent blob storage for encrypted data.

-   **Dependency:** The project relies on the functionality and stability of the Sui Wallet Adapter.

-   **Constraint:** The initial release will not support interoperability with traditional email services.

-   **Constraint:** The MVP will be a single web application; a mobile client is out of scope.

* * * * *

8.0 Go-to-Market & Release Plan
-------------------------------

-   **Target Release Date:** Q1 2026

-   **Beta Launch:** A private beta will be launched for a select group of Web3 influencers and developers to gather early feedback and bug reports.

-   **Public Release:** The public launch will be announced on major Web3 platforms and social media channels. The open-source code will be made public, inviting community contributions.

-   **Marketing Strategy:** Focus on content marketing that highlights the privacy and security benefits of decentralized email, contrasting it with the pitfalls of traditional providers. Engage with the Sui community and developer ecosystem.
