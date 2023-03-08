const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
Query:{
     getSingleUser: async function(parent,args,context ) {
        const foundUser = await User.findOne({
          $or: [{ _id: context.user._id }, { username: args.username }],
        });
    
        if (!foundUser) {
            throw new AuthenticationError('You need to be logged in!');
        }
    
        return foundUser;
      },
      me: async function(parent,args,context ) {
        const foundUser = await User.findOne({
            _id: context.user._id ,
        });
    
        if (!foundUser) {
            throw new AuthenticationError('You need to be logged in!');
        }
    
        return foundUser;
      },

},
Mutation:{ 
     createUser:async function(parent, args ) {
        const user = await User.create(args);
    
        if (!user) {
            throw new AuthenticationError('You need to be logged in!');
        }
        const token = signToken(user);
        return {token, user} ;
      },
      // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
      // {body} is destructured req.body
       login:async function(parent, args) {
        const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });
        if (!user) {
            throw new AuthenticationError('You need to be logged in!');
        }
    
        const correctPw = await user.isCorrectPassword(args.password);
    
        if (!correctPw) {
          
        }
        const token = signToken(user);
        return{ token, user };
      },
      
    
      
    }
    

}
module.exports=resolvers