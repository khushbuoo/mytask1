const fs = require('fs');
const path = require('path');
const { ObjectId } = require('mongoose').Types;
const Model = require('../model/userModel');
const request = require('request');

module.exports.save = (data) => new Model(data).save();

module.exports.get = async (idOrEmail, fieldName = '_id') => {
    // console.log('zzz',idOrEmail);
    // console.log('yyy',idOrEmail);
  const data = await Model.findOne({
    [fieldName]: `${idOrEmail}`,
  });
  return data;
};

module.exports.getUsersMainProfileData = async (userId) => {
    try {
      const userData = await Model.aggregate([
        {
          $match: {
            _id: ObjectId(userId),
          },
        },
        {
          $project: {
            password: 0,
          },
        },
      ]);
      // console.log('userdata is',userData)
      return userData[0];
    } catch (error) {
      throw error;
    }
  };