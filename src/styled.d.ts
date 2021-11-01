// styled.d.ts
import 'styled-components';
import { Color, Grayscale } from './theme'
import { Window } from './hooks/useWindow'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {[key in Color]: string}
    grayscale: {[key in Grayscale]: string}
    window: Window
    screen: {
      width: number
      height: number
      aspectRatio: number
    }
  }
}
