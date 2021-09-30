import util from "util"
const { generateKeyPair } = await import("crypto")
const generateKeyPairPromise = util.promisify(generateKeyPair)

const passphrase = "special secret passphrase here"

const KeyFactory = async () => {
  return generateKeyPairPromise("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: passphrase,
    },
  })
}

export { KeyFactory }
