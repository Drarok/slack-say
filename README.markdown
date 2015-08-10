# slack-say [![Build Status](https://travis-ci.org/Drarok/slack-say.svg?branch=develop)](https://travis-ci.org/Drarok/slack-say)

This is a small library/script to control talking as Slackbot.

## Quick Start

```bash
npm install -g slack-say
```

You'll need to create config.json (there's a sample included) in order to set your URL, Slackbot token, and default channel.

Then:

```bash
slackSay 'Hello, World!' '#general'
```

```bash
slackSay 'Hello, World!' '@colleague'
```
