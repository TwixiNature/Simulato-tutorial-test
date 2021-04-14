'use strict';

/*****
* Options:
*  baseId *required*
*    String
*    Specifies the base id that will be prepended to element selectors for title, body, and closeButton.
*****/

module.exports = {
  type: 'ViewStoryModal',
  elements () {
    return [
      {
        name: 'title',
        selector: {
          type: 'getElementById',
          value: `${this.options.baseId}ModalTitle`
        }
      },
      {
        name: 'body',
        selector: {
          type: 'getElementById',
          value: `${this.options.baseId}ModalBodyText`
        }
      },
      {
        name: 'closeButton',
        selector: {
          type: 'getElementById',
          value: `${this.options.baseId}ModalCloseButton`
        }
      }
    ];
  },
  model () {
    return {
      title: {
        displayed: 'title.isDisplayed',
        text: 'title.innerText'
      },
      body: {
        displayed: 'body.isDisplayed',
        text: 'body.innerText'
      },
      closeButton: {
        displayed: 'closeButton.isDisplayed'
      }
    };
  },
  actions () {
    return {
      CLOSE_MODAL: {
        preconditions () {
          return [
            [ 'isTrue', `pageState.${this.name}.closeButton.displayed` ]
          ];
        },
        perform (callback) {
          driver.findElement(By.id(`${this.options.baseId}ModalCloseButton`))
            .click()
            .then(callback, callback);
        },
        effects (expectedState) {
          expectedState.pop();
        }
      }
    };
  }
};