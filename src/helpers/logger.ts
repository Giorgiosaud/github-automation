import chalk from 'chalk'

export const preProcessed = (message: string): string => chalk.bgBlue.whiteBright(message)
export const info = (message: string): string => chalk.bgBlue.whiteBright(message)
export const processed = (message: string): string => chalk.bgGreen.whiteBright(message)
export const warning = (message: string): string => chalk.bgYellow.redBright(message)
export const normal = (message: string): string => chalk.bgBlack.whiteBright(message)
export const error = (message: string): string => chalk.bgRed.yellowBright(message)
