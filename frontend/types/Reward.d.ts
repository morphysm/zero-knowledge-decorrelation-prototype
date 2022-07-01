declare interface Reward {
  claimed: boolean;
  id: string;
  suggestedReward: string;
  date: string;
  url: string;
  approvedReward?: string;
  approved?: boolean;
}
