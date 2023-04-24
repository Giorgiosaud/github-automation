import { Octokit } from "octokit"

export default function ({ auth }: { auth: string} ): Octokit {
  return new Octokit({
    auth,
  })
}