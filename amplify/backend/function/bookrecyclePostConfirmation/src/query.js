module.exports = {
  mutation: `mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      firstName
      lastName
      phone
      id
      username
    }
  }
  `
}