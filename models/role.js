const { Schema, model } = require('mongoose')

const RoleSchema = new Schema({

  role: {
    type: String,
    required: [true, 'Role is mandatory']
  }
});

RoleSchema.methods.toJSON = function () {
  const { __v, password, _id, ...role } = this.toObject();
  role.id = _id
  return role
}

module.exports = model('Role', RoleSchema)
