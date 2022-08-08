declare interface Reward {
  date: Date;
  reward: number;
  url: string;
}

declare interface RewardsLastYear {
  month: string;
  reward: number;
}

declare interface TimeToDisclosure {
  time: number[];
  mean: number;
  standardDeviation: number;
}

declare interface Severities {
  critical: number;
  info?: number;
  medium?: number;
  high?: number;
}

declare interface Contributor {
  login: string;
  avatarUrl: string;
  htmlUrl: string;
  fixCount: number;
  rewards: Reward[];
  rewardSum: number;
  currency: string;
  rewardsLastYear: RewardsLastYear[];
  timeToDisclosure: TimeToDisclosure;
  severities: Severities;
  meanSeverity: number;
}

declare interface Issue {
  id: number;
  number: number;
  htmlurl: string;
  contributors: Contributor[];
}

declare interface Repo {
  name: string;
  owner: string;
  htmlurl: string;
  issues: Issue[];
}

declare interface RewardResponse {
  repos: Repo[];
}
