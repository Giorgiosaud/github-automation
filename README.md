# Instalacion 
```shell
npm i -g git-automated-actions //with npm
yarn global add git-automated-actions // with yarn
```

# Usage
## To set or update secret on single or multiples repos
```shell
github-api set-secret --secret-name=SECRET_NAME --secret-value=SECRET_VALUE "user/repo"
# "user/repo" can be multiples "users/repos" separated by spaces
```
## To Delete Secret
```shell
github-api delete-secret "user/repo" --secret-name=SECRET_NAME
# "user/repo" can be multiples "users/repos" separated by spaces
```