// 高阶函数 一个函数的参数是另一个函数 回调函数 (函数柯里化)

// function say(callback) {
//   return () => {
//     callback()
//   }
// }

// say(function(){
//   console.log(9999)
// })()

// 函数柯里化
// 判断一个变量的类型
// function checkType (value, type) {
//   return Object.prototype.toString.call(value) === `[object ${type}]`
// }

// console.log(checkType('name', 'String'))

// 把一个函数的范围进行缩小,让函数变得更具体
function checkType(type){
  return function(value) {
    return Object.prototype.toString.call(value) === `[object ${type}]`
  }
}

const isString = checkType('String')
const isBoolean = checkType('Boolean')

const f1 = isString('name')
const f2 = isBoolean(true)
const f3 = isBoolean('aaa')
console.log(f1, f2, f3)

// 柯里化一定会导致闭包

// 实现通用的函数柯里化
const add = (a, b, c, d) => {
  return a+b+c+d
}

const curring = (fn, arr=[]) => {
  let len = fn.length
  return (...args) => {
    arr = arr.concat(args)
    if (arr.length < len) {
      return curring(fn, arr)
    }
    return fn(...arr)
  }
}

console.log(curring(add, [7])(1,2)(4))

// 函数反柯里化 让一个函数的范围变大
