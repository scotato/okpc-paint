import { useWindowSize } from '@react-hook/window-size'

export type Window = {
  width: number
  height: number
  square: number
  isLandscape: boolean
  isPortrait: boolean
}

export const useWindow = () => {
  const [width, height] = useWindowSize()
  const isLandscape = width > height
  const isPortrait = width < height
  const square = isLandscape ? height : width
  return { width, height, square, isLandscape, isPortrait } as Window
}