import { main as getProductById } from './handler';
import { productMocks } from '../../mocks/products';

const productId = '7567ec4b-b10c-48c5-9345-fc73c48a80aa';

describe('getProductById', () => {
  it('should return the product', async () => {
    const result: any = await getProductById({ pathParameters: { productId } });

    expect(JSON.parse(result.body)).toEqual(productMocks[0]);
  })
});
