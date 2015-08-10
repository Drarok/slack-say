var util = require('util');

var request = require('request-promise');

function SlackBot(config) {
  if (!config) {
    throw new Error('Missing config');
  }

  var requiredKeys = ['defaultChannel', 'token', 'url'];
  var missingKeys = [];

  var _this = this;
  requiredKeys.forEach(function (key) {
    if (!config[key]) {
      missingKeys.push(key);
    } else {
      _this[key] = config[key];
    }
  });

  if (missingKeys.length) {
    throw new Error('Missing required keys: ' + missingKeys.join(', '));
  }
}

SlackBot.prototype.generateUri = function (channel) {
  if (!channel) {
    channel = this.defaultChannel;
  }

  return util.format(
    '%s?token=%s&channel=%s',
    this.url,
    encodeURIComponent(this.token),
    encodeURIComponent(channel)
  );
};

SlackBot.prototype.makeRequest = function (options) {
  return request(options);
};

SlackBot.prototype.say = function (message, channel) {
  if (!message) {
    throw new Error('Missing message');
  }

  return this.makeRequest({
    method: 'POST',
    uri: this.generateUri(channel),
    body: message
  });
};

module.exports = SlackBot;
