let Koa = require('./koa/application')
let app = new Koa()
app.use((ctx) => {
    console.log(ctx.req.path)
    console.log(ctx.path)
    ctx.body = 'dajiahaowoshi zhangjiahnag'

})
app.listen(3000)