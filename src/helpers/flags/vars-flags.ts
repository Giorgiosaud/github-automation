import {Flags} from '@oclif/core'

export const VarsFlags = {
  environment: Flags.string({
    char: 'e',
    description: 'If is set the env should be activated in the specified environment and create it if not exist',
    required: false,
  }),
  forced: Flags.boolean({
    char: 'f',
    description: 'If is set the env should be activated in the specified environment and create it if not exist',
    required: false,
  }),
  help: Flags.help({char: 'h'}),
  organization: Flags.string({
    char: 'o',
    description: 'A single string containing the organization name',
    required: true,
  }),
  repositories: Flags.string({
    char: 'r',
    description: 'Can be multiples repositories names',
    multiple: true,
    required: true,
  }),
  variables: Flags.string({
    char: 'v',
    description: 'Can be multiples variable names separated by -> ej: name->variable',
    multiple: true,
    required: true,
  }),
}
export default VarsFlags
