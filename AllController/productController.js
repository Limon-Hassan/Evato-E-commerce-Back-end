const categorySchema = require('../Model/categorySchema');
const productScema = require('../Model/productScema');

async function Createproducts(req, res) {
  let { name, discription, price, category } = req.body;
  if (!name || !discription || !price) {
    return res.status(400).send({ msg: 'please Enter all the fields !' });
  }
  try {
    let photo = req.files;
    let Photos = [];
    photo.forEach(element => {
      Photos.push(process.env.Host_Name + '/' + element.filename);
    });
    let product = new productScema({
      name,
      discription,
      category,
      photo: Photos,
      price,
    });
    await product.save();
    if (category && category.length > 0) {
      await categorySchema.updateMany(
        { _id: { $in: category } },
        { $push: { Product: product._id } }
      );
    }
    return res.status(200).send({ msg: 'Product added successfully !' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: 'server Error !' });
  }
}

module.exports = { Createproducts };
