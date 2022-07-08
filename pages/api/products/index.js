import db from '../../../data/db.json';

const productList = async (req, res) => {
  res.json(db);
};

export default productList;
