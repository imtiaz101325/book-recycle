/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const https = require("https");
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl = process.env.API_AMPLIFYDATASOURCE_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const graphqlQuery = require("./query.js").mutation;
const apiKey = process.env.API_AMPLIFYDATASOURCE_GRAPHQLAPIKEYOUTPUT;

exports.handler = async (event) => {
  const req = new AWS.HttpRequest(appsyncUrl, region);

  const item = {
    input: {
      id: event.request.userAttributes.sub ,
      firstName: event.request.userAttributes.firstName ,
      lastName: event.request.userAttributes.lastName ,
      email: event.request.userAttributes.email ,
      phone: event.request.userAttributes.phone,
      username: event.request.userAttributes.username,
    },
  };

  req.method = "POST";
  req.path = "/graphql";
  req.headers.host = endpoint;
  req.headers["Content-Type"] = "application/json";
  req.body = JSON.stringify({
    query: graphqlQuery,
    operationName: "createUser",
    variables: item,
  });

  if (apiKey) {
    req.headers["x-api-key"] = apiKey;
  } else {
    const signer = new AWS.Signers.V4(req, "appsync", true);
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());
  }

  await new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
      let data = "";

      result.on("data", (chunk) => {
        data += chunk;
      });

      result.on("end", () => {
        resolve(JSON.parse(data.toString()));
      });
    });

    httpRequest.write(req.body);
    httpRequest.end();
  });

  return {
    statusCode: 200,
  };
};
