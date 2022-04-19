const { promptUser } = require('./promptUtils');
const { i18n } = require('@hubspot/cli-lib/lib/lang');

const i18nKey = 'cli.lib.prompts.sandboxesPrompt';

const createSandboxPrompt = () => {
  return promptUser([
    {
      name: 'name',
      message: i18n(`${i18nKey}.enterName`),
      validate(val) {
        if (typeof val !== 'string') {
          return i18n(`${i18nKey}.errors.invalidName`);
        }
        return true;
      },
      default: 'New sandbox',
    },
  ]);
};

const deleteSandboxPrompt = config => {
  return promptUser([
    {
      name: 'sandboxAccount',
      message: i18n(`${i18nKey}.enterSandboxAccountName`),
      type: 'list',
      look: false,
      pageSize: 20,
      choices: config.portals.map(p => p.name || p.portalId),
      default: config.defaultPortal,
    },
    {
      name: 'parentAccount',
      message: i18n(`${i18nKey}.enterParentAccountName`),
      type: 'list',
      look: false,
      pageSize: 20,
      choices: config.portals.map(p => p.name || p.portalId),
      default: config.defaultPortal,
    },
  ]);
};

module.exports = {
  createSandboxPrompt,
  deleteSandboxPrompt,
};
