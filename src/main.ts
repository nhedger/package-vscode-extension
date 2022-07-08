import { getBooleanInput, getInput, setFailed } from "@actions/core";
import { resolve } from "path";
import process from "process";
import { createVSIX, ICreateVSIXOptions } from "vsce";

async function run(): Promise<void> {
    try {
        // Collect action input
        const extensionPath = getInput("extensionPath");
        const packagePath = getInput("packagePath");
        const baseContentUrl = getInput("baseContentUrl");
        const baseImagesUrl = getInput("baseImageUrl");
        const githubBranch = getInput("githubBranch");
        const gitlabBranch = getInput("gitlabBranch");
        const useYarn = getBooleanInput("useYarn");
        const target = getInput("targetPlatform");
        const preRelease = getBooleanInput("preRelease");

        // Map input to packaging options
        const packagingOptions: ICreateVSIXOptions = {
            cwd: resolve(process.cwd(), extensionPath ?? "."),
            packagePath: resolve(
                process.cwd(),
                packagePath ?? "extension.vsix"
            ),
            baseContentUrl,
            baseImagesUrl,
            githubBranch,
            gitlabBranch,
            useYarn,
            target,
            preRelease,
        };

        // Build package
        const result = await createVSIX(packagingOptions);

    } catch (error) {
        if (error instanceof Error) setFailed(error.message);
    }
}

run();
