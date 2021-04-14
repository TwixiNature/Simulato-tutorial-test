'use strict';

/*****
* Options:
*  baseId *required*
*    String
*    Specifies the base id that will be prepended to element selectors for image, heading, and text.
* 
*  headingText *required*
*    String
*    Specifies the articles heading text, passed to the ViewStoryModal inside CLICK_TO_VIEW_STORY
*
*  bodyText *required*
*    String
*    Specifies the articles body text, passed to the ViewStoryModal inside CLICK_TO_VIEW_STORY
*****/

module.exports = {
  type: 'NewsArticle',
  elements () {
    return [
      {
        name: 'image',
        selector: {
          type: 'getElementById',
          value: `${this.options.baseId}Image`
        }
      },
      {
        name: 'heading',
        selector: {
          type: 'getElementById',
          value: `${this.options.baseId}Heading`
        }
      },
      {
        name: 'text',
        selector: {
          type: 'getElementById',
          value: `${this.options.baseId}Text`
        }
      }
    ];
  },
  model () {
    return {
      image: {
        displayed: 'image.isDisplayed',
      },
      heading: {
        displayed: 'heading.isDisplayed',
        text: 'heading.innerText'
      },
      body: {
        displayed: 'text.isDisplayed',
        text: 'text.innerText'
      }
    }
  },
  actions () {
    return {
      CLICK_TO_VIEW_STORY: {
        preconditions () {
          return [
            [ 'isTrue', `pageState.${this.name}.heading.displayed` ]
          ];
        },
        perform (callback) {
          driver.findElement(By.id(`${this.options.baseId}Heading`))
            .click()
            .then(callback, callback);
        },
        effects (expectedState) {
          expectedState.stash();
          expectedState.createAndAddComponent({
            type: 'ViewStoryModal',
            name: `${this.name}ViewStoryModal`,
            state: {
              title: {
                displayed: true,
                text: this.options.headingText
              },
              body: {
                displayed: true,
                text: this.options.bodyText
              },
              closeButton: {
                displayed: true
              }
            },
            options: {
              baseId: this.options.baseId
            }
          });
        }
      }
    };
  }
}