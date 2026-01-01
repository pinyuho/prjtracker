import crypto from "crypto";

function getKey() {
  const raw = process.env.TOKEN_ENC_KEY;
  if (!raw) throw new Error("Missing TOKEN_ENC_KEY");

  const b64 = raw.startsWith("base64:") ? raw.slice(7) : raw;
  const key = Buffer.from(b64, "base64");
  if (key.length !== 32) throw new Error("TOKEN_ENC_KEY must be 32 bytes (base64 of 32 bytes)");
  return key;
}

export function encryptToken(plain) {
  const key = getKey();
  const iv = crypto.randomBytes(12); // GCM recommended
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  const ciphertext = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    tokenEnc: ciphertext.toString("base64"),
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
  };
}

export function decryptToken(row) {
  const key = getKey();
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    key,
    Buffer.from(row.iv, "base64")
  );
  decipher.setAuthTag(Buffer.from(row.tag, "base64"));

  const plain = Buffer.concat([
    decipher.update(Buffer.from(row.tokenEnc, "base64")),
    decipher.final(),
  ]);

  return plain.toString("utf8");
}
