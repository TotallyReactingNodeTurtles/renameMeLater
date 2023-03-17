const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Auth{
    token:String
    userv: Volunteer
    googlev: GoogleVolunteer
    userc: Charity
}

type Volunteer{
    _id:ID
    fullName:String!
    username:String!
    email:String!
    skills:String
    password:String!
    title:String
    savedEvents:[ID]!
    
}

type Charity{
    _id:ID
    password:String!
    username:String!
    email:String!
    savedEvents:[Event]
    websiteURL:String!
    description:String
    address:String
    facebook:String
    instagram:String
    twitter:String
    phoneNumber:String
    charityName:String
}

type Event{
    _id:ID
    title:String
    description:String!
    image:String
    date:String!
    address:String!
    savedCharityID: Charity
    savedCharity: String!
}

input inputEvent {
    title:String!
    description:String!
    image:String
    date:String!
    address:String!
    savedCharity: String!
}

type GoogleVolunteer{
    _id:ID
    username:String!
    email:String!
    jti:String!
    sub:String!
    picture:String!
    skills: String
    user_description: String
}

type Mutation{
    createVolunteer(username:String!, fullName:String!, email:String!, password:String!, skills:String):Auth
    createGoogleVolunteer(username:String!, email:String!, jti:String!, sub:String!, picture:String!):Auth
    updateGoogleVolunteer(_id: ID!, user_description: String):GoogleVolunteer
    createCharity(username:String!, password:String!, email:String!, websiteURL:String!):Auth
    updateCharity(_id:ID!, description:String):Charity
    loginAsVolunteer(username: String!, password: String!,):Auth
    loginAsCharity(username: String!, password: String!,):Auth
    loginAsGoogleVolunteer(email: String!, jti: String!):Auth
    addEvent(savedEvent:inputEvent):Event
    addCharityEvent(savedEvents:inputEvent):Event
    addVolunteerEvent(eventId: ID!): Volunteer
    removeVolunteerEvent(title:String!):Volunteer
    removeEvent(title:String!):Charity
}


  type Query{
    allEvents:[Event]
    event(_id: ID!): Event
    volunteer(volunteerId: ID!): Volunteer
    allVolunteers: [Volunteer]!
    charity(charityId: ID!): Charity
    allCharity: [Charity]!
    googleVolunteer(_id: ID!): GoogleVolunteer
}
`
module.exports=typeDefs

// addEvent(savedEvent:inputEvent):Charity
//replqced with addEvent(savedEvent:inputEvent):Event