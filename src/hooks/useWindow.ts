import { useWindowSize } from '@react-hook/window-size'

export const useWindow = () => {
  const [width, height] = useWindowSize()
  const isLandscape = width > height
  const isPortrait = width < height
  const square = isLandscape ? height : width
  return { width, height, square, isLandscape, isPortrait }
}