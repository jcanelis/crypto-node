import util from "util"
import Crypto from "crypto"
import jwt from "jsonwebtoken"
const { pbkdf2 } = await import("crypto")
const pbkdf2Promise = util.promisify(pbkdf2)

// Custom
import { KeyFactory } from "./keyfactory.mjs"

const App = async () => {
  try {
    // Create a rando hash
    const secret = "Your secret password..."
    const hash = Crypto.createHmac("sha256", secret)
      .update("some random data here!")
      .digest("hex")
    console.log("This is a rando hash :")
    console.log(hash)

    // Password Based Key Derivation Function
    const derivedKey = await pbkdf2Promise(
      "password here",
      "salt",
      10,
      64,
      "sha512"
    )
    console.log("This a hash from a password based key derivation function :")
    console.log(derivedKey.toString("hex"))

    // Create public & private key pair
    const themKeys = await KeyFactory()
    console.log("This is a public and private key pair : ")
    console.log(themKeys)

    // Encrypt a rando message with the keys
    const message = "THIS IS A SECRET MESSAGE."
    console.log(message)
    console.log("Encrypting... ")
    const buffer = Buffer.from(message, "utf-8")
    const encrypted = Crypto.publicEncrypt(themKeys.publicKey, buffer)
    console.log(encrypted)

    // Decode the rando message
    console.log("Decrypting... ")
    const decoded = Crypto.privateDecrypt(
      {
        key: themKeys.privateKey,
        passphrase: "special secret passphrase here",
      },
      encrypted
    )
    console.log(decoded.toString())

    // Sign a JWT using the keys
    const dataStuff = {
      name: "John Canelis",
      location: "New York City",
    }

    const signedToken = await jwt.sign(
      dataStuff,
      {
        key: themKeys.privateKey,
        passphrase: "special secret passphrase here",
      },
      { algorithm: "RS256", expiresIn: 10000 }
    )
    console.log("This is a JWT token : ")
    console.log(signedToken)

    async function myFunc(arg) {
      try {
        console.log(`arg was => ${arg}`)
        console.log("Verifying the token...")
        const verifyToken = await jwt.verify(signedToken, themKeys.publicKey, {
          algorithms: ["RS256"],
        })

        console.log(verifyToken)
      } catch (error) {
        console.log(error)
      }
    }
    setTimeout(myFunc, 2500, "funky")
  } catch (error) {
    console.log(error)
  }
}

export default App()
