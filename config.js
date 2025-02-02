// 默认dev配置
const config = {
  // 是否调试模式
  DEBUG: true,
  // MySQL数据库配置
  MYSQL: {
    host: 'localhost',
    database: 'wish_db',
    username: 'root',
    password: '123456'
  }
};

if (process.env.NODE_ENV === 'production') {
  // 生产环境MySQL数据库配置
  config.MYSQL = {
    host: 'localhost',
    database: 'wish',
    username: 'root',
    password: '123456'
  };
}
// 导出配置
module.exports = config;
