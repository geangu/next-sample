import db from '../../../data/db.json';

const findProductById = (req, res) => {
  const { id } = req.query;
  const product = db.find((p) => p.id === Number(id));

  if (!product) {
    res.status(404).send('Not found');
    return;
  }

  res.json(product);
};

const findAndEditById = (req, res) => {
  const { id } = req.query;
  let product = db.find((p) => p.id === Number(id));

  if (!product) {
    res.status(404).send('Not found');
    return;
  }

  product.name = JSON.parse(req.body).name;

  res.json(product);
};

const deleteById = (req, res) => {
  const { id } = req.query;
  let product = db.find((p) => p.id === Number(id));

  if (!product) {
    res.status(404).send('Not found');
    return;
  }

  res.status(200).send(`Product ${id} deleted`);
};

const ProductController = (req, res) => {
  const { method } = req;
  if (method === 'GET') findProductById(req, res);
  else if (method === 'PUT') findAndEditById(req, res);
  else if (method === 'DELETE') deleteById(req, res);
};

export default ProductController;
