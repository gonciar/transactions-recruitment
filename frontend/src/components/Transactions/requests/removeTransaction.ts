import { RequestResult } from '../../../types/api';
import { API_URL } from '../../../utils/constants';
import { fetchTS } from '../../../utils/fetchTS';

export async function removeTransaction(id: number): Promise<RequestResult<null>> {
  try {
    const resp = await fetchTS<null>(`${API_URL}/transactions/${id}`, {
      method: 'DELETE',
    });
    return { status: 'loaded', payload: resp };
  } catch (error) {
    if (error instanceof Response) {
      const err = new Error(`transaction could not be deleted: ${error.statusText}`);
      return { status: 'error', error: err };
    } else {
      const err = new Error('something went wrong');
      return { status: 'error', error: err };
    }
  }
}
