let Koa = require('koa')
let app = new Koa(); //app可以实现常用的方法listen use
app.use((ctx,next)=>{
    ctx.body = '今天天气真好'
})

app.listen(3000)
