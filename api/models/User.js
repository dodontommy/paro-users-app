const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: Object,
    required: false
  },
  is_admin: {
    type: Boolean,
    required: true,
    validate: {
      validator: function(v) {
        if (v) {
          if (this.type === 'internal') {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      },
      message: props => 'Only internal user types can be admins.'
    }
  },
  type: {
    type: String,
    required: true
  }
},{
    collection: 'User'
});

module.exports = mongoose.model('User', User);
