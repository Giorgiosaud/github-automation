export const validateRepoNames = (repositories:string[]):boolean|void => {
  const okRepoNames = repositories.every((repo: string) => {
    return /^(([a-z]|[A-Z]|\d)+-?)*\w$/.test(repo)
  })
  if (!okRepoNames) {
    throw new Error('The repository string must only contain numbers leters and dash')
  }
}

export const validateEqualLengths = (names:string[], values:string[]):boolean|void => {
  if (names.length !== values.length) {
    throw new Error('Secrets and values must be the same length')
  }
}
