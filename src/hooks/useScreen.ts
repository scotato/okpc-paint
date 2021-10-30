import create from 'zustand'
import { useEffect } from 'react'

type ScreenState = {
  width: number
  height: number
  pixels: Pixel[][]
  isMouseDown: boolean
  isErasing: boolean
  lastPixelDown?: Pixel
}

const useStore = create(set => {
  const width = 22
  const height = 14
  const lastPixelDown = undefined as (undefined | Pixel);
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
    updatePixel,
    lastPixelDown,
    isErasing: false,
    isMouseDown: false,
    setLastPixelDown: (pixel: Pixel) => set((state: ScreenState) => ({ lastPixelDown: pixel })),
    togglePixel: (pixel: Pixel) => updatePixel(pixel, { ...pixel, on: !pixel.on }),
    setHovered: (pixel: Pixel, hovered: boolean) => updatePixel(pixel, { ...pixel, hovered }),
    setMouseDown: (isMouseDown: boolean) => set((state: ScreenState) => ({ isMouseDown }))
  }
})

export const useScreen = () => {
  const store = useStore(state => {
    const pixelsMatrix = state.pixels
    const pixels = pixelsMatrix.reduce((acc, row) => [...acc, ...row], [])
    const onPixelDown = (pixel: Pixel) => state.setLastPixelDown(pixel)
    const onPixelLeave = (pixel: Pixel) => state.setHovered(pixel, false)
    const onPixelEnter = (pixel: Pixel) => {
      state.isMouseDown
      ? state.updatePixel(pixel, {...pixel, hovered: true, on: !state.lastPixelDown?.on })
      : state.setHovered(pixel, true)
    }
  
    return { ...state, pixels, pixelsMatrix, onPixelDown, onPixelEnter, onPixelLeave }
  })

  useEffect(() => {
    const onMouseDown = () => store.setMouseDown(true)
    const onMouseUp = () => store.setMouseDown(false)

    document.body.addEventListener('mousedown', onMouseDown);
    document.body.addEventListener('mouseup', onMouseUp);

    return () => {
      document.body.removeEventListener('mousedown', onMouseDown);
      document.body.removeEventListener('mouseup', onMouseUp);
    }
  }, [store])

  return store
}
