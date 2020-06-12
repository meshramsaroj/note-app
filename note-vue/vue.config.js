// vue.config.js
module.exports = {
    devServer: {
        proxy: {
            "/info": { "target": "/", "secure": false, "logLevel": "debug" },
        },
    }
}