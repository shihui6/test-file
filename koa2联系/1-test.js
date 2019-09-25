let Koa = require('./koa/application')
let app = new Koa()
app.use((req,res)=>{
    res.end('zhongguonihao')
})
app.listen(3000)
