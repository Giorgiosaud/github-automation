import {Flags} from '@oclif/core'

const FlagsSecretAndVars = {
  organization: Flags.string({
    char: 'o',
    description: 'A single string containing the organization name',
    required: true,
  }),
  repositories: Flags.string({
    char: 'r',
    description: 'Can be multiples repositories names',
    required: true,
    multiple: true,
  }),
  environment: Flags.string({
    char: 'e',
    description: 'If is set the env should be activated in the specified environment and create it if not exist',
    required: false,
  }),
  secrets: Flags.string({
    char: 's',
    description: 'Can be multiples secret names separated by : ej: name:secret',
    required: true,
    multiple: true,
  }),
  help: Flags.help({char: 'h'}),
}
export default FlagsSecretAndVars
