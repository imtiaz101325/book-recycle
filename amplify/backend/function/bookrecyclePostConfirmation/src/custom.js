/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const appsyncUrl = process.env.API_AMPLIFYDATASOURCE_GRAPHQLAPIENDPOINTOUTPUT;
const apiKey = process.env.API_AMPLIFYDATASOURCE_GRAPHQLAPIKEYOUTPUT;

const axios = require("axios");
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;

const createUser = /* GraphQL */ gql`
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      username
      phone
      books {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;

exports.handler = async (event) => {
  try {
    await axios({
      url: appsyncUrl,
      method: "post",
      headers: {
        "x-api-key": apiKey,
      },
      data: {
        query: print(createUser),
        variables: {
          input: {
            id: event.request.userAttributes.sub,
            firstName: event.request.userAttributes.family_name,
            lastName: event.request.userAttributes.given_name,
            email: event.request.userAttributes.email,
            phone: event.request.userAttributes.phone_number,
            username: event.request.userAttributes.preferred_username,
          },
        },
      },
    });

    const body = {
      message: "successfully created user!",
    };

    return {
      statusCode: 200,
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (err) {
    console.log("error creating todo: ", err);
  }
};
