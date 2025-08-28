const { fstat } = require('fs');
const categorySchema = require('../Model/categorySchema');
const path = require('path');
const fs = require('fs');

async function addCategory(req, res) {
  let { name, discription } = req.body;
  let fileName = req.files;
  let fileNames = [];
  fileName.forEach(element => {
    fileNames.push(process.env.Host_Name + '/' + element.filename);
  });

  if (!name || !discription) {
    return res.status(400).send({ msg: 'Please Enter all the fields !' });
  }
  try {
    let category = new categorySchema({
      name,
      discription,
      image: fileNames,
    });
    await category.save();
    return res.status(200).send({ msg: 'category added successfully !' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: 'server error' });
  }
}

async function ReadCategory(req, res) {
  try {
    let GetAllCategory = await categorySchema.find();
    return res.send(GetAllCategory);
  } catch (error) {
    return res.send({ msg: 'Server Error' });
  }
}

async function UpdateCategory(req, res) {
  let { id } = req.params;
  try {
    let filename = req.files;
    let Filenames = [];

    if (Array.isArray(filename)) {
      filename.forEach(element => {
        Filenames.push(process.env.Host_Name + element.filename);
      });
    } else {
      Filenames.push(process.env.Host_Name + Filenames.filename);
    }
    let { changeName, changeDiscription } = req.body;
    let updateCategory = await categorySchema.updateOne(
      { _id: id },
      { name: changeName, discription: changeDiscription, image: Filenames },
      { new: true }
    );
    return res.send({ msg: 'Update Category successfully !' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: 'server Error' });
  }
}

async function DeleteCategory(req, res) {
  let { id } = req.params;
  try {
    let DeleteCategory = await categorySchema.findOne({ _id: id });
    if (!DeleteCategory) {
      return res.status(404).send({ msg: 'Category Not Found !' });
    }
    await DeleteCategory.deleteOne({ _id: id });

    let deletePromise = DeleteCategory.image.map(element => {
      return new Promise((resolve, reject) => {
        let deleteImage = path.join(
          __dirname,
          '../uploads',
          element.split('/').pop()
        );
        fs.unlink(deleteImage, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
    await Promise.all(deletePromise);
    return res.send({ msg: 'category delete successfully !' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: 'server Error' });
  }
}
module.exports = { addCategory, ReadCategory, UpdateCategory, DeleteCategory };
