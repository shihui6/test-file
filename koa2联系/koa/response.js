let response = {
    set body(value){
        this.res.statusCode = 200 //z只要调用了ctx.body = 'xxx'就会成功
        this._body = value
    },
    get body(){
        return this._body
    }
}
module.exports = response