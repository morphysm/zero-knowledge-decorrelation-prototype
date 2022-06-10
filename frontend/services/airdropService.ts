// TODO use env variable
// You have to add the protocol name here see https://stackoverflow.com/questions/69150593/next-js-localhost-is-prepended-when-making-external-api-call
const baseURL: string = 'http://127.0.0.1:8080';

interface RewardResponse {
  user: string;
  rewards: Reward[];
}

interface Reward {
  // TODO can we determine if a reward was paid out?
  paid: boolean;
  id: string;
  // Value could be monetary value or NFT, to be defined
  value: string;
}

export const getRewards = async (
  accessToken: string
): Promise<RewardResponse> => {
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Test: 'Test',
      Authorization: 'Bearer ' + accessToken,
    }),
  };
  try {
    const response = await fetch(`${baseURL}/airdrop/rewards`, requestOptions);
    const data: RewardResponse = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

interface CommitmentResponse {
  reward: string;
}

export const postPreCommitment = async (
  preCommitment: string
): Promise<string> => {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ preCommitment }),
  };
  try {
    const response = await fetch(
      `${baseURL}/airdrop/precommit`,
      requestOptions
    );
    const data: CommitmentResponse = await response.json();
    console.log(data);
    return data.reward;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
