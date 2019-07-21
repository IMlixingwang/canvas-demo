class AutoPoint {
    //计数
    count = 0;
    constructor(props) {
        this.init(props);
    }
    //构造函数初始化
    init(props) {
        let AutoPointAttr = {
            number: 10,
            piece: 10,
            speed: 20,
            color: 'skyblue',
            position: [0, 0],
            circle: {
                r: 5,
                gap: 10
            },
        };
        if (!!props && props.canvas) this.canvas = document.getElementById(props.canvas);
        else this.canvas = document.getElementById("mycanvas")
        this.ctx = this.canvas.getContext('2d')
        Object.assign(this, Object.assign(AutoPointAttr, props))
    }
    //画圆的雏形
    drawShell() {
        const {
            number,
            piece,
            ctx,
            canvas,
            position,
            color,
            circle
        } = this.getAutoPointAttr();
        //每次重新画都要清除画布
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
        ctx.save();
        ctx.translate(position[0], position[1]);
        for (let i = 0; i < piece; i++) {
            ctx.rotate(2 * Math.PI / piece);
            for (let j = 0; j < number; j++) {
                if (this.count < number * i + j) {
                    ctx.restore();
                    return;
                }
                ctx.beginPath();
                ctx.save();
                ctx.translate(0, (circle.r*2+circle.gap) * (j + 1));
                ctx.fillStyle = color;
                ctx.arc(0, 0, circle.r, 0, 2 * Math.PI, true);
                ctx.fill();
                ctx.restore();
            }
        }
    }
    //计时任务
    repeatDraw() {
        this.drawShell();
        this.count++;
        if (this.count < this.piece * this.number) setTimeout(this.repeatDraw.bind(this), this.speed)
    }
    getAutoPointAttr() {
        return {
            canvas: this.canvas,
            number: this.number,
            piece: this.piece,
            speed: this.speed,
            color: this.color,
            position: this.position,
            canvas: this.canvas,
            ctx: this.ctx,
            circle:this.circle
        }
    }
    start() {
        this.repeatDraw();
    }
}