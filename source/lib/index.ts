if (!process.env.IS_WEBPACK) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('module-alias/register');
}

export * from '@lib/modules/test';
export * from '@lib/modules/csv';
export * from '@lib/modules/json';
