let url = require('url')
let request = {
    // get的作用
    get url(){
        return this.req.url
    },
    get path(){
        return url.parse(this.req.url).pathname
    }
}

module.exports = request