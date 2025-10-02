#!/usr/bin/env -S node  --no-deprecation --loader ts-node/esm --disable-warning=ExperimentalWarning

import {execute} from '@oclif/core'

await execute({development: true, dir: import.meta.url})
