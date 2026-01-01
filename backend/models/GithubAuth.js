import mongoose from "mongoose";
const Schema = mongoose.Schema;

const GithubAuthSchema = new Schema(
  {
    githubUserId: { type: String, required: true, unique: true, index: true },
    username: { type: String, required: true },
    avatarUrl: { type: String, required: false },

    // 加密後 token（不要存明文）
    tokenEnc: { type: String, required: true }, // base64 ciphertext
    iv: { type: String, required: true },       // base64 12 bytes
    tag: { type: String, required: true },      // base64 auth tag

    // optional metadata
    scope: { type: String, default: "" },
    tokenType: { type: String, default: "bearer" },
  },
  {
    timestamps: true, // createdAt / updatedAt
    versionKey: false,
  }
);

export const GithubAuth = mongoose.model("GithubAuth", GithubAuthSchema);
