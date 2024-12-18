
const gamingWindow = document.querySelector(".gaming-window") as HTMLElement
const root = document.querySelector(":root") as HTMLElement

gamingWindow.style.top = "50vh"
gamingWindow.style.transform = "translateY(-50%)"

const FONT_SIZE = 0.8
const gameAspect = 16 / 9

const onResize = () => {
    const windowAspect = window.innerWidth / window.innerHeight

    if (windowAspect > gameAspect) {
        // Window is wide

        gamingWindow.style.height = "98vh"
        gamingWindow.style.width = "unset"
        
        root.style.fontSize = `${FONT_SIZE * gameAspect}vh`

    } else {

        gamingWindow.style.width = "98vw"
        gamingWindow.style.height = "unset"
        
        root.style.fontSize = `${FONT_SIZE}vw`
    }

    console.log("w", window.innerWidth, "h", window.innerHeight)

}

onResize()
window.onresize = onResize