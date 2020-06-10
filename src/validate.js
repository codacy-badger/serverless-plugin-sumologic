const assert = require('assert');
const { message } = require('./message');

const validate = ({ serverless }) => {
  assert(serverless, message.INVALID_CONFIGURATION);
  assert(serverless.service, message.INVALID_CONFIGURATION);
  assert(serverless.service.provider, message.INVALID_CONFIGURATION);
  assert(serverless.service.provider.name, message.INVALID_CONFIGURATION);
  assert(serverless.service.provider.name === 'aws', message.ONLY_AWS_SUPPORT);

  assert(serverless.service.custom, message.NO_SUMOLOGIC_CONFIG);
  assert(serverless.service.custom.sumologic, message.NO_SUMOLOGIC_CONFIG);
  assert(serverless.service.custom.sumologic.name, message.NO_SUMOLOGIC_NAME);
  assert(serverless.service.custom.sumologic.endpointUrl, message.NO_SUMOLOGIC_ENDPOINT_URL);
};

module.exports = { validate };
