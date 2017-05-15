class ColoredSlides {
    constructor() {
        this.slides = []
    }
}
class Slide {
    constructor(color,title) {
        this.color = color
        this.title = title
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
