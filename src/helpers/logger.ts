import chalk from 'chalk'
const log=console.log

export const PRE_PROCESSED = (...message:Array<string>) => log(chalk.bgBlue.whiteBright(message))
export const INFO = (...message:Array<string>) => log(chalk.bgBlue.whiteBright(message))
export const PROCESSED = (...message:Array<string>) => chalk.bgGreen.whiteBright(message)
export const WARNING = (...message:Array<string>) => chalk.bgYellow.redBright(message)
export const NORMAL = (...message:Array<string>) => chalk.bgBlack.whiteBright(message)
export const ERROR = (...message:Array<string>) => log(chalk.bgRed.yellowBright(message))
