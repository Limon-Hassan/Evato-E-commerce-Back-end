const mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      trim: true,
    },
    discription: {
      type: String,
    },
    image: {
      type: Array,
      required: true,
    },
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Category', CategorySchema);
