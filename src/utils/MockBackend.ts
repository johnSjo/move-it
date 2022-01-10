import { State } from '../store/Types';

export async function addOfferToMockBackend(state: State) {
  try {
    const result = await fetch(`http://localhost:5000/offers${state.id ? `/${state.id}` : ''}`, {
      method: state.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    });

    return result.json();
  } catch (err) {
    console.warn('Mock server not responding, is it started? (npm run server)');
    const offerId = state.id ?? Math.floor(Math.random() * 90000 + 10000);
    return { ...state, id: offerId };
  }
}

export async function getOfferFromMockBackend(id: string) {
  try {
    const result = await fetch(`http://localhost:5000/offers/${id}`);
    return result.json();
  } catch (err) {
    console.warn('Mock server not responding, is it started? (npm run server)');
    return {};
  }
}
