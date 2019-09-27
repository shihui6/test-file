let response = {
    set body(value){
        this.res.statusCode = 200 //z只要调用了ctx.body = 'xxx'就会成功
        this._body = value
        // 给body赋值的过程
    },
    get body(){
        return this._body
        // 取值的过程
    }
}

module.exports = response