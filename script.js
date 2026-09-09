const FIELD_ERROR = "Merci de remplir chaque champ."

const SALT = "motDePassAri"

// Characters used in password
const ALPHABET = "abcdefghijklmnopqrstuvwxyz" +
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                    "0123456789" +
                    "_-"

function GeneratePassword() {
    var mainPassword = document.getElementById("mainPassword").value
    var site = document.getElementById("site").value
    var version = document.getElementById("version").value

    // Verify inputs
    if (!mainPassword || !site || !version) return Display(FIELD_ERROR)

    mainPassword = mainPassword.trim()
    site = site.trim().toLowerCase()
    version = version.trim()

    if (mainPassword === "" || site === "" || version === "") return Display(FIELD_ERROR)
    

    var message = mainPassword + site + version
    // Hash password

    Argon2id.hash(message, SALT, 10, 16, 3, 12).then(hash => {
        var outputPassword = HexToPassword(hash)
        Display(outputPassword)
    })
}
function Display(text) {
    document.getElementById("output").value = text
}

function CopyToClipboard() {
    var val = document.getElementById("output").value
    navigator.clipboard.writeText(val)
}

function HexToPassword(hex) {
    // Convert hex to bytes
    const bytes = [];
    for (var i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16))
    }

    // Byte to bigint
    var num = 0n
    for (const byte of bytes) {
        num = (num << 8n) | BigInt(byte)
    }

    // Encoding
    var result = ''
    const base = BigInt(ALPHABET.length)
    while (num > 0n) {
        const index = Number(num % base)
        result = ALPHABET[index] + result
        num = num / base
    }

    return result
}