import { client } from '../libs/db';

const query = 'select id,title,description,price,count from products join stocks on id=product_id order by id';

export const getProductsListService = async () => {
  console.log('get all products');

  try {
    await client.connect();

    const { rows } = await client.query(query);

    return rows;
    // eslint-disable-next-line no-useless-catch
  } catch (error) {
    throw error;
  } finally {
    client.end();
  }
};
