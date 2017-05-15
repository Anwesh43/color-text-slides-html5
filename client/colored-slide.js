window.slides = []
class ColoredSlideFactory {
    static create(color,title) {
        const slide = new Slide(color,title)
        slide.render()
        window.slides.push(slide)
    }
    static createParallaxEffect() {
      window.currDiff = 0
      window.onscroll = ()=>{
        const imgs = slides.map((slide)=>slide.getImageDom())
        imgs.forEach((img,index)=>{
            if(window.scrollY > img.offsetTop) {
                  img.style.backgroundPosition = 'center'
                  img.style.backgroundAttachment = 'fixed'
            }
            else {
              img.style.backgroundPosition = ''
              img.style.backgroundAttachment = ''
            }
            console.log(img.offsetTop)
        })
      }
    }

}
class Slide {
    constructor(color,title) {
        this.color = color
        this.title = title
        this.img = document.createElement('div')
        document.body.appendChild(this.img)
        this.fH = window.innerHeight
        this.time = 0
    }
    setFinalH(h) {
        this.fh = h
        console.log(this.fH)
        this.render()
    }
    resize() {
        this.time = 0
        this.render()
    }
    render() {
        if(this.time == 0) {
            this.fh = window.innerHeight
        }
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        const w = window.innerWidth,h = window.innerHeight
        canvas.width = w
        canvas.height = this.fh
        this.img.style.width = w
        this.img.style.height = h
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
        context.fillRect(0,0,w,this.fH)
        console.log(textComponents)
        textComponents.forEach((textComponent)=>{
            textComponent.draw(context)
        })
        this.img.style.backgroundImage = `url(${canvas.toDataURL()})`
        this.time++
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
