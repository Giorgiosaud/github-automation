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

export const validateSecrets = (secrets:string[]):boolean|void => {
  const okSecrets = secrets.every((secret: string) => {
    return /^.+->.+$/.test(secret)
  })
  if (!okSecrets) {
    throw new Error('The secret string must only contain numbers leters and dash and name and value must be separated by ->')
  }
}
