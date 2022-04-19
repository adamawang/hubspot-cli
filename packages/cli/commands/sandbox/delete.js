const {
  addAccountOptions,
  addConfigOptions,
  getAccountId,
  addUseEnvironmentOptions,
} = require('../../lib/commonOpts');
// const { trackCommandUsage } = require('../../lib/usageTracking');
const { logger } = require('@hubspot/cli-lib/logger');

const { deleteSandbox } = require('@hubspot/cli-lib/sandboxes');
const { loadAndValidateOptions } = require('../../lib/validation');
const { deleteSandboxPrompt } = require('../../lib/prompts/sandboxesPrompt');
const { i18n } = require('@hubspot/cli-lib/lib/lang');
const { getConfig } = require('@hubspot/cli-lib');

const i18nKey = 'cli.commands.sandbox.subcommands.delete';

exports.command = 'delete [account] [parentAccount]';
exports.describe = i18n(`${i18nKey}.describe`);

exports.handler = async options => {
  await loadAndValidateOptions(options);

  const { sandboxAccount, parentAccount } = options;
  const config = getConfig();
  // const configPath = getConfigPath();

  const accountPrompt = await deleteSandboxPrompt(config);
  const sandboxAccountId = getAccountId({
    account: sandboxAccount || accountPrompt.sandboxAccount,
  });
  const parentAccountId = getAccountId({
    account: parentAccount || accountPrompt.parentAccount,
  });

  // trackCommandUsage('sandbox-create', {}, accountId);

  // const sandboxParentAccount = parentAccount || accountPrompt.parentAccount;

  logger.debug(
    i18n(`${i18nKey}.debug.deleting`, {
      account: sandboxAccount || accountPrompt.sandboxAccount,
    })
  );

  return deleteSandbox(parentAccountId, sandboxAccountId).then(() => {
    logger.success(
      i18n(`${i18nKey}.success.delete`, {
        account: sandboxAccount,
        sandboxHubId: sandboxAccountId,
      })
    );
  });
};

exports.builder = yargs => {
  yargs.positional('sandbox account', {
    describe: i18n(`${i18nKey}.positionals.account.describe`),
    type: 'string',
  });

  yargs.example([
    ['$0 sandbox delete MySandboxAccount', i18n(`${i18nKey}.examples.default`)],
  ]);

  addConfigOptions(yargs, true);
  addAccountOptions(yargs, true);
  addUseEnvironmentOptions(yargs, true);

  return yargs;
};
