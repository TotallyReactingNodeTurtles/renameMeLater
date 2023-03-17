import { gql } from "@apollo/client";

export const QUERY_VOLUNTEER = gql`
{
  volunteer {
    _id
    fullName
    username
    email
    title
    savedEvents {
      _id
      title
      description
      image
      date
      address
      savedCharity
    }
  }
}
`;

export const QUERY_ALL_EVENTS = gql`
  {
    allEvents {
      _id
      title
      description
      image
      savedCharity
      date
      address
      savedCharityID{
        charityName
      }
    }
  }
`;


export const QUERY_EVENT = gql`
  query Event($_id: ID!) {
    event(_id: $_id) {
      _id
      title
      description
      image
      savedCharity
      date
      address
      savedCharityId{
        charityName
      }
    }
  }
`;

export const QUERY_CHARITY = gql`
query charity($charityId: ID!) {
    charity (charityId: $_id){
      username
      email
      savedEvents
      websiteURL
      description
      address
      facebook
      instagram
      twitter
      phoneNumber
      charityName
  }
}
`;
export const QUERY_GOOGLE_VOLUNTEER = gql`
  query googleVolunteer($_id: ID!) {
    googleVolunteer(_id: $_id) {
      username
      email
      picture
      skills
      user_description
    }
  }
`;

// export const QUERY_PRODUCTS = gql`
//   query getProducts($category: ID) {
//     products(category: $category) {
//       _id
//       name
//       description
//       price
//       quantity
//       image
//       category {
//         _id
//       }
//     }
//   }
// `;

// export const QUERY_CHECKOUT = gql`
//   query getCheckout($products: [ID]!) {
//     checkout(products: $products) {
//       session
//     }
//   }
// `;

// export const QUERY_ALL_PRODUCTS = gql`
//   {
//     products {
//       _id
//       name
//       description
//       price
//       quantity
//       category {
//         name
//       }
//     }
//   }
// `;

// export const QUERY_CATEGORIES = gql`
//   {
//     categories {
//       _id
//       name
//     }
//   }
// `;
