const core = require('@actions/core');
const github = require('@actions/github');

const run = async () => {
  const context = github.context;
  const comment = core.getInput('comment');
  const token = process.env["GITHUB_TOKEN"] || "";
  
  if (token === "") {
    throw errors.noToken;
  }
  
  const octokit = new github.GitHub(token);
  const pulls = await octokit.pulls.list({
    ...context.repo,
    state: "open"
  });

  for (i = 0; i < pulls.data.length; i++) {
    number = pulls.data[i].number

    if (comment.length > 0) {
      core.info(`Commenting on PR ${number}`);
      await octokit.issues.createComment({
        ...context.repo,
        issue_number: number,
        body: comment
      });
    }

    core.info(`Closing PR ${number}`);
    await octokit.pulls.update({
      ...context.repo,
      pull_number: number,
      state: "closed"
    });
  }
}

run().catch(err => {
  core.setFailed(err.message);
});
