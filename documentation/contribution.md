# Contribution

## 1. Changelog

A new log message in the [CHANGELOG.md](../CHANGELOG.md) has to be written for each change in this project. Also add the issue or pull request number to each line.
New features or bugfixes have to be written below the `unreleased` header.

**Changelog entry syntax:**

```
#### unreleased

- [FEATURE|ENHANCEMENT|BUGFIX|HOTFIX] {TicketNumber}: {Change log entry}
```

**Changelog entry example:**

```
#### unreleased

- [FEATURE] #102: Added user service and permission handling.
```

## 2. Level of done

**Contribution Checklist:**

- New branch has been created.
- Changes are committed and pushed.
- Test are running successfully.
- Jenkins build is successful.
- If new functions need to be tested, tests are implemented.
- Documentation was extended / updated.
- Feature branch has been tested on the test environment.
- Pull request was created and reviewed by an other developer.
- Pull request has been checked to be fast forward before merging.
- If there are merge conflicts, the source branch is merged INTO the feature branch, and merge conflicts are solved.
- Pull request has been merged into the source branch by the creator of the pull request.

## 3. Deployment

*Test Environment (Dev):*

- In order to complete and merge the pull request, the changes have to be tested on the test environment.
- By merging the pull request into the develop branch, the jenkins will automatically deploy the changes. Nothing more needs to be done.

*Production Environment:*

- Make sure your changes were done on a new branch generated from the master branch.
- Update the [CHANGELOG.md](../CHANGELOG.md) and create a new release header.
- Merge the master branch back to the develop branch.

For more information about released please view the [deployment.md](../deployment.md) file.
