import pino from "pino"

const pinoLogger=pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
})
export const preProcessed = (...message: any[]): void => pinoLogger.info(message)
export const info = (...message: any[]): void => pinoLogger.info(message)
export const processed = (...message: any[]): void => pinoLogger.info(message)
export const warning = (...message: any[]): void => pinoLogger.warn(message)
export const normal = (...message: any[]): void => pinoLogger.info(message)
export const error = (...message: any[]): void => pinoLogger.error(message)

export default pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
})