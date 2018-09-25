# slackNode
using github and slack to post pull requests, for internal usage. 

run npm install after cloning this repo.

This repo requires that you add a file named auth.js to function properly.



channel id's needed below can be found as the firt parameter in your slack url after slack.com/messages/XXXXX/ etc.
auth.js should include ONLY the following code which you will need to fill out accordingly.

`module.exports = {
  SLACK_TOKEN: '', //our slack api token please ask me
  USERNAME: '', //github user name
  PASSWORD: '', //github password
  SLACKNAME: '', //slack user name
  SELF: '', //your channel id
  SLACKBOT: 'DAVTEQ6JF', //slackbot id
  PURURIKU: '', //pull request channel id
  STAGING: '', //staging channel id
  PRODUCTION: '', //production channel id
}
`
If you need help setting up please ask me.

When you are prompted for a note or user tag, the name must be 100% accurate. You can also add emoji's using the commands like so :sparkles: -- all text is parsed accordingly. 