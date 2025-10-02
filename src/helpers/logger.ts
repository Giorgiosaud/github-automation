import colors from 'colorts'

export const preProcessed = (message: string): string => message
export const info = (message: string): string => message
export const processed = (message: string): string => message
export const warning = (message: string): string => message
export const normal = (message: string): string => message
export const error = (message: string): string => message
export default {
  info,
  preProcessed,
  processed,
  warning,
  normal,
  error,
}
