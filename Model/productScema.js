const mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      trim: true,
    },
    discription: {
      type: String,
      require: true,
    },
    photo: {
      type: Array,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    Totoalreviews: {
      type: Number,
      default: 0,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
      },
    ],
    stock: {
      type: String,
    },
    price: {
      type: Number,
      require: true,
    },
    discountPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Products', ProductSchema);
