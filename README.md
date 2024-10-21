# Action ToEnv

Action ToEnv is a GitHub Action that writes given environment variables to a .env file.

## Usage

`.github/workflows/write-env.yml`:

```yml
- uses: sibiraj-s/action-toenv@v1
  with:
    env: |
      FOO=BAR
      BAZ=QUX
```

## Security

For better security it is recommended to audit the code and pin actions to a full length commit SHA.

Read more on
[using third-party actions](https://docs.github.com/en/actions/learn-github-actions/security-hardening-for-github-actions#using-third-party-actions)
