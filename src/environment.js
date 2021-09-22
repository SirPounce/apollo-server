
const getEnv = () => {
    return {
        uri: process.env.NEO4J_URI,
        user: process.env.NEO4J_USER,
        password: process.env.NEO4J_PASSWORD,
    }
}

export default getEnv;