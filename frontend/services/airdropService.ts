// TODO use env variable
// You have to add the protocol name here see https://stackoverflow.com/questions/69150593/next-js-localhost-is-prepended-when-making-external-api-call
const baseURL: string = 'http://127.0.0.1:8080';

interface CommitmentResponse {
  reward: string;
}

export const postPreCommitment = async (
  preCommitment: string
): Promise<string> => {
  const requestOptions = {
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
