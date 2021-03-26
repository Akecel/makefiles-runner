# How to Contribute

Here are a few guidelines to help you get on the right tracks.

## Pull request

Use the pull request template available when you start your PR, or in [pull_request_template.md](https://github.com/HETIC-MT-P2021/CQRSES_GROUP2/blob/doc/wiki/.github/PULL_REQUEST_TEMPLATE.md)
## Conventional Commits 
It is recommended to keep your changes grouped logically within individual
commits. Many contributors find it easier to review changes that are split
across multiple commits. There is no limit to the number of commits in a
pull request.

```sh
$ git add my/changed/files
$ git commit
```

Note that multiple commits often get squashed when they are landed.

## Commit Convention

Commit message summaries must follow this basic format:

```
Tag: Message
```

`Tag` should not be confused with git tag. Message should not be confused with git commit message.

The `Tag` is one of the following:

* `Fix` - for a bug fix.
* `Update` - for a backwards-compatible enhancement of an existing feature.
* `Breaking` - for a backwards-incompatible enhancement.
* `Docs` - changes to documentation only.
* `Build` - changes to build / CI / CD process only.
* `New` - implemented a new feature.
* `Upgrade` - for a dependency upgrade.

The message summary should be a one-sentence description of the change.

Here are some good commit message summary examples:

```
Build: Update Travis to only test Node 0.10 (refs #734)
Fix: Semi rule incorrectly flagging extra semicolon (fixes #840)
Upgrade: Esprima to 1.2, switch to using comment attachment (fixes #730)
```
