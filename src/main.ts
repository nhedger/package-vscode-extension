import {
    getBooleanInput as boolInput,
    setOutput,
    setFailed,
} from '@actions/core';
import { join, resolve } from 'path';
import { makePackageName, input } from './utils';
import { createVSIX } from 'vsce';
import { cwd } from 'process';

const run = async () => {
    // Collect inputs
    const extensionPath = resolve(cwd(), input('extensionPath', '.'));
    const packagePath = resolve(
        cwd(),
        input(
            'packagePath',
            join(extensionPath, await makePackageName(extensionPath)),
        ),
    );

    try {
        const pkg = await createVSIX({
            cwd: extensionPath,
            packagePath: packagePath,
            baseContentUrl: input('baseContentUrl', undefined),
            baseImagesUrl: input('baseImageUrl', undefined),
            githubBranch: input('githubBranch', undefined),
            gitlabBranch: input('gitlabBranch', undefined),
            useYarn: boolInput('useYarn'),
            target: input('targetPlatform', undefined),
            preRelease: boolInput('preRelease'),
        });

        // Set output path
        setOutput('packagePath', packagePath);
    } catch (error) {
        setFailed(error);
    }
};

run();
