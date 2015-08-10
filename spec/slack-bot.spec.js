describe('SlackBot', function () {
  var util = require('util');

  var SlackBot = require('../lib/slack-bot');

  describe('constructor', function () {
    it('should reject empty config', function () {
      var createBot = function () {
        new SlackBot();
      };

      expect(createBot).toThrowError('Missing config');
    });

    it('should reject invalid config', function () {
      var createBot = function () {
        new SlackBot({});
      };

      expect(createBot).toThrowError('Missing required keys: defaultChannel, token, url');
    });

    it('should accept valid config', function () {
      var bot = new SlackBot({
        defaultChannel: '#general',
        token: '12345abcde',
        url: 'https://example.slack.com/services/hooks/slackbot'
      });

      expect(bot).toEqual(jasmine.any(SlackBot));
    });
  });

  describe('generateUri', function () {
    var botOptions = {
      defaultChannel: '#general',
      token: '12345abcde',
      url: 'https://example.slack.com/services/hooks/slackbot'
    };

    var bot = new SlackBot(botOptions);

    it('should use defaultChannel when none provided', function () {
      var expected = util.format(
        '%s?token=%s&channel=%s',
        botOptions.url,
        encodeURIComponent(botOptions.token),
        encodeURIComponent(botOptions.defaultChannel)
      );

      expect(bot.generateUri()).toEqual(expected);
    });

    it('should use given channel', function () {
      var customChannel = '#my-personal-channel';

      var expected = util.format(
        '%s?token=%s&channel=%s',
        botOptions.url,
        encodeURIComponent(botOptions.token),
        encodeURIComponent(customChannel)
      );

      expect(bot.generateUri(customChannel)).toEqual(expected);
    });
  });

  describe('say', function () {
    var botOptions = {
      defaultChannel: '#general',
      token: '12345abcde',
      url: 'https://example.slack.com/services/hooks/slackbot'
    };

    var bot;

    beforeEach(function () {
      bot = new SlackBot(botOptions);
      spyOn(bot, 'makeRequest');
      spyOn(bot, 'generateUri').and.callThrough();
    });

    it('should reject invalid options', function () {
      var say = function () {
        bot.say();
      };

      expect(say).toThrowError('Missing message');
      expect(bot.generateUri).not.toHaveBeenCalled();
      expect(bot.makeRequest).not.toHaveBeenCalled();
    });

    it('should send message to default channel when none provided', function () {
      var message = 'Hello, World!';

      var expectedUri = util.format(
        '%s?token=%s&channel=%s',
        botOptions.url,
        encodeURIComponent(botOptions.token),
        encodeURIComponent(botOptions.defaultChannel)
      );

      bot.say(message);

      expect(bot.generateUri).toHaveBeenCalledWith(undefined);
      expect(bot.makeRequest).toHaveBeenCalledWith({
        method: 'POST',
        uri: expectedUri,
        body: message
      });
    });

    it('should send message to provided channel', function () {
      var message = 'Hello, World!';

      var customChannel = '#my-custom-channel';

      var expectedUri = util.format(
        '%s?token=%s&channel=%s',
        botOptions.url,
        encodeURIComponent(botOptions.token),
        encodeURIComponent(customChannel)
      );

      bot.say(message, customChannel);

      expect(bot.generateUri).toHaveBeenCalledWith(customChannel);
      expect(bot.makeRequest).toHaveBeenCalledWith({
        method: 'POST',
        uri: expectedUri,
        body: message
      });
    });
  });
});
