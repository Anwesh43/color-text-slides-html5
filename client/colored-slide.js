class ColoredSlides {
    constructor() {
        this.slides = []
    }
}
class Slide {
    constructor(color,title) {
        this.color = color
        this.title = title
        this.textComponents = []
    }
    draw() {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        const img = document.createElement('img')
        const w = window.innerWidth,h = window.innerHeight
        canvas.width = w
        canvas.height = h
        context.fillStyle = this.color
        context.fillRect(0,0,w,h)
    }
}
class TextComoponent {
    constructor(text,x,y) {
        this.text = text
        this.x = x
        this.y = y
    }
    draw(context) {
        context.fillStyle = 'white'
        context.fillText(this.text,this.x,this.y)
    }
}
