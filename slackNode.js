#!/usr/bin/env node

const { WebClient } = require('@slack/client');
var colors = require('colors')
const readline = require('readline');
const constants = require('./auth');
var github = require('octonode'); // REQUIRES LOCAL AUTH.js file

//get slack access token
const SLACK_TOKEN = constants.SLACK_TOKEN;
const token = SLACK_TOKEN;
const web = new WebClient(token);
conversationId = constants.CONVERSATION;

const sendMessage = (text, memberGroup, info) => {
  const name = text[0].value[0];
  const url = text[0].value[1];
  const title = text[0].value[2];
  web.chat.postMessage({
    channel: conversationId,
    parse: 'full',
    text: '@' + memberGroup + "\n" +
      ':cat_typing: Pull Request From: ' + constants.SLACKNAME + "\n" +
      info + "\n",
    attachments: [
      {
        "fallback": "Required plain-text summary of the attachment.",
        "color": "#33D4FF",
        "author_name": name,
        "author_link": "http://github.com/" + name,
        "title": title,
        "title_link": url,
        "text": "レビューお願いします！",
        "fields": [
          {
            "title": url,
          }
        ],
        "footer": 'slackNode v1.0',
      }
    ]
  })
    .then((res) => {
      console.log(colors.red(''));
      console.log(colors.red('-----------------'));
      console.log(colors.rainbow('Sent'), res.ts);
      process.exit(0);
    })
    .catch(console.error)
}

var client = github.client({
  username: constants.USERNAME,
  password: constants.PASSWORD,
});

async function startService() {
  const repo = client.repo('zeals-co-ltd/jupiter')
  const result = await repo.prsAsync({ per_page: 100 })
  const sendToSlack = result[0].map(item => ([
    item.user.login,
    item.html_url,
    item.title,
  ]
  ));
  console.log(colors.red(''));
  console.log(colors.red('-----------------'));
  console.log(colors.red('Select Pull:'));
  listOne(sendToSlack);
}

startService()

listOne = (sendToSlack) => {
  var list = require('select-shell')(
    {
      pointer: '> ',
      pointerColor: 'yellow',
      checked: ' ✓',
      unchecked: '',
      checkedColor: 'green',
      msgCancel: 'No selected options!',
      msgCancelColor: 'red',
      multiSelect: false,
      inverse: false,
      prepend: true,
      disableInput: true,
    }
  );
  var stream = process.stdin;

  const pullRequestList = sendToSlack.reduce((acc, pullRequest) => {
    acc.option(pullRequest);
    return acc;
  }, list);

  list.list();


  list.on('select', function (options) {
    console.log(colors.red(''));
    console.log(colors.red('-----------------'));
    console.log(colors.green('Attach Group:'));
    listTwo(options)

  });

  list.on('cancel', function (options) {
    console.log('Cancel list, ' + options.length + ' options selected');
    process.exit(0);
  });
}

listTwo = (pull) => {
  var list = require('select-shell')(
    /* These are the default values */
    {
      pointer: '> ',
      pointerColor: 'yellow',
      checked: ' ✓',
      unchecked: '',
      checkedColor: 'green',
      msgCancel: 'No selected options!',
      msgCancelColor: 'red',
      multiSelect: false,
      inverse: false,
      prepend: false,
      disableInput: true
    }
  );
  var stream = process.stdin;

  list.option('javascript-member')
    .option('ruby-member')
    .option('python-member')
    .option('main-engineer')
    .list();

  list.on('select', function (options) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    console.log(colors.red(''));
    console.log(colors.red('-----------------'));
    rl.question(colors.yellow('@ Tag users or add Note: '), (answer) => {
      sendMessage(pull, options[0].value, answer);
    });
  });
  list.on('cancel', function (options) {
    console.log('Cancel list, ' + options.length + ' options selected');
    process.exit(0);
  });
}