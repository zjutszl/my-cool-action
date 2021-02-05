const github = require('@actions/github');
const { Toolkit } = require('actions-toolkit');

// Run your GitHub Action!
Toolkit.run(async tools => {
  if (tools.context.event === 'issue_comment' && tools.context.payload.action === 'created') {
    // const octokit = github.getOctokit(process.env.GITHUB_TOKEN)
    const params = {
      ...tools.context.issue,
      body: "test",
    }
    tools.log.debug('params', params);
    // await octokit.issues.createComment(params)
    await tools.github.issues.createComment(params);
    tools.exit.success('success')
  }
})
  .catch(e => {
    tools.exit.failure(e);
  })

// Toolkit.run(async tools => {
//   tools.log.debug('This is triggered by event:pull_request.closed')
//   const { owner, repo, pull_number } = tools.context.pullRequest;
//   tools.log.debug('payload >>>>>>>>>>>>', tools.context.payload);
//   if (tools.context.payload.pull_request.merged) {
//     tools.github.git
//       .deleteRef(tools.context.repo({
//         ref: `heads/${tools.context.payload.pull_request.head.ref}`
//       }))
//       .then(() => {
//         tools.log.success(`Branch ${tools.context.payload.pull_request.head.ref} deleted!`)
//       })
//   }
//   tools.exit.failure('Something went wrong')
// }, { event: 'pull_request.closed' })


