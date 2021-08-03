const mongoose = require('mongoose');

const { Schema } = mongoose;

const reportSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  synopsis: {
    type: String,
    required: true,
  },
  contributors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  content: {
    type: Object,
    required: true,
  },
  state: {
    type: String,
    enum: ['Unallocated', 'Draft','Review','Completed','Published']
    required: true,
  }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
