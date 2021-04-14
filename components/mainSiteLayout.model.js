'use strict';

module.exports = {
  type: 'MainSiteLayout',
  elements () {
    return [
      {
        name: 'siteHeader',
        selector: {
          type: 'getElementById',
          value: 'siteHeader'
        }
      }
    ];
  },
  model () {
    return {
      header: {
        displayed: 'siteHeader.isDisplayed'
      }
    };
  },
  actions () {
    return {};
  }
}