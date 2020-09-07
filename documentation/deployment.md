# Project deployment

## Production Deploy

#### 1. Update master branch
- `git checkout develop`
- `git pull`
- `git checkout master`
- `git pull`
- `git merge develop`

#### 2. Update changelog

- Update the CHANGELOG.md file and add new release header.
- `git add CHANGELOG.md`
- Update the version in the [style.scss](../sass/style.scss) file.
- `nvm use 12`
- `cd custom`
- Run the build script `gulp`
- `cd ..`
- `git commit -m"Prepare release"`
- `git push`

*Important: If any error occurs during this build, it can not be released until the problem has been fixed.*

#### 3. Update develop branches with the latest version

- `git checkout develop`
- `git merge master`
- `git push`
- `git checkout vlv`
- `git merge master`
- `git push`

#### 4. Update wordpress

Upload the latest zip version of the plugin to the wordpress page.

*Congratulations, your version has been successfully updated*

### Versions

View the [Versioning Conventions](versioning-conventions.md) file for more information.
