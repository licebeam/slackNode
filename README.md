# slackNode
using github and slack to post pull requests, for internal usage. 

run npm install after cloning this repo.

This repo requires that you add a file named auth.js to function properly.

auth.js should include ONLY the following code which you will need to fill out accordingly.

`module.exports = {
  SLACK_TOKEN: '',  //slack app api token which you will need to get from me on slack.
  CONVERSATION: '',  //this is the coversation url ID
  USERNAME: '', //your github username
  PASSWORD: '', //your github password
  SLACKNAME: '', //this should be your slack user name
}`
