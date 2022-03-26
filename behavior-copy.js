// 获取表格元素
var table = document.getElementsByTagName('table')
// 通过表格获取每一行
var tableTr = table[0].getElementsByTagName('tr')
// 获取第一行
var FirstTableTr = tableTr[0]

/*
 * 定义棋盘构造函数
 */
function CheckerBoard(FirstTableTr, tableTr) {
  // 定义一个方块变黑的元素
  var ChangeDark = function (tableElement) {
    var tableElementStyle = tableElement.style
    // console.log(tableElementStyle);
    tableElementStyle.backgroundColor = '#000'
  }
  // 第一行是否执行完毕的标志
  this.flag = false;
  // 增加一行的方法
  this.AddLines = function () {
    // 获取每一个单元格
    var FirstTableTrTd0 = FirstTableTr.getElementsByTagName('td')[0]
    var FirstTableTrTd1 = FirstTableTr.getElementsByTagName('td')[1]
    var FirstTableTrTd2 = FirstTableTr.getElementsByTagName('td')[2]
    // 通过随机数模块实现随机分布
    // console.log(Math.random());
    var random = Math.random();
    if (random <= 0.33) {
      ChangeDark(FirstTableTrTd0)
      return 0
    } else if (random > 0.33 && random <= 0.66) {
      ChangeDark(FirstTableTrTd1)
      return 1
    } else {
      ChangeDark(FirstTableTrTd2)
      return 2
    }
  }
  // 清除第一行
  this.moveline = function (FirstTableTr, cell) {
    // 获取每一个单元格的样式
    var FirstTableTrTd0Style = FirstTableTr.getElementsByTagName('td')[0].style
    var FirstTableTrTd1Style = FirstTableTr.getElementsByTagName('td')[1].style
    var FirstTableTrTd2Style = FirstTableTr.getElementsByTagName('td')[2].style
    FirstTableTr.style.transform = ''
    switch (cell) {
      case 0:
        FirstTableTrTd0Style.backgroundColor = ''
        break;
      case 1:
        FirstTableTrTd1Style.backgroundColor = ''
        break;
      case 2:
        FirstTableTrTd2Style.backgroundColor = ''
        break;

      default:
        break;
    }
  }

  // 表格移动的方法
  this.tblMove = function (stard, end, tableTr, cell, obj) {
    /*
    * 参数说明
    ? stard   -> 表示开始位置
    ? end     -> 表示结束位置
    ? tableTr -> 表示表格的每一行的类数组对象
    ? cell    -> 表示第几列单元格
    ? obj     -> 表示调用的对象
     */
    // 创建临时变量，表示当前行和下一行
    var index1 = 0;
    var index2 = 1;
    // 表格向下移动的函数
    var tblMoveDn = function (stard, end, tableTr, cell, obj) {
      var tblTrStyle = tableTr[index1].style
      var t = setInterval(() => {
        tblTrStyle.transform = "translateY(" + stard + "px)"
        stard ++
        if (stard > end) {
          clearInterval(t)
          /*
           * 停止之后需要完成的功能： 
           * 1 复位这一行的CSS样式
           * 2 删除当前节点并创建下一个
           */
          obj.moveline(tableTr[index1], cell)
          if (index1 === 4) {
            console.log(tableTr[4]);
          }
          if (index1 == 0) {
            obj.setFlag(true)
          }
          var tableElement = tableTr[index2].getElementsByTagName('td')[cell]
          ChangeDark(tableElement)
          index1++
          index2++
          // 当前元素是第五个以前的元素时，进行递归调用
          if (index1 <= 5) {
            tblMoveDn(0, 92, tableTr, cell, obj)
          }
        }
      }, 50);
    }
    // 调用移动函数
    tblMoveDn(0, 92, tableTr, cell, obj)
  }

  this.getFlag = function () {
    return this.flag
  }
  this.setFlag = function (flag) {
    this.flag = flag
    if (this.getFlag() === true) {
      var cell = this.AddLines();
      var result = this.tblMove(0, 92, tableTr, cell, this)
      this.setFlag(false)
    }

  }
}
/*
 * 定义游戏构造函数
 */
function Game(FirstTableTr, tableTr) {
  // 继承棋盘
  CheckerBoard.call(this, FirstTableTr, tableTr)
}
var checkerBoard = new CheckerBoard(FirstTableTr, tableTr);
var cell = checkerBoard.AddLines();
// var result = checkerBoard.tblMove(0, 92, tableTr, cell, checkerBoard)
var game = new Game(FirstTableTr, tableTr)
game.tblMove(0, 92, tableTr, cell, checkerBoard)