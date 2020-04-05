# :no_entry_sign: Close All Pull Requests

A GitHub action to automatically close all open pull requests.

## Usage

This Action closes all the pull requests on the repo. It is useful when you don't want to accept any kind of pull request,
for instance on a readd-only repo. The action can be triggered by any event, such as `push`, `schedule` or `pull_request`
(see below).

```yaml
name: Close All Pull Requests

on:
  push:
  pull_request:
  schedule:
    - cron: '0 0 * * *'

jobs:
  run:
    runs-on: ubuntu-latest
    steps:
    - uses: crondaemon/close-pr@v1
      with:
        # Optional. Post a issue comment just before closing a pull request.
        comment: "We do not accept PRs. If you have any questions, please feel free to contact us."
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

- `comment` - *Optional*. Post an issue comment just before closing a pull request.

## Events

The event to choose depends on your specific needs and configurations.

The `push` event is the most suitable if your repo gets frequent updates, both via developers push
or via mirroring software. Each time a push happens, all the open pull requests will get closed.
However if you code is pretty stable, your pull requests could stay open for a while, making this
action useless.

In this case the most suitable event is `schedule`. You can schedule a check per hour, per day,
etc., on your choice. The drawback of this choice is that a lot of useless run will happen, with
some waste of resource. If you're taking this way, be careful to choose the right schedule that
fits your needs.

The event `pull_request` is fired as soon as a new pull request gets opened. Despite this looks
the best fit, it doesn't work on pull requests coming from forks, for security reasons. If your
pull requests are likely to come from this way, don't use this configuration, or you will receive
a fail when this action runs. Moreover if a pull request gets closed, then re-opened, the event
`pull_request` doesn't get fired again, leaving the PR open. A general suggestion that should fit
the most common needs are `push` + `schedule` (1 day).

## LICENSE

This software is released under the GPL-v2-or-later License.
