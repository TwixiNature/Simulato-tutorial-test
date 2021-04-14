'use strict';

module.exports = {
  type: 'NavigateToTestSite',
  entryComponent: {
    name: 'navigateToTestSite',
    state: {}
  },
  elements () {
    return [];
  },
  model () {
    return {};
  },
  actions () {
    return {
      NAVIGATE_TO_SITE: {
        perform (callback) {
          driver.get('http://localhost:3000')
            .then(callback, callback);
        },
        effects (expectedState) {
          expectedState.clear();
          expectedState.createAndAddComponent({
            type: 'MainSiteLayout',
            name: 'mainSiteLayout',
            state: {
              header: {
                displayed: true
              }
            }
          });
          const article1Heading = 'Test Article One';
          const article1Body = 'This is the body text of a first test article that is long enough to pass by the preview and still show more in the pop up modal.';
          expectedState.createAndAddComponent({
            type: 'NewsArticle',
            name: 'newsArticleOne',
            state: {
              image: {
                displayed: true
              },
              heading: {
                displayed: true,
                text: article1Heading
              },
              body: {
                displayed: true,
                text: article1Body
              }
            },
            options: {
              baseId: 'article1',
              headingText: article1Heading,
              bodyText: article1Body
            }
          });
          const article2Heading = 'Test Article Two';
          const article2Body = 'This is the body text of a second test article that is long enough to pass by the preview and still show more in the pop up modal.';
          expectedState.createAndAddComponent({
            type: 'NewsArticle',
            name: 'newsArticleTwo',
            state: {
              image: {
                displayed: true
              },
              heading: {
                displayed: true,
                text: article2Heading
              },
              body: {
                displayed: true,
                text: article2Body
              }
            },
            options: {
              baseId: 'article2',
              headingText: article2Heading,
              bodyText: article2Body
            }
          });
        }
      }
    };
  },
}