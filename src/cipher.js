const crypto = require("crypto")

// Crypto Setup
const algorithm = "aes-192-cbc"
const passphrase = "random passphrase here"
const key = crypto.scryptSync(passphrase, "salt", 24)
const iv = Buffer.alloc(16, 0)

// Cipher Setup
const secretPhrase = "nice vibez"
let encrypted = ""
const cipher = crypto.createCipheriv(algorithm, key, iv)

// Cipher Events
cipher.on("readable", () => {
  let chunk
  while (null !== (chunk = cipher.read())) {
    encrypted += chunk.toString("hex")
  }
})
cipher.on("end", () => {
  console.log(secretPhrase)
  console.log("is now ::: ")
  console.log(encrypted)
})

// Cipher Time
cipher.write(secretPhrase)
cipher.end()

// Decipher Setup
let decrypted = ""
const decipher = crypto.createDecipheriv(algorithm, key, iv)
decipher.on("readable", () => {
  while (null !== (chunk = decipher.read())) {
    decrypted += chunk.toString("utf8")
  }
})

// Decipher Events
decipher.on("end", () => {
  console.log("received ::: ")
  console.log(encrypted)
  console.log("decrypted ::: ")
  console.log(decrypted)
})

// Decipher Time
decipher.write(encrypted, "hex")
decipher.end()
