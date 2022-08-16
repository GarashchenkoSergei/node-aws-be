import { client } from '../libs/db';
import { getProductByIdService } from './getProductByIdService';

const queryInsertIntoProducts = 'insert into products(title,description,price) values ($1,$2,$3) returning id';
const queryInsertIntoStocks = 'insert into stocks(product_id,count) values ($1,$2)';

export const createProductService = async (payload) => {
  console.log('createProduct', payload);
  const { title, description, price, count } = payload;

  try {
    await client.connect();

    const { rows } = await client.query(queryInsertIntoProducts, [title, description, price]);
    const { id } = rows[0];

    await client.query(queryInsertIntoStocks, [id, count]);

    return await getProductByIdService(id);
    // eslint-disable-next-line no-useless-catch
  } catch (error) {
    throw error;
  } finally {
    client.end();
  }
};
