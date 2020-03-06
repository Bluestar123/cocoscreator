

cc.Class({
    extends: cc.Component,

    properties: {
      colorAtlas: cc.SpriteAtlas, // 图集 改变颜色
    },

    // LIFE-CYCLE CALLBACKS:
    onTouchStart(e) {
      // 拖动违规 ， 自动回到初始位置，  记录初始位置
      this.canMove = true
      this.startPos = this.node.position

      let arr = window.game.blockNodeArr[this.node.baseIndex]
      if (this.node.blockIndex !== arr[arr.length - 1].blockIndex) {
        this.canMove = false
      }
    },
    onTouchEnd(e) {
      if (!this.canMove) return
      let canPlace = window.game.placeBlock(this.node)
      if (!canPlace) {
        this.node.position = this.startPos
      }
    },
    onTouchMove(e) {
      if (!this.canMove) return
      let delta = e.getDelta()
      this.node.x += delta.x
      this.node.y += delta.y
    },
    onDestroy() {
      this.node.off('touchstart', this.onTouchStart, this)
      this.node.off('touchmove', this.onTouchMove, this)
      this.node.off('touchend', this.onTouchEnd, this)
    },
    onLoad () {
      this.node.on('touchstart', this.onTouchStart, this)
      this.node.on('touchmove', this.onTouchMove, this)
      this.node.on('touchend', this.onTouchEnd, this)
    },
    init (blockIndex) {
      // 第几个卡         改变图片
      this.node.getComponent(cc.Sprite).spriteFrame = this.colorAtlas.getSpriteFrame(blockIndex)
      this.node.width = blockIndex * 40 + 80
    },
    start () {

    }
    // update (dt) {},
});
