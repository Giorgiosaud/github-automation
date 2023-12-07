import colors from 'colorts'

export const preProcessed = (message: string): string => colors(message).bgBlue.white.toString()
export const info = (message: string): string => colors(message).bgBlue.white.toString()
export const processed = (message: string): string => colors(message).bgGreen.white.toString()
export const warning = (message: string): string => colors(message).bgYellow.red.toString()
export const normal = (message: string): string => colors(message).bgBlack.white.toString()
export const error = (message: string): string => colors(message).bgRed.yellow.toString()
export default {
  error,
  info,
  normal,
  preProcessed,
  processed,
  warning,
}
