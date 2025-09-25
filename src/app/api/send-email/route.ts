import { NextRequest, NextResponse } from "next/server"
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client"
import { SealClient } from "@mysten/seal"
import { WalrusClient } from "@mysten/walrus"
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519"

// Init lightweight clients at top level (safe)
const suiClient = new SuiClient({ url: getFullnodeUrl("testnet") });

const sealClient = new SealClient({
  suiClient,
  serverConfigs: [
    {
      objectId:
        "0x73d05d62c18d9374e3ea529e8e0ed6161da1a141a94d3f76ae3fe4e99356db75",
      weight: 1,
    },
  ],
  verifyKeyServers: false,
});

const walrusClient = new WalrusClient({
  network: "testnet",
  suiClient,
});

// Small helper to convert hex → Uint8Array
function hexToBytes(hex: string): Uint8Array {
  return Uint8Array.from(
    hex.replace(/^0x/, "").match(/.{1,2}/g)!.map((b) => parseInt(b, 16))
  );
}

export async function POST(req: NextRequest) {
  console.log("➡️ [send-email] Incoming request"); // Always log

  try {
    const body = await req.json();
    const { sender, recipient, message } = body;

    console.log("📩 Payload received:", { sender, recipient, message });

    // Create keypair safely inside the handler
    const secretKeyHex =
      "0x3be1f3c5ab42fc3838c3a55c1afc0b589a2fc2aa5c2fb148a39ac9da675855de";
    let keypair: Ed25519Keypair;
    try {
      const secretKeyBytes = hexToBytes(secretKeyHex);
      keypair = Ed25519Keypair.fromSecretKey(secretKeyBytes);
    } catch (e) {
      console.error("❌ Failed to create Ed25519 keypair:", e);
      return NextResponse.json(
        { error: "Invalid secret key" },
        { status: 500 }
      );
    }

    // Encode message
    const encoder = new TextEncoder();
    const messageBytes = encoder.encode(message);

    console.log("🔐 Message encoded to bytes:", messageBytes.length);

    // Store on Walrus
    let recipientData;
    try {
      recipientData = await walrusClient.writeBlob({
        blob: messageBytes,
        deletable: true,
        epochs: 3,
        signer: keypair,
        owner: recipient,
      });
    } catch (e: any) {
      console.error("❌ Walrus write failed:", e);
      return NextResponse.json(
        { error: "Failed to store blob on Walrus" },
        { status: 500 }
      );
    }

    console.log("✅ Blob stored:", recipientData);

    // Return response
    return NextResponse.json(
      {
        success: true,
        blobId: recipientData.blobId,
        blobObject: recipientData.blobObject,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("❌ General error in POST /send-email:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}