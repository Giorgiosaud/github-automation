import axios, {AxiosResponse} from 'axios'

interface StatusChecks{
  app_id?: string;
  context:string;
}
interface PermissionsBody {
  allow_deletions:boolean;
  allow_force_pushes:boolean|null;
  block_creations:boolean;
  enforce_admins: boolean|null;
  required_conversation_resolution:boolean;
  required_linear_history:boolean;
  required_pull_request_reviews?:{
    bypass_pull_request_allowances:{
      apps?: string[];
      teams?: string[];
      users?: string[];
    }
    dismiss_stale_reviews:boolean;

    dismissal_restrictions:{
      apps?: string[];
      teams?: string[];
      users?: string[];
    };
    require_code_owner_reviews:boolean;
    required_approving_review_count:number;

  }
  required_status_checks: {
    checks:StatusChecks[]
    strict:boolean;
  } | null;
  restrictions:{
    apps?: string[];
    teams?: string[];
    users?: string[];
  }|null
}
const protectBranch = (token:string, organization:string, repo:string, branch:string):Promise<AxiosResponse> => {
  const config = {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${token}`,
    },
  }
  const url = `https://api.github.com//repos/${organization}/${repo}/branches/${branch}/protection`
  const bodyBase:PermissionsBody = {
    allow_deletions: false,
    allow_force_pushes: null,
    block_creations: false,
    enforce_admins: null,
    required_conversation_resolution: true,
    required_linear_history: false,
    required_pull_request_reviews: {
      bypass_pull_request_allowances: {},
      dismiss_stale_reviews: false,
      dismissal_restrictions: {},
      require_code_owner_reviews: false,
      required_approving_review_count: 1,

    },
    required_status_checks: {
      checks: [],
      strict: true,
    },
    restrictions: null,
  }
  return axios.put(url, bodyBase, config)
}

export default  protectBranch
