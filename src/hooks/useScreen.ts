import create from 'zustand'

type ScreenState = {
  width: number
  height: number
  pixels: Pixel[][]
}

const useStore = create(set => {
  const width = 22
  const height = 14
  const pixels = Array.from({ length: height }, (v, y) => {
    return Array.from({ length: width }, (v, x) => {
      return { x, y , on: false } as Pixel
  })})

  const updatePixel = (pixel: Pixel, update: Pixel) => set((state: ScreenState) => ({ 
    pixels: state.pixels.map((v, y) => {
      return state.pixels[y].map((v, x) => {
        const px = state.pixels[y][x]
        const isY = y === pixel.y
        const isX = x === pixel.x
        if (isY && isX) return update
        return px
      })
    })
  }))

  return {
    width,
    height,
    pixels,
    togglePixel: (pixel: Pixel) => updatePixel(pixel, { ...pixel, on: !pixel.on }),
    setHovered: (pixel: Pixel, hovered: boolean) => updatePixel(pixel, { ...pixel, hovered }),
  }
})

export const useScreen = () => useStore(state => {
  const pixelsMatrix = state.pixels
  const pixels = pixelsMatrix.reduce((acc, row) => [...acc, ...row], [])
  return { ...state, pixels, pixelsMatrix }
})
