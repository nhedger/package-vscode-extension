# Package VS Code Extension Action

This repository contains the source code for the `Package VS Code Extension` GitHub Action.

## Inputs

This action accepts the following **optional** inputs.

| Name             | Description                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `extensionPath`  | Path to the root directory of the extension (default: `$GITHUB_WORKSPACE`).                                                    |
| `packagePath`    | Output path of the generated VSIX package (default: `${extensionPath}/[name]-[version].vsix`).                                        |
| `baseContentUrl` | Base URL for links detected in Markdown files (default: `undefined`).                                                          |
| `baseImagetUrl`  | Base URL for images detected in Markdown files (default: `undefined`).                                                         |
| `githubBranch`   | GitHub branch used to publish the package. Used to automatically infer the base content and images URI (default: `undefined`). |
| `gitlabBranch`   | GitLab branch used to publish the package. Used to automatically infer the base content and images URI (default: `undefined`). |
| `useYarn`        | Whether to use Yarn instead of NPM (default: `false`).                                                                         |
| `targetPlatform` | Target platform the extension should run on (default: `undefined`).                                                            |
| `preRelease`     | Whether to mark the package as a pre-release (default: `false`).                                                               |

## Outputs

This actions sets the following output values.

| Name          | Description                         |
| ------------- | ----------------------------------- |
| `packagePath` | Path to the generated VSIX package. |

## Example usage

### Simple

In this example, we rely on the defaults to package the extension.

```yaml
- name: Checkout
  uses: actions/checkout@v3

- name: Package VS Code extension
  uses: nhedger/package-vscode-extension@v1
```

### Alternative extension path

This example demonstrates using an alternative `extensionPath`.

```yaml
- name: Checkout
  uses: actions/checkout@v3

- name: Package VS Code extension
  uses: nhedger/package-vscode-extension
  with:
      extensionPath: ./packages/my-extension
```

### Publishing as an artifact

This example demonstrates publishing the generated VSIX package as an artifact.

```yaml
- name: Checkout
  uses: actions/checkout@v3

- name: Package VS Code extension
  id: package
  uses: nhedger/package-vscode-extension@v1

- name: Publish VS Code extension artifact
  uses: actions/upload-artifact@v3
  with:
      name: my-extension
      path: ${{ steps.package.outputs.packagePath }}
```
