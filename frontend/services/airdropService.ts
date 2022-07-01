// TODO use env variable
// You have to add the protocol name here see https://stackoverflow.com/questions/69150593/next-js-localhost-is-prepended-when-making-external-api-call
const baseURL: string = 'http://127.0.0.1:8080';

interface UserRewardResponse {
  user: User;
  rewards: Reward[];
}

export const getRewardsByUser = async (
  accessToken: string
): Promise<UserRewardResponse> => {
  const requestOptions: RequestInit = {
    method: 'GET',
    mode: 'cors',
    headers: {
      authorization: 'Bearer ' + accessToken,
    },
  };
  try {
    const response = await fetch(
      `${baseURL}/airdrop/user/rewards`,
      requestOptions
    );
    const data: UserRewardResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

interface RepoRewardsResponse {
  repos: RepoRewards[];
}

interface RepoRewards {
  name: string;
  rewards: Reward[];
}

export const getRewardsByRepo = async (
  accessToken: string
): Promise<RepoRewardsResponse> => {
  const requestOptions: RequestInit = {
    method: 'GET',
    mode: 'cors',
    headers: {
      authorization: 'Bearer ' + accessToken,
    },
  };
  try {
    const response = await fetch(
      `${baseURL}/airdrop/repo/rewards`,
      requestOptions
    );
    const data: RepoRewardsResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const postPreCommitment = async (
  accessToken: string,
  rewardId: string,
  preCommitment: string
): Promise<void> => {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + accessToken,
    },
    body: JSON.stringify({ rewardId, preCommitment }),
  };
  try {
    await fetch(`${baseURL}/airdrop/precommit`, requestOptions);
    return;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getZKey = async (): Promise<ArrayBuffer> => {
  const requestOptions: RequestInit = {
    method: 'GET',
  };
  try {
    const response = await fetch(`${baseURL}/airdrop/zkey`, requestOptions);
    return response.arrayBuffer();
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getWasm = async (): Promise<ArrayBuffer> => {
  const requestOptions: RequestInit = {
    method: 'GET',
  };
  try {
    const response = await fetch(`${baseURL}/airdrop/wasm`, requestOptions);
    return response.arrayBuffer();
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

interface publicCommitmentResponse {
  commitments: string[];
}

export const getPublicCommitments = async (): Promise<string[]> => {
  const requestOptions: RequestInit = {
    method: 'GET',
  };
  try {
    const response = await fetch(
      `${baseURL}/airdrop/publiccommitments`,
      requestOptions
    );
    const data: publicCommitmentResponse = await response.json();
    return data.commitments;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
