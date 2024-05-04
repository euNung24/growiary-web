import { setError } from '@/utils/api';

function withToken<V, T>(callback: (args: T) => Promise<Response>) {
  return async function (args: T): Promise<ApiSuccessResponse<V>> {
    const response = await callback(args);

    if (!response.ok) {
      throw await setError(response);
    }
    return response.json();
  };
}

export default withToken;
