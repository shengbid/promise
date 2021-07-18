// 什么是promise (基于回调)
// 1.回调地狱
// 2.多个请求并发问题

// promise 是一个类 new promise
// 有三个状态 pending fulfilled rejected
// promise是等待态 默认提供两个函数 resolve变成成功 reject失败
// 抛出错误,变成reject
// 多次调用成功或者失败,只会执行第一次

let MyPromise = require('./promise')
let promise = new MyPromise((resolve, reject) => {
  // throw new Error('error')
  // reject('faild')
  setTimeout(()=>{

    resolve('success')
  })
})

promise.then((res) => {
  console.log(res)
})