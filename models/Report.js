const mongoose = require('mongoose');

const { Schema } = mongoose;

const reportSchema = new Schema({
  title: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  synopsis: {
    type: String,
  },
  contributors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  content: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    enum: ['Unallocated', 'Draft','Review','Completed','Published'],
    required: true,
  }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
