const { Toolkit } = require('actions-toolkit')

// Run your GitHub Action!
Toolkit.run(async tools => {
  tools.log.debug('This is triggered by event:issue_comment')
  tools.log.debug('tools.context.ref >>> ', tools.context.ref);
  tools.log.debug('payload >>>>>>>>>>>> ', tools.context.payload);
  if (tools.context.event === 'issue_comment' && tools.context.payload.action === 'created') {
    tools.github.issues
      .createComment({
        ...tools.context.issue,
        body: "test",
      })
      .then(() => {
        tools.exit.success('Comment repeated')
      })
      .catch(() => {
        tools.exit.failure('Something went wrong')
      })
  }
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


