const colors = require('colors/safe')

export const preProcessed = (message: string): string => colors.bgBlue.white(message)
export const info = (message: string): string => colors.bgBlue.white(message)
export const processed = (message: string): string => colors.bgGreen.white(message)
export const warning = (message: string): string => colors.bgYellow.redBright(message)
export const normal = (message: string): string => colors.bgBlack.white(message)
export const error = (message: string): string => colors.bgRed.yellow(message)
