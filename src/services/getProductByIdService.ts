import { client } from '../libs/db';

const query = 'select id,title,description,price,count from products join stocks on id=product_id where id=$1';

export const getProductByIdService = async (productIid) => {
  console.log('getProductById', productIid);

  try {
    await client.connect();

    const { rows } = await client.query(query, [productIid]);

    return rows[0] || undefined;
    // eslint-disable-next-line no-useless-catch
  } catch (error) {
    throw error;
  } finally {
    client.end();
  }
};
