

cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    ctor() {
        this.initVelocity = 0
    },
    // LIFE-CYCLE CALLBACKS:
    onBeginContact(contact, selfCollider, otherCollider) {
        let rigidBody = this.node.getComponent(cc.RigidBody)
        if (!this.initVelocity) {
            // 第一次
            this.initVelocity = rigidBody.linearVelocity.y
        } else {
            rigidBody.linearVelocity = cc.v2(0, this.initVelocity)
        }
    },
    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
