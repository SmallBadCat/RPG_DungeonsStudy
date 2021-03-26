const Input = {};
cc.Class({
    extends: cc.Component,

    properties: {

    },
    // onLoad () {},

    start() {
        this.hero_speed = 150
        this.sp = cc.v2(0, 0)
        this.state = '';
        this.heroAni = this.node.getComponent(cc.Animation)
        cc.systemEvent.on('keydown', this.onkeydown, this)
        cc.systemEvent.on('keyup', this.onkeyup, this)
    },
    onkeydown(e) {
        Input[e.keyCode] = 1
    },
    setState(state) {
        if (this.state == state) return;
        this.state = state;
        this.heroAni.play(this.state)

    },
    onkeyup(e) {
        Input[e.keyCode] = 0
    },
    update(dt) {
        if (Input[cc.macro.KEY.a] || Input[cc.macro.KEY.left]) {
            // 向左
            this.sp.x = -1
            this.node.x -= this.hero_speed * dt
        } else if (Input[cc.macro.KEY.d] || Input[cc.macro.KEY.right]) {
            // 向右
            this.node.x += this.hero_speed * dt
            this.sp.x = 1
        } else {
            this.sp.x = 0
        }
        if (Input[cc.macro.KEY.w] || Input[cc.macro.KEY.up]) {
            // this.node.y += this.hero_speed * dt
            this.sp.y = 1
        } else if (Input[cc.macro.KEY.s] || Input[cc.macro.KEY.down]) {
            // this.node.y -= this.hero_speed * dt
            this.sp.y = -1
        } else {
            this.sp.y = 0
        }
        if (this.sp.x) {
            this.node.x += this.sp.x * this.hero_speed * dt
        } else if (this.sp.y) {
            this.node.y += this.sp.y * this.hero_speed * dt
        } else {

        }
        let state = '';
        if (this.sp.x == 1) {
            state = 'right'
        } else if (this.sp.x == -1) {
            state = 'left'
        } else if (this.sp.y == 1) {
            state = 'up'
        } else if (this.sp.y == -1) {
            state = 'down'
        }
        if (state) {
            this.setState(state)
        }
    },
});