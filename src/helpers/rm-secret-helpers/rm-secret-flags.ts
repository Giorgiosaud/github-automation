import {Flags} from '@oclif/core'

const RmSecretFlags = {
  environment: Flags.string({
    char: 'e',
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

  secrets: Flags.string({
    char: 's',
    description: 'Can be multiples secret names separated by space',
    multiple: true,
    required: true,
  }),
}
export default RmSecretFlags
