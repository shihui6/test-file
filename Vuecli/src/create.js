module.exports = (object)=>{
    console.log('create',object)
}

const axios = require('axios')
const ora = require('ora')
const Inquirer = require('inquirer')

// create的所有的逻辑

// create功能是创建项目
// 拉取你自己的所有的项目列出来，让用户选 安装哪个项目
// 选完后 在显示所有的版本号，1.0
// 可能还需要用户配置一些数据 来结合渲染我的项目



// https://api.github.com/orgs/zhu-cli/repos 获取组织下的仓库
const fetchRepoList = async ()=>{
    const {
        data
    } = await axios.get('https://api.github.com/orgs/zhu-cli/repos')
    return data
}

// 抓取tag列表
const fechTagList = async (repo) =>{
    const { data } = await axios.get(`https://api.github.com/repos/zhu-cli/${repo}/tags`)
    return data
}

// 封装loading效果
const waitFnloading = (fn, message) => async (...args) => {
    const spinner = ora(message)
    spinner.start() //开始加载
    let result = await fn()
     spinner.succeed() //关闭加载
     return result
}

module.exports = async (projectName) =>{
    // 1.获取项目的模板(所有的)
    let repos =await waitFnloading(fetchRepoList,'fetching template...')()
   
    repos = repos.map((item)=>item.name)
    console.log(repos)
    const {
        repo
    } = await Inquirer.prompt({
        name: 'repo',
        type: 'list',
        message: '请选择模板',
        choices: repos
    })

    // 在获取之前 显示loading 关闭loading 失败loading
    // 选择模板 inquirer

    // 下载ora(关于loading) 和 inquirer   npm i ora inquirer


    //2 通过当前选择的项目，获取对应的版本号
    let tags = await waitFnloading(fechTagList, 'fetching tags...')(repo)
    tags = tags.map((item) => item.name)
    const {tag} = await Inquirer.prompt({
        name: 'tag',
        type: 'list',
        message: 'please choise tags to create project',
        choices: tags
    })
    console.log(tags)

    // 把模板放到一个临时的目录里 存好，以备后期使用
    
}

