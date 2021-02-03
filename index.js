const { Toolkit } = require('actions-toolkit')

// Run your GitHub Action!
Toolkit.run(async tools => {
  tools.log.debug('This is triggered by event:issue_comment')
  const { owner, repo, issue_number } = tools.context.issue;
  tools.log.debug('payload >>>>>>>>>>>>', tools.context.payload);
  tools.github.issues
    .createComment({
      owner,
      repo,
      issue_number,
      body: 'repeat:\n' + tools.context.payload.issue.body,
    })
    .then(() => {
      tools.exit.success('Comment repeated')
    })
  tools.exit.failure('Something went wrong')
}, { event: 'issue_comment.created' })

Toolkit.run(async tools => {
  tools.log.debug('This is triggered by event:pull_request.closed')
  const { owner, repo, pull_number } = tools.context.pullRequest;
  tools.log.debug('payload >>>>>>>>>>>>', tools.context.payload);
  if (tools.context.payload.pull_request.merged) {
    tools.github.git
      .deleteRef(tools.context.repo({
        ref: `heads/${tools.context.payload.pull_request.head.ref}`
      }))
      .then(() => {
        tools.log.success(`Branch ${tools.context.payload.pull_request.head.ref} deleted!`)
      })
  }
  tools.exit.failure('Something went wrong')
}, { event: 'pull_request.closed' })


