let http = require('http')
let context = require('./context')
let request = require('./request')
let response = require('./response')
class Koa{
    constructor(){
        this.callbackFn;
        this.context = context;
        this.request = request;
        this.response = response;
    }
    use(cb){
        this.callbackFn = cb 
    }

    createContext(req,res) {
        // Object.create方法的作用  ctx可以拿到context的属性，但是添加的时候不修改context
        let ctx = Object.create(this.context)
        ctx.request = Object.create(this.request)
        ctx.req = ctx.request.req = req;
        ctx.response = Object.create(this.response)
        ctx.res = ctx.response.res =  res
        return ctx ; //返回上下文对象
    }
    handleRequest(req,res){
        res.statusCode = 404; //页面默认找不到
        let ctx = this.createContext(req,res)
        this.callbackFn(ctx)  //当回到函数执行后，ctx.body值就会发生变化
        let body = ctx.body;
        if(typeof body === 'undefined'){
            res.end('Not Found')
        }else if(typeof body === 'string'){
            res.end(body)
        }
    }
    listen(){
        console.log(2)
        let server = http.createServer(this.handleRequest.bind(this))
        server.listen(...arguments)
    }
}
module.exports = Koa