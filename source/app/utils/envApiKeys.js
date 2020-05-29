const getEnvApiKeys = () => {
    const allApiKeys = JSON.parse(process.env.API_KEYS) || {}
    return allApiKeys
}

const getEnvApiKey = name => {
    const allApiKeys = JSON.parse(process.env.API_KEYS  || "{}")
    return allApiKeys[name]
}

const delEnvApiKey = name => {
    const allApiKeys = JSON.parse(process.env.API_KEYS)
    delete allApiKeys[name]
    process.env.API_KEYS = JSON.stringify(allApiKeys)
}

const setEnvApiKey = ({ name, decrypted }) => {
    const allApiKeys = JSON.parse(process.env.API_KEYS)
    allApiKeys[name] = {
        name,
        decrypted
    }
    process.env.API_KEYS = JSON.stringify(allApiKeys)
}

module.exports = {
    getEnvApiKeys,
    getEnvApiKey,
    delEnvApiKey,
    setEnvApiKey
}