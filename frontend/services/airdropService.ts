// TODO use env variable
// You have to add the protocol name here see https://stackoverflow.com/questions/69150593/next-js-localhost-is-prepended-when-making-external-api-call
const baseURL: string = 'http://127.0.0.1:8080';

interface RewardResponse {
  user: User;
  rewards: Reward[];
}

export const getRewards = async (
  accessToken: string
): Promise<RewardResponse> => {
  const requestOptions: RequestInit = {
    method: 'GET',
    // credentials: 'include',
    mode: 'cors',
    headers: {
      authorization: 'Bearer ' + accessToken,
    },
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
  accessToken: string,
  rewardId: string,
  preCommitment: string
): Promise<string> => {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + accessToken,
    },
    body: JSON.stringify({ rewardId, preCommitment }),
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
