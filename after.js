// after 在...之后

// 在某个时机之后再执行
function after(times, say) { // 高阶函数
  return function() {
    if(--times === 0) {
      say()
    }
  }
}


let hello = after(3, function say(){
  console.log('say hello')
})

hello()
hello()
hello()