const { AuthenticationError } = require('apollo-server-express');
const { User, Report } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate(["team"]);
        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    allUsers: async (parent, args, context) => {
      if (context.user) {
        const user = await User.find().populate(["team"]);
        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    singleReport: async (parent, args, context) => {
      if (context.user) {
        const report = await Report.findById(args.id).populate(["owner" ,"contributors"]);
        console.log(report);
        return report;
      }
    },
    userReports: async (parent, args, context) => {
      if (context.user) {
        const reports = await Report.find({contributors:context.user._id}).populate(["owner" ,"contributors"]);
        console.log(reports);
        return reports;
      }
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
    updateBio: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, {$set: { bio: args.bio}}, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateTeam: async(parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate(["team"])
        console.log(user.team)
        let userTeam = user.team
        userTeam.push(args._id)
        return await User.findByIdAndUpdate(context.user._id, {$set: { team: userTeam}}, { new: true });
      }
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

    updateTitle: async(parent,args,context) => {
      if(!context.user){
        //redirect to login
        throw new AuthenticationError('Incorrect credentials');
      }
      const report = await Report.findByIdAndUpdate(args.id, {$set: { title: args.title}}, { new: true });
      return report;
    },

    updateSynopsis: async(parent, args, context) => {
      if(!context.user){
        //redirect to login
        throw new AuthenticationError('Incorrect credentials');
      }
      //logged in
      const report = await Report.findByIdAndUpdate(args.id, { synopsis: args.synopsis }, { new: true });
      return report
    },

    updateContent: async(parent, args, context) => {
      if(!context.user){
        //redirect to login
        throw new AuthenticationError('Incorrect credentials');
      }
      //logged in
      const report = await Report.findByIdAndUpdate(args.id, { $set: { content: args.content }}, { new: true });
      return report
    }
  }
};

module.exports = resolvers;
