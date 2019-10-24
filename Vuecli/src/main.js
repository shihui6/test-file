// 找到要执行的核心文件
// 1要解析用户的参数  执行命令时携带的参数 例如:zhu-cli --help
const program = require('commander')
const path = require('path')
const {version} = require('./constants')

// 当用户需要执行命令时
const mapActions = {
    create:{
        alias:'c',
        description:'create a project',
        examples:[
            'zhu-cli create <project-name>'
        ]
    },
    config:{
        alias:'conf',
        description:'create project variable',
        examples:[
            'zhu-cli config set <k> <v>',
            'zhu-cli config get <k>'
        ]
    },
    '*':{
        alias:'',
        description:'command not found',
        examples:[]
    },
}
// Reflect.ownKeys()和Object.keys()区别是 Object.keys()返回属性key，但不包括不可枚举的属性
// Reflect.ownKeys() 返回所有属性key
// 通过Reflect.ownKeys()方法遍历，让mapActions里面的所有属性都有配置的命令

Reflect.ownKeys(mapActions).forEach((action)=>{
    program
        .command(action)  //配置命令的名字
        .alias(mapActions[action].alias) //命令的别名
        .description(mapActions[action].description) //命令对应的描述
        .action(()=>{
            if(action === "*"){
                console.log(mapActions[action].description)
            }else {
                require(path.resolve(__dirname,action))(...process.argv.slice(3))
            }
        })
})

// 监听用户的--help
program.on('--help',()=>{
    Reflect.ownKeys(mapActions).forEach((action)=>{
        mapActions[action].examples.forEach((examples)=>{
            console.log('  ',examples)
        })
    })
})

// 解析用户传递过来的参数
// console.log(process.argv)
program.version(version).parse(process.argv)