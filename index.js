const { Toolkit } = require('actions-toolkit');

// Run your GitHub Action!
Toolkit.run(async tools => {
  tools.log.debug('tools.context.payload >>> \n', tools.context.payload);
  if (tools.context.event === 'issue_comment' && tools.context.payload.action === 'created') {
    tools.log.debug('params', params);
    await tools.github.issues.createComment({
      ...tools.context.issue,
      body: "comment received!!",
    });
    tools.exit.success('success')
  }
})
  .catch(e => {
    tools.exit.failure(e);
  })
