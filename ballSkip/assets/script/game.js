

cc.Class({
    extends: cc.Component,

    properties: {
        ball_node: cc.Node,
        blockPrefab: cc.Prefab,
        blockBox: cc.Node,
        block_count: {
            type: cc.Integer,
            default: 3
        },
        scoreLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      this.initPhysics()
      this.initBlock()
      this.score = 0
      this.node.on('touchstart', this.boost, this)
    },
    onDestroy() {
        this.node.off('touchstart', this.boost)
    },

    // 初始化平台
    initBlock() {
        this.lastBlockPos = this.ball_node.x
        this.blockList = []
        for (let i = 0; i < this.block_count; i++) {
            let block = cc.instantiate(this.blockPrefab)
            block.x = this.lastBlockPos
            block.y = 0

            let width = 80 + Math.floor(40 * (Math.random()>0.5?1:-1) * Math.random())
            cc.log(width)
            block.getComponent('block').init(width)
            this.blockBox.addChild(block)
            this.blockList.push(block)
            this.lastBlockPos += 200
        }
    },

    // 更新分数
    updateScore(increase) {
        this.score += increase
        this.scoreLabel.string = this.score
    },

    // 初始化 物理引擎
    initPhysics () {
        // 打开物理引擎
        let manager = cc.director.getPhysicsManager()

        manager.enabled = true
        manager.gravity = cc.v2(0, -2400)
    },

    // 点击屏幕加速
    boost() {
        if (this.ball_node.getComponent('ball').initVelocity) {
            let rigidBody = this.ball_node.getComponent(cc.RigidBody)
            rigidBody.linearVelocity = cc.v2(0, -1200)
            this.gameStart = 1
        }
    },

    start () {

    },

    // 获取最后一个块左边距，  box整体会移动
    getLastBlockPosX() {
        let x = 0
        for (let block of this.blockList) {
            if (block.x > x) {
                x = block.x
            }
        }
        return x
    },
    update (dt) {
        if (this.gameStart) {
            let speed = -350 * dt

            for (let block of this.blockList) {
                block.x += speed

                if (block.x < -cc.winSize.width / 2 - block.width / 2) {
                    // 通过一个 块加一分
                    this.updateScore(1)
                    block.x = this.getLastBlockPosX() + 200
                }
            }
        }
        if (this.ball_node.y < -cc.winSize.height / 2) {
            // this.gameStart = null

            //场景刷新
            cc.director.loadScene('game')
        }
    },
});
