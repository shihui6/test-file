let proto = {}
// proto.url = proto.request.url
function defineGetter(property,name){
    // 自定义获取器 代理   总结这个__defineGetter__的意义
    proto.__defineGetter__(name,function(){
        return this[property][name]
    })
    // 类似于将ctx.body转成ctx.response.body
}
function defineSetter(property,name){
    proto.__defineSetter__(name,function(value){
        this[property][name] = value
        // 给ctx.response.body赋值
    })
}
defineGetter('request','url')
defineGetter('request','path')
defineGetter('response','body')
defineSetter('response', 'body')
module.exports = proto