import chalk from 'chalk'
const log=console.log

export const PRE_PROCESSED = (...message: Array<string>): void => log(chalk.bgBlue.whiteBright(message))
export const INFO = (...message: Array<string>): void => log(chalk.bgBlue.whiteBright(message))
export const PROCESSED = (...message: Array<string>): void =>log(chalk.bgGreen.whiteBright(message))
export const WARNING = (...message: Array<string>): void => log(chalk.bgYellow.redBright(message))
export const NORMAL = (...message: Array<string>): void => log(chalk.bgBlack.whiteBright(message))
export const ERROR = (...message: Array<string>): void => log(chalk.bgRed.yellowBright(message))
