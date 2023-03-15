const { AuthenticationError } = require("apollo-server-express");
const { Volunteer, Charity, Event, GoogleVolunteer } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    allVolunteers: async () => {
      return Volunteer.find();
    },

    volunteer: async (parent, { volunteerId }) => {
      return Volunteer.findOne({ _id: volunteerId });
    },

    allCharity: async () => {
      return Charity.find();
    },

    charity: async (parent, { charityId }) => {
      return Charity.findOne({ _id: charityId });
    },
    allEvents: async () => {
      return Event.find();
    },
//GY - Unsure if this would be the find one Event query
    event: async (parent, { eventId }) => {
      return Event.findOne({ _id: eventId });
    },

    googleVolunteer: async (parent, { _id }) => {
      return GoogleVolunteer.findOne({ _id: _id });
    },
  },

  Mutation: {
    createVolunteer: async function (parent, args) {
      const userv = await Volunteer.create(args);

      if (!userv) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const token = signToken(userv);
      return { token, userv };
    },
    createGoogleVolunteer: async function (parent, args) {
      try {
        let googlev = await GoogleVolunteer.findOne({ email: args.email });
        console.log(googlev);
        if (!googlev) googlev = await GoogleVolunteer.create(args);

        const token = signToken(googlev);
        return {
          token,
          googlev,
        };
      } catch (err) {
        console.log(err);
      }
    },

    createCharity: async function (parent, args) {
      const userc = await Charity.create(args);

      if (!userc) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const token = signToken(userc);
      return { token, userc };
    },
    // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
    // {body} is destructured req.body
    loginAsVolunteer: async function (parent, args) {
      const userv = await Volunteer.findOne({
        $or: [{ username: args.username }, { email: args.email }],
      });
      if (!userv) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const correctPw = await userv.isCorrectPassword(args.password);

      if (!correctPw) {
      }
      const token = signToken(userv);
      return { token, userv };
    },
    loginAsGoogleVolunteer: async function (parent, args) {
      const googlev = await GoogleVolunteer.findOne({ email: args.email });
      if (!googlev) {
        throw new AuthenticationError("Account does not exist");
      }
      const token = signToken(googlev);
      return { token, googlev };
    },
    loginAsCharity: async function (parent, args) {
      const userc = await Charity.findOne({
        $or: [{ username: args.username }, { email: args.email }],
      });
      if (!userc) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const correctPw = await userc.isCorrectPassword(args.password);

      if (!correctPw) {
      }
      const token = signToken(userc);
      return { token, userc };
    },

    addEvent: async function (parent, args, context) {
      console.log(args);
      console.log(context);
      console.log(context.user);
      console.log(context.user._id);
      try {
        const newEvent = await Event.create(args.savedEvent);

        // const updatedCharity = await Charity.findOneAndUpdate(
        //   { _id: context.user._id },
        //   { $addToSet: { savedEvent: newEvent._id } },
        //   { new: true, runValidators: true }
        // );
        // console.log(updatedCharity)
        // return updatedCharity;
      } catch (err) {
        console.log(err);
        // throw new AuthenticationError('You need to be logged in!');
      }
    },

    removeEvent: async function (parent, args, context) {
      const updatedCharity = await Charity.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedEvents: { title: args.title } } },
        { new: true }
      );
      if (!updatedCharity) {
        throw new AuthenticationError("You need to be logged in!");
      }
      return updatedCharity;
    },
  },
};

module.exports = resolvers;
