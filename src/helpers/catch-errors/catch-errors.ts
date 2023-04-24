export default (error:unknown) => {
  if (typeof error  === 'string' || error instanceof Error) {
    this.error(error)
  }
}
