import { main as getProductsList } from './handler';
import { productMocks } from '../../mocks/products';

describe('getProductsList', () => {
  it('should return the products list', async () => {
    const result: any = await getProductsList();

    expect(JSON.parse(result.body)).toEqual(productMocks);
  })
});
