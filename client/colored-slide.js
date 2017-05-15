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
        context.font = context.font.replace(/\d{2}/,h/15)
        canvas.width = w
        canvas.height = h
        var x = w/2 ,y = h/2
        var msg = ""
        const textComponents = []
        for(var i = 0;i<this.title.length;i++) {
            const newMsg = msg + this.title.charAt(i)
            if(context.measureText(newMsg).w > 0.7*w) {
                const textComponent = new TextComponent(msg,x-context.measureText(msg).w/2,y)
                textComponents.pust(textComponent)
                y += h/10
            }
            else {
                msg = newMsg
            }
        }
        textComponents.push(new TextComoponent(msg,x-context.measureText(msg).w/2,y))
        context.fillStyle = this.color
        context.fillRect(0,0,w,h)
        textComponents.forEach((textComponent)=>{
            textComponent.draw(context)
        })
        img.src = canvas.toDataURL()
        document.body.appendChild(img)
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
