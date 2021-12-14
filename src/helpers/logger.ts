const colors = require('colors/safe')

export const preProcessed = (message: string): string => colors.bgBlue.whiteBright(message)
export const info = (message: string): string => colors.bgBlue.whiteBright(message)
export const processed = (message: string): string => colors.bgGreen.whiteBright(message)
export const warning = (message: string): string => colors.bgYellow.redBright(message)
export const normal = (message: string): string => colors.bgBlack.whiteBright(message)
export const error = (message: string): string => colors.bgRed.yellowBright(message)
