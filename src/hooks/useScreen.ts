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
    const screencode = gridToPairOfUint160(state.pixels)
    return { ...state, screencode, pixels, pixelsMatrix, onPixelDown, onPixelEnter, onPixelLeave }
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

  console.log('screen code', store.screencode)

  return store
}

function gridToPairOfUint160(pixels: Pixel[][]) {
  let gridR = pixels.map((val, index) =>
    [pixels].map((row) => row[index]).reverse()
  );
  let grid2R = gridR[0].map((val, index) =>
    gridR.map((row) => row[index]).reverse()
  )[0];
  let leftPart = 0n;
  let rightPart = 0n;
  for (let i = 0; i < 14; i++) {
    for (let j = 0; j < 22; j++) {
      const power = BigInt(13 - i) + 14n * BigInt(j % 11);
      const diff = grid2R[i][j].on ? 2n ** power : 0n;
      if (j < 11) {
        leftPart += diff;
      } else {
        rightPart += diff;
      }
    }
  }

  return {
    leftCode: leftPart.toString(),
    rightCode: rightPart.toString(),
  }
}
