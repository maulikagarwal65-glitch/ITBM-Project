import { getProductComparisons } from '../../api/compare';
import productsData from '../../data/products.json';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { q, category, city, pincode, sort } = req.query;
  const result = getProductComparisons({ q, category, city, pincode, sort }, productsData);
  return res.status(200).json(result);
}
