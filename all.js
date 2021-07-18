// Promise.all

const fs = require('fs')

// 异步方法
// let obj = {}
// fs.readFile('./name.txt', 'utf8', function(err, data){
//   obj.name = data
//   console.log('hello', data)
// })

// 并不能获取到数据
// console.log(obj)

const after = (times, fn) => () => --times === 0 && fn()

const outer = after(1, () => {
  console.log(obj)
})

let obj = {}
fs.readFile('./name.txt', 'utf8', function(err, data){
  obj.name = data
  console.log('hello', data)
  outer()
})