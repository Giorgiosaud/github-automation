import axios, {Axios, AxiosResponse} from 'axios'

/* eslint-disable camelcase */
interface StatusChecks{
  context:string;
  app_id?: string;
}
interface PermissionsBody {
  required_status_checks: null | {
    strict:boolean;
    checks:StatusChecks[]
  };
  enforce_admins: boolean|null;
  required_pull_request_reviews?:{
    dismissal_restrictions:{
      users?: string[];
      teams?: string[];
      apps?: string[];
    };
    dismiss_stale_reviews:boolean;

    require_code_owner_reviews:boolean;
    required_approving_review_count:number;
    bypass_pull_request_allowances:{
      users?: string[];
      teams?: string[];
      apps?: string[];
    }

  }
  restrictions:null|{
    users?: string[];
    teams?: string[];
    apps?: string[];
  }
  required_linear_history:boolean;
  allow_force_pushes:null|boolean;
  allow_deletions:boolean;
  block_creations:boolean;
  required_conversation_resolution:boolean;
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
    required_status_checks: {
      strict: true,
      checks: [],
    },
    enforce_admins: null,
    required_pull_request_reviews: {
      required_approving_review_count: 1,
      dismissal_restrictions: {},
      dismiss_stale_reviews: false,
      require_code_owner_reviews: false,
      bypass_pull_request_allowances: {},

    },
    restrictions: null,
    required_linear_history: false,
    allow_force_pushes: null,
    allow_deletions: false,
    block_creations: false,
    required_conversation_resolution: true,
  }
  return axios.put(url, bodyBase, config)
}

export default  protectBranch
