import { useEffect } from "react"

type TickFunction = (deltaSeconds: number) => Promise<void>

type EnableTownClockFunction = () => void
type DisableTownClockFunction = () => void

type Clock = (fps: number, onTick: TickFunction) => [EnableTownClockFunction, DisableTownClockFunction]

export const clock: Clock = (fps: number, onTick: TickFunction) => {
    const deltaSeconds = 1 / fps

    let intervalId: NodeJS.Timeout | null = null;
    
    const enableTownClock = () => {

        if (intervalId != null) throw Error("TownClock is already running")

        intervalId = setInterval(async () => {
            await onTick(deltaSeconds)
        }, deltaSeconds * 1000)

    }

    const disableTownClock = () => {
        if (intervalId == null) throw Error("TownClock is not running")

        clearInterval(intervalId)
        intervalId = null;
    }
    
    return [
        enableTownClock,
        disableTownClock
    ]
}

const useClock = (fps: number, onTick: TickFunction) => {
    const [enableClock, disableClock] = clock(fps, onTick)

    useEffect(() => {
        enableClock()

        return () => {
            disableClock()
        }
    }, [])
}


export default useClock