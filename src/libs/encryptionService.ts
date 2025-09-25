// app/lib/encryptionService.ts
import { SealClient } from '@mysten/seal'
import { fromBase64, toBase64 } from '@mysten/sui/utils'


const suiClient = new SuiClient({ url: getFullnodeUrl("testnet") });
const seal = new SealClient({
  suiClient,
  serverConfigs: [
    { objectId: "0xYourKeyServerObjId", weight: 1 },
    // more servers if needed
  ],
  verifyKeyServers: false,
});

const walrusClient = new WalrusClient({
  network: "testnet",
  suiClient,
});

export class EncryptionService {
  /**
   * Encrypt message using recipient's public key with SEAL
   */
  async encryptMessage(message: string, recipientPublicKey: string): Promise<string> {
    try {
      console.log('Encrypting message with SEAL SDK...');
      
      // Convert base64 public key to Uint8Array
      const publicKeyBytes = fromBase64(recipientPublicKey);
      
      // Convert message to Uint8Array
      const messageBytes = new TextEncoder().encode(message);
      
      // Use SEAL to encrypt the message
      const encryptedMessage = await seal.encrypt(publicKeyBytes, messageBytes);
      
      // Convert encrypted message to base64 for storage
      return toBase64(encryptedMessage);
    } catch (error) {
      console.error('SEAL Encryption error:', error);
      throw new Error(`Encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Decrypt message using recipient's private key (for future use)
   */
  async decryptMessage(encryptedMessage: string, privateKey: string): Promise<string> {
    try {
      const encryptedBytes = fromBase64(encryptedMessage);
      const privateKeyBytes = fromBase64(privateKey);
      
      const decryptedBytes = await seal.decrypt(privateKeyBytes, encryptedBytes);
      return new TextDecoder().decode(decryptedBytes);
    } catch (error) {
      console.error('SEAL Decryption error:', error);
      throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate key pair using SEAL (for user registration)
   */
  async generateKeyPair(): Promise<{ publicKey: string; privateKey: string }> {
    try {
      const keyPair = await seal.keyPair();
      return {
        publicKey: toBase64(keyPair.publicKey),
        privateKey: toBase64(keyPair.privateKey)
      };
    } catch (error) {
      console.error('Key pair generation error:', error);
      throw new Error(`Key generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Encrypt email subject and body using SEAL
   */
  async encryptEmail(
    subject: string, 
    body: string, 
    recipientPublicKey: string
  ): Promise<{ encryptedSubject: string; encryptedBody: string }> {
    try {
      console.log('Starting email encryption with SEAL...');
      
      const [encryptedSubject, encryptedBody] = await Promise.all([
        this.encryptMessage(subject, recipientPublicKey),
        this.encryptMessage(body, recipientPublicKey)
      ]);

      console.log('Email encryption completed successfully');
      
      return { encryptedSubject, encryptedBody };
    } catch (error) {
      console.error('Email encryption failed:', error);
      throw error;
    }
  }

  /**
   * Validate public key format
   */
  isValidPublicKey(publicKey: string): boolean {
    try {
      fromBase64(publicKey);
      return true;
    } catch {
      return false;
    }
  }
}