if (!process.env.IS_WEBPACK) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('module-alias/register');
}

export { command as csvCommand } from './csv';
export { command as jsonCommand } from './json';
export { command as testCommand } from './test';
