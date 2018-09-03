// // const User = require('../modules/user/user-model');

// const createNew = (data, Model) => {
//   const user = new Model(data);
//   return user.save();
// };

// const updateData = (_id, update, Model) => Model.findByIdAndRemove({ _id }, update, {
//   upsert: true,
//   new: true,
//   runValidators: true,
// });

// const findUserById = (_id, Model) => Model.findById(_id);

// const removeById = (_id, Model) => Model.findByIdAndRemove({ _id });

// const findUser = (query, Model) => Model.find(query);

// const findOne = (query, Model) => Model.findOne(query);

// const findAndRemove = (query, Model) => Model.findOne(query);

// module.exports = {
//   createNew,
//   updateData,
//   findUserById,
//   removeById,
//   findUser,
//   findOne,
//   findAndRemove,
// };
