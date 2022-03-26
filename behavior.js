// 获取容器节点
var container = document.getElementById("container")
// 获取body 方便绑定事件
var body = document.body
var span = document.getElementById("span")
function CreBlackBlocks() {
  // 方块是否到达底部的标志
  this.flag = false
  // 创建一个新的黑块的方法
  this.creBlackBlockLine = function (container) {
    // 创建 div 节点
    var div = document.createElement("div")
    // 位置，表示当前方块在第几行
    var location
    container.appendChild(div)
    // 随机为 div 分配 class 属性
    var random = Math.random()
    if (random <= 0.33) {
      div.setAttribute("class", "test1")
      location = 0
    } else if (random > 0.33 && random <= 0.66) {
      div.setAttribute("class", "test2")
      location = 1
    } else {
      div.setAttribute("class", "test3")
      location = 2
    }
    return {
      // 返回一个对象，包含位置和节点
      myElement: div,
      myLocation: location,
    }
  }
  this.moveDownward = function (div) {
    // 获取有效属性
    var divStyles = window.getComputedStyle(div.myElement)
    // 获取内联样式样
    var divStyle = div.myElement.style
    var divStyleTop = parseInt(divStyles.top)
    var t = setInterval(() => {
      // 内联盖外联
      divStyleTop++
      divStyle.top = divStyleTop + "px"
      // 越界则删除
      if (divStyleTop >= 360) {
        clearInterval(t)
        div.myElement.remove()
      }
    }, 1)
  }
}
function Game(container) {
  // 存储创建每一行的返回值
  var newDiv
  // 存储创建的数组
  this.divElementArr = []
  // 每一行位置的数组
  this.divPosArr = []
  // 借助构造函数继承
  CreBlackBlocks.call(this, container)
  // 分数属性
  this.score = 0
  // 定义定义开始
  this.theGameStartsNow = function (game) {
    var t = setInterval(() => {
      newDiv = this.creBlackBlockLine(container)
      this.moveDownward(newDiv)
      game.divElementArr.push(newDiv.myElement)
      // 存储每一个方块第几行的数组
      game.divPosArr.push(newDiv.myLocation)
      // 没有按到方块结束的逻辑
      if (parseInt(window.getComputedStyle(this.divElementArr[0]).top) >= 357) {
        game.flag = true
      }
      // 结束执行的行为
      if (game.flag == true) {
        clearInterval(t)
        for (div in game.divElementArr) {
          game.divElementArr[div].remove()
        }
        alert("游戏结束！\n分数为：" + game.score)
        game.flag = false
        // 游戏数据初始化
        game.score = 0
        game.divElementArr = []
        game.divPosArr = []
      }
    }, 360)
    return t
  }
  // 定义游戏结束
  this.gameOver = function (t, game) {
    for (div in game.divElementArr) {
      game.divElementArr[div].remove()
    }
    clearInterval(t)
    alert("游戏结束！\n分数为：" + game.score)
    // 游戏数据初始化
    game.score = 0
    game.divElementArr = []
    game.divPosArr = []
  }
  // 键位点击做出相应的动作
  this.keyReaction = function (game, t) {
    body.addEventListener("keydown", function (event) {
      // 通过 switch 语句 根据当前的黑块的位置进入逻辑
      // Array.splice()方法 -> 作用，删除中的元素并返回一个数组，第一个参数 位置第二个参数数量
      switch (event.code) {
        case "ArrowLeft":
          game.removeBlock(game, t, 0)
          break
        case "ArrowDown":
          game.removeBlock(game, t, 1)
          break
        case "ArrowRight":
          game.removeBlock(game, t, 2)
          break

        default:
          break
      }
    })
  }
  this.removeBlock = function (game, t, val) {
    if (game.divPosArr[0] === val) {
      game.divPosArr.splice(0, 1)
      game.score += 10
      span.innerHTML = game.score
      game.divElementArr.splice(0, 1)[0].remove()
    } else {
      game.gameOver(t, game)
    }
  }
}

var game = new Game(container)
var t
// 游戏开始
var gameStart = document.getElementById("gameStart")
gameStart.addEventListener("click", function () {
  span.innerHTML = 0
  t = game.theGameStartsNow(game)
  game.keyReaction(game, t)
})
// 游戏结束
var gameEnd = document.getElementById("gameEnd")
gameEnd.addEventListener("click", function () {
  game.gameOver(t, game)
})
