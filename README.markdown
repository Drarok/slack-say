# slack-say [![Build Status](https://travis-ci.org/Drarok/slack-say.svg?branch=develop)](https://travis-ci.org/Drarok/slack-say)

This is a small library/script to control talking as Slackbot.

## Quick Start

```bash
npm install -g slack-say
```

You'll need to create config.json (there's a sample included) in order to set your URL, Slackbot token, and default channel. To find out the path you need to use, simply run `slack-say` and it'll tell you in its error:

```bash
slack-say
Unhandled rejection Error: ENOENT, lstat '/Users/drarok/.nvm/v0.10.37/lib/node_modules/slack-say/config.json'
```

Once you've created your config file, `slack-say` will give you a brief usage example:

```bash
Usage:
slack-say <message> [channel]
```

You can _optionally_ specify a channel:

```bash
slack-say 'Hello, World!' '#general'
```

Or indeed a username:

```bash
slack-say 'Hello, World!' '@colleague'
```
