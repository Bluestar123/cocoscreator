
cc.Class({
    extends: cc.Component,

    properties: {
        blockLayerNode: cc.Node,
        blockPrefab: cc.Prefab,
        baseNodeArr: [cc.Node]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      window.game = this
      // 确定块的y轴位置 [[0,1], [2], []] , 每个轴上的块
      this.blockNodeArr = [[], [], []]
      this.blockNum = 3
      this.initBlock(this.blockNum)
    },

    start () {

    },
    // 初始化方块
    initBlock (num) {
      // 预制体默认位置 0,0； 代码控制改变位置
      for(let i =0; i< num; i++) {
        let blockNode = cc.instantiate(this.blockPrefab)
        this.blockLayerNode.addChild(blockNode)

        let blockIndex = num - i - 1

        blockNode.getComponent('block').init(blockIndex)
        // 代码控制位置
        blockNode.x = this.baseNodeArr[0].x
        blockNode.y = -122 + 46 * i

        // 记录下自己的编号 和 初始轴
        blockNode.baseIndex = 0
        // blockIndex 是定义好的，不会改变。代表了 大小
        blockNode.blockIndex = blockIndex // 大数在下，小数在上， 小数的块 宽度小

        // 默认都是0 号开始
        this.blockNodeArr[0].push(blockNode)
      }
    },
    baseIndexCheck(pos) {
      // 判断坐标是否在 合适的位置,  i表示在那个轴上
      for(let i=0;i<this.baseNodeArr.length;i++) {
        let baseNode = this.baseNodeArr[i]
        if (pos.x >= baseNode.x - baseNode.width / 2 && pos.x <= baseNode.x + baseNode.width / 2) {
          return i
        }
      }
      return -1
    },
    placeBlock(blockNode) {
      let baseIndex = this.baseIndexCheck(blockNode.position)
      // 非法
      if (baseIndex === -1) return false

      // 没有移动
      if (blockNode.baseIndex === baseIndex) {
        return false
      }


      let arr = this.blockNodeArr[baseIndex]
      // 只能小的在大的上面.
      if (arr.length && arr[arr.length - 1].blockIndex <= blockNode.blockIndex) {
        return false
      }
      // arr = this.blockNodeArr[blockNode.baseIndex]
      // 只能移动最上面的
      // if (arr.length && blockNode.blockIndex !== arr[arr.length-1].blockIndex) {
      //   return false
      // }

      // 移动到的第几个 块
      let baseNode = this.baseNodeArr[baseIndex]

      blockNode.x = baseNode.x

      // 把最上面的拿出来 , 最后一个拿出来
      this.blockNodeArr[blockNode.baseIndex].pop()
      blockNode.baseIndex = baseIndex
      // 新轴插入 滑块
      this.blockNodeArr[baseIndex].push(blockNode)

      let length = this.blockNodeArr[baseIndex].length

      blockNode.y = -122 + 46 * (length-1)

      if (this.blockNodeArr[2].length === this.blockNum) {
        console.log('成功')
      }
      return true
    }
    // update (dt) {},
});
