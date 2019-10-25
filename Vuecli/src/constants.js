const {
    version
} = require('../package.json')

// 存储模板的位置
const downloadDirectory = process.platform //不同的系统的电脑process.platform不一样

module.exports = {
    version
}