export const typeDefs = /* GraphQL */ `
  scalar DateTime

  type Buddy {
    id: ID!
    name: String!
    species: [String!]!
    size: String!
    ageYears: Int!
    adopted: Boolean!
    colors: [String!]!
    description: String!
    traits: [String!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input RegisterBuddyInput {
    name: String!
    species: [String!]!
    size: String!
    ageYears: Int!
    colors: [String!]!
    description: String!
    traits: [String!] = []
    adopted: Boolean = false
  }

  input BuddyFilter {
    q: String # busca en name/description (a definir en resolver)
    speciesAny: [String!]
    speciesAll: [String!]
    size: String
    adopted: Boolean
    colorsAny: [String!]
    traitsAll: [String!]
    minAge: Int
    maxAge: Int
  }

  enum BuddyOrderBy {
    CREATED_AT_DESC
    CREATED_AT_ASC
    AGE_ASC
    AGE_DESC
  }

  type BuddyEdge {
    cursor: String!
    node: Buddy!
  }
  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
  }
  type BuddyConnection {
    edges: [BuddyEdge!]!
    pageInfo: PageInfo!
  }

  type Query {
    _ping: Boolean!
    buddy(id: ID!): Buddy
    buddies(
      filter: BuddyFilter
      first: Int = 20
      after: String
      orderBy: BuddyOrderBy = CREATED_AT_DESC
    ): BuddyConnection!
  }

  input UpdateBuddyInput {
    name: String
    species: [String!]
    size: String
    ageYears: Int
    adopted: Boolean
    colors: [String!]
    description: String
    traits: [String!]
  }

  type Mutation {
    registerABuddy(input: RegisterBuddyInput!): Buddy!
    updateBuddy(id: ID!, input: UpdateBuddyInput!): Buddy!
    markBuddyAdopted(id: ID!): Buddy!
  }
`
