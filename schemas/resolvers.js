const { AuthenticationError } = require('apollo-server-express');
const { User, Report } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
        return user;
      }

      throw new AuthenticationError('Not logged in');
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    addReport: async(parent, args, context) => {
      if(!context.user){
        //redirect to login on front end
        throw new AuthenticationError('Incorrect credentials');
      } 
      //logged in
      const report = await Report.create(args);
      return report
    },

    /* changeReportStructure: async(parent,args,context) => {
      //clear current report structure and update with new one
      // includes adding another chapter or changing order
    } */
  }
};

module.exports = resolvers;
