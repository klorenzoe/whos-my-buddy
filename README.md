# whos-my-buddy

🐾 Who’s My Buddy? — A GraphQL playground. This project helps me practice
GraphQL basics (queries, mutations, schema, resolvers) by building a simple pet
adoption finder where pets can be added, updated, or searched. With this project
you can compare REST and GraphQL behavior.

![API](./docs/images/swaggerAPI.png)

## Technologies and Architecture

![Stack](./docs/images/whosmybuddyStack.png)

## How to Run Project

1. Create a folder called "environment" and create the file ".env.dev" and fill
   the variables there.

```
PORT=3001
POSTGRES_DB=buddies
POSTGRES_USER=user
POSTGRES_PASSWORD=pass
POSTGRES_URL=postgresql://user:pass@localhost:5432/buddies
```

2. Run Dockerized DB

```bash
docker-compose --env-file environment/.env.dev up --build

# When you need to down it
docker-compose --env-file environment/.env.dev down
```

3. Run the following command to set database table, you can run every time that
   you need clean all data on table.

```bash
npm run db:reestablish

```

4. Save dummy data on db (optional). Dummy data is on ./prisma/data.dummy.sql

5. Run Node JS API, if all runs well you can consult swagger on:
   http://localhost:3001/docs

```bash
npm run dev
```

## GraphQL body examples

### QUERY: Buddy By Id

```
{
  "query": "query GetBuddy($id: ID!) { buddy(id: $id) { id name species size ageYears adopted colors description traits createdAt updatedAt } }",
  "variables": {
    "id": "21788069-deda-4b9b-8c07-2ee00ea015f1"
  }
}
```

### QUERY: Buddies with filters

```
{
  "query": "query ListBuddies($filter: BuddyFilter, $first: Int, $orderBy: BuddyOrderBy) { buddies(filter: $filter, first: $first, orderBy: $orderBy) { edges { cursor node { id name species adopted } } pageInfo { endCursor hasNextPage } } }",
  "variables": {
    "filter": {
      "q": "whisker",
      "speciesAny": ["CAT"],
      "adopted": false
    },
    "first": 5,
    "orderBy": "AGE_ASC"
  }
}
```

### MUTATION: Register new Buddy

```
{
  "query": "mutation Register($input: RegisterBuddyInput!) { registerABuddy(input: $input) { id name species size ageYears adopted colors description traits createdAt updatedAt } }",
  "variables": {
    "input": {
      "name": "Tom",
      "species": ["CAT"],
      "size": "SMALL",
      "ageYears": 1,
      "colors": ["orange"],
      "description": "Playful young cat, Smiling cat",
      "traits": ["playful"],
      "adopted": false
    }
  }
}

```

### MUTATION: Update existing buddy

```
{
  "query": "mutation Update($id: ID!, $input: UpdateBuddyInput!) { updateBuddy(id: $id, input: $input) { id name adopted updatedAt } }",
  "variables": {
    "id": "21788069-deda-4b9b-8c07-2ee00ea015f1",
    "input": {
      "size": "MEDIUM"
    }
  }
}
```

### MUTATION: Adopted Buddy

```
{
  "query": "mutation Adopt($id: ID!) { markBuddyAdopted(id: $id) { id name adopted updatedAt } }",
  "variables": {
    "id": "21788069-deda-4b9b-8c07-2ee00ea015f1"
  }
}

```
