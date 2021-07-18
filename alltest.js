let fs = require('fs')
let MyPromise = require('./promise')
// let util = require('util')

// let read = util.promisify(fs.readFile)

// 高阶函数 参数是函数 返回值是函数
function promisify(fn){
  return function(...args){
    return new MyPromise((reslove, reject) => {
      fn(...args, function(err, data){
        if (err) reject()
        reslove(data)
      })
    })
  }
}

// let read = promisify(fs.readFile)

// read('name.txt', 'utf8').then(data => {
//   console.log(data)
// })


let fs1 = require('fs').promises
// Promise.all([1,2,3,fs1.readFile('name.txt', 'utf8')]).then(value => {
//   console.log(value)
// })

MyPromise.all([1,2,3,fs1.readFile('name3.txt', 'utf8')]).then(value => {
  console.log(value)
}, err => {
  console.log(666, err)
})