import create from "zustand"
import bgAudio from "./resources/jingle-bells.mp3"
import pingAudio from "./resources/ping.ogg"
import spawnAudio from "./resources/spawn.ogg"

const bg = new Audio(bgAudio)
const ping = new Audio(pingAudio)
const spawn = new Audio(spawnAudio)
bg.loop = true

const useStore = create((set) => ({
  hearts: 3,
  points: 0,
  startup: true,
  restart: false,
  bricks: [
    { right: true, long: true, y: 0, speed: 0.05, color: "tomato" },
    { right: true, long: false, y: 1, speed: 0.01, color: "red" },
    { right: true, long: true, y: 3, speed: 0.075, color: "blue" },
    { right: true, long: false, y: 3.5, speed: 0.135, color: "orange" },
    { right: true, long: false, y: 4, speed: 0.115, color: "forestgreen" },
    { right: true, long: false, y: 4.5, speed: 0.155, color: "orange" },

    { right: false, long: false, y: 1.25, speed: 0.175, color: "blue" },
    { right: false, long: true, y: 1.5, speed: 0.105, color: "lime" },
    { right: false, long: false, y: 2.5, speed: 0.085, color: "red" },
    { right: false, long: true, y: 3.5, speed: 0.02, color: "forestgreen" },
    { right: false, long: false, y: 4, speed: 0.145, color: "tomato" },
    { right: false, long: false, y: 5, speed: 0.09, color: "red" },
    { right: false, long: false, y: 5, speed: 0.165, color: "lime" },
  ],
  start: () => {
    set({ startup: false })
    bg.play()
    document.body.style.cursor = "none"
  },
  reset: () => {
    spawn.play((spawn.currentTime = 0))
    set({ points: 0, restart: true })
    set((state) => ({ hearts: state.hearts - 1 }))
    setTimeout(() => set({ restart: false }), 10)
  },
  contact: (e) => {
    if (e.contact.impactVelocity > 4) {
      set((state) => ({ points: state.points + 1 }))
    }
    ping.play((ping.currentTime = 0))
  },
  gameover: () => {
    set({ points: 0, hearts: 3, restart: false, startup: true })
  },
}))

export { useStore }
