window.slides = []
class ColoredSlideFactory {
    static create(color,title) {
        const slide = new Slide(color,title)
        slide.create()
        window.slides.push(slide.getImageDom())
    }
    static createParallaxEffect() {
      window.onscroll = ()=>{
        slides.forEach((img)=>{
            // if(window.scrollY > img.offsetTop) {
            //     img.style.position = 'fixed'
            // }
            // else {
            //     img.style.position = ''
            // }
            console.log(img.offsetTop)
        })
      }
    }

}
class Slide {
    constructor(color,title) {
        this.color = color
        this.title = title
    }
    create() {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        const img = document.createElement('img')
        const w = window.innerWidth,h = window.innerHeight
        canvas.width = w
        canvas.height = h
        context.font = context.font.replace(/\d{2}/,h/12)
        console.log(context.font)
        var x = w/2 ,y = h/2
        var msg = ""
        const textComponents = []
        for(var i = 0;i<this.title.length;i++) {
            const newMsg = msg + this.title.charAt(i)
            if(context.measureText(newMsg).width > 0.7*w) {
                const textComponent = new TextComponent(msg,x-context.measureText(msg).width/2,y)
                textComponents.push(textComponent)
                y += h/10
                msg = ""
                if(this.title.charAt(i) != ' ') {
                    msg = this.title.charAt(i)
                }
            }
            else {
                msg = newMsg
            }
        }
        textComponents.push(new TextComponent(msg,x-context.measureText(msg).width/2,y))
        context.fillStyle = this.color
        context.fillRect(0,0,w,h)
        console.log(textComponents)
        textComponents.forEach((textComponent)=>{
            textComponent.draw(context)
        })
        img.src = canvas.toDataURL()
        document.body.appendChild(img)
        this.img = img
    }
    getImageDom() {
        return this.img
    }
}
class TextComponent {
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
