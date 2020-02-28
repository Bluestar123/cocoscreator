

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    init(width) {
        let BoxCollider = this.node.getComponent(cc.PhysicsBoxCollider)
        BoxCollider.size.width = width
        this.node.width = width
    },

    start () {

    },

    // update (dt) {},
});
