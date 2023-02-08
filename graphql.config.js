module.exports = {
    projects: {
        app: {
            extensions: {
                endpoints: {
                    default: {
                        url: process.env.NUXT_ENV_API_URI + "/graphql",
                    }
                }
            }
        }
    }
}
