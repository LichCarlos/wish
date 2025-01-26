const Common = require('./common');                   // 引入共用方法
const async = require('async');                        // 引入async
const WishModel = require('../models/wish');        // 引入wish表的model
const Constant = require('../constant/constant');  // 引入常量constant
// 配置导出对象
let exportObj = {
  getList,
  add
};
module.exports = exportObj;                        // 导出对象，供路由文件调用
// 获取许愿列表的方法
// 获取许愿列表方法
function getList(req, res) {
  // 定义一个async任务
  let tasks = {
    // 执行查询方法
    query: cb => {
      // 使用Sequelize的model的findAll方法查询
      WishModel
        .findAll({
          limit: 10,
          order: [['created_at', 'DESC']],
        })
        .then(function (result) {
          // 查询结果处理
          let list = [];                // 定义一个空数组list，用来存放最终结果
          // 遍历SQL查询出来的结果，处理后装入list
          result.forEach((v, i) => {
            let obj = {
              id: v.id,
              name: v.name,
              content: v.content
            };
            list.push(obj);
          });
          cb(null, list);     // 通过async提供的回调，返回数据到下一个async方法
        })
        .catch(function (err) {
          // 错误处理
          console.log(err);  // 打印错误日志
          // 通过async提供的回调，返回数据到下一个async方法
          cb(Constant.DEFAULT_ERROR);
        });
    }
  };
  // 让async自动控制流程
  async.auto(tasks, function (err, result) {
    if (err) {
      console.log(err)      // 如果错误存在，则打印错误
    } else {
      // 如果没有错误，则渲染index页面模板，同时将之前query方法获取的结果数组list

      res.render('index', {
        list: result['query']
      });
    }
  })
}
// 添加许愿方法
function add(req, res) {
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['name', 'content'], cb)
    },
    add: ['checkParams', (results, cb) => {
      WishModel
        .create({
          name: req.body.name,
          content: req.body.content
        })
        .then(function (result) {
          cb(null); // 插入结果成功处理
        })
        .catch(function (err) {
          console.log(err); // 打印错误日志
          cb(Constant.DEFAULT_ERROR);
        });
    }]
  };

  async.auto(tasks, function (err, result) {
    if (err) {
      console.log(err); // 打印错误日志
      let resultMsg = '失败';
      let msg = '添加失败，出现错误';
      if (err.code === 199) {
        msg = '添加失败，姓名和愿望都要填上哦';
      }
      res.render('result', {
        result: resultMsg,
        msg: msg
      });
    } else {
      res.render('result', {
        result: '成功！',
        msg: '添加成功，返回去看一下'
      });
    }
  });
}

