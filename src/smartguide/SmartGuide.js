import PerfectScrollbar from 'perfect-scrollbar';
import Clipboard from 'clipboard';
import Constants from '../configuration/Constants';

/**
 * Smart guide
 * @typedef {Object} SmartGuide
 * @property {Editor} editor - A reference to the current editor.
 * @property {String} wordToChange - Word to change following a click on a word.
 * @property {String} lastWord - Keep the last word of the previous export to compare with the new and scroll if it's different.
 * @property {String} previousLabelExport - Keep the previous label export to know if we should repopulate the prompter text.
 * @property {PerfectScrollbar} perfectScrollbar - Perfect Scrollbar used to get gestures from smart guide using touch-action none anyway and get scrolling too.
 * @property {Object} elements - All the HTML elements of the smart guide.
 * @property {Number} smartGuideTimeOutId - Id of the setTimeOut from fade out animation to clear.
 * @property {String} randomString - Random string used in case of multiple smart guide.
 */

/**
 * Create all the smart guide HTML elements.
 */
function createHTMLElements(randomString) {
  /**
   * The smart guide element.
   * @type {HTMLDivElement}
   */
  const smartGuideElement = document.createElement('div');
  smartGuideElement.id = 'smartguide' + randomString;
  smartGuideElement.classList.add('smartguide');

  /**
   * The prompter text element that contains the text to get the overflow working.
   * @type {HTMLDivElement}
   */
  const textElement = document.createElement('div');
  textElement.id = 'prompter-text' + randomString;
  textElement.classList.add('prompter-text');
  textElement.setAttribute('touch-action', 'none');

  /**
   * The text container element that contains the text element.
   * @type {HTMLDivElement}
   */
  const textContainer = document.createElement('div');
  textContainer.id = 'prompter-text-container' + randomString;
  textContainer.classList.add('prompter-text-container');
  textContainer.appendChild(textElement);

  /**
   * The actions menu represented by the ellipsis character.
   * @type {HTMLDivElement}
   */
  const ellipsisElement = document.createElement('div');
  ellipsisElement.id = 'ellipsis' + randomString;
  ellipsisElement.classList.add('ellipsis');
  ellipsisElement.innerHTML = '...';

  /**
   * The tag element.
   * @type {HTMLDivElement}
   */
  const tagElement = document.createElement('div');
  tagElement.id = 'tag-icon' + randomString;
  tagElement.classList.add('tag-icon');
  tagElement.innerHTML = '&#182;';

  /**
   * The candidates element that contains the candidates for a word.
   * @type {HTMLDivElement}
   */
  const candidatesElement = document.createElement('div');
  candidatesElement.id = 'candidates' + randomString;
  candidatesElement.classList.add('candidates');

  /**
   * The menu element that contains the actions.
   * @type {HTMLDivElement}
   */
  const menuElement = document.createElement('div');
  menuElement.id = 'more-menu' + randomString;
  menuElement.classList.add('more-menu');

  /**
   * The convert button from actions menu.
   * @type {HTMLButtonElement}
   */
  const convertElement = document.createElement('button');
  convertElement.classList.add('options-label-button');
  convertElement.id = 'convert' + randomString;
  convertElement.innerHTML = 'Convert';

  /**
   * The copy button from actions menu.
   * @type {HTMLButtonElement}
   */
  const copyElement = document.createElement('button');
  copyElement.classList.add('options-label-button');
  copyElement.id = 'copy' + randomString;
  copyElement.innerHTML = 'Copy';

  /**
   * The delete button from actions menu.
   * @type {HTMLButtonElement}
   */
  const deleteElement = document.createElement('button');
  deleteElement.classList.add('options-label-button');
  deleteElement.id = 'delete' + randomString;
  deleteElement.innerHTML = 'Delete';

  return {
    smartGuideElement,
    textElement,
    textContainer,
    candidatesElement,
    menuElement,
    tagElement,
    ellipsisElement,
    convertElement,
    copyElement,
    deleteElement,
  };
}

/**
 * Check if node is in shadow dom
 * @param {Node} node - A node element.
 * @returns {boolean} true if is in shadow dom, false otherwise.
 */
function isInShadow(node) {
  let parent = (node && node.parentNode);
  while (parent) {
    if (parent.toString() === '[object ShadowRoot]') {
      return true;
    }
    parent = parent.parentNode;
  }
  return false;
}

/**
 * Show the actions of the action menu.
 * @param {Event} evt - Event used to insert the option div using the event's target.
 * @param {Object} elements - All the elements of the smart guide.
 * @param {SmartGuide} smartGuide
 */
function showActions(evt, elements) {
  const elementsRef = elements;

  const insertActions = () => {
    elementsRef.menuElement.appendChild(elementsRef.convertElement);
    elementsRef.menuElement.appendChild(elementsRef.copyElement);
    elementsRef.menuElement.appendChild(elementsRef.deleteElement);

    const parent = evt.target.parentNode;
    parent.insertBefore(elementsRef.menuElement, evt.target);
  };

  const positionActions = () => {
    // 48 to get the boundary of smart guide element.
    const left = evt.target.offsetLeft - 68;
    elementsRef.menuElement.style.left = `${left}px`;
  };

  const isMenuInDocument = document.contains(elementsRef.menuElement);
  if (!isInShadow(elementsRef.menuElement) && !isMenuInDocument) {
    elementsRef.menuElement.style.display = 'flex';
    positionActions();
    insertActions();
  } else if (elementsRef.menuElement.style.display === 'none') {
    positionActions();
    elementsRef.menuElement.style.display = 'flex';
  }
}

/**
 * Show the candidates of the clicked word.
 * @param {Event} evt - Event used to determine the clicked word.
 * @param {Editor} editor - A reference to the editor.
 * @param {SmartGuide} smartGuide - A reference to the smart guide.
 */
function showCandidates(evt, editor, smartGuide) {
  const smartGuideRef = smartGuide;
  const elementsRef = smartGuide.elements;

  if (evt.target.id !== `prompter-text${smartGuide.randomString}`) {
    const id = evt.target.id.replace('word-', '').replace(smartGuide.randomString, '');
    const words = JSON.parse(editor.exports[Constants.Exports.JIIX]).words;
    smartGuideRef.wordToChange = words[id];
    smartGuideRef.wordToChange.id = id;
    elementsRef.candidatesElement.innerHTML = '';
    if (smartGuideRef.wordToChange && smartGuideRef.wordToChange.candidates) {
      elementsRef.candidatesElement.style.display = 'flex';
      smartGuideRef.wordToChange.candidates.forEach((word, index) => {
        if (smartGuideRef.wordToChange.label === word) {
          elementsRef.candidatesElement.innerHTML += `<span id="cdt-${index}${smartGuide.randomString}" class="selected-word">${word}</span>`;
        } else {
          elementsRef.candidatesElement.innerHTML += `<span id="cdt-${index}${smartGuide.randomString}">${word}</span>`;
        }
      });
      // get the parent parent of word to insert just before smart guide, 48 to get the boundary of smart guide element.
      const top = 48;
      const left = evt.target.getBoundingClientRect().left - 60;
      elementsRef.candidatesElement.style.top = `${top}px`;
      elementsRef.candidatesElement.style.left = `${left}px`;

      const parent = evt.target.parentNode.parentNode.parentNode;
      parent.insertBefore(elementsRef.candidatesElement, evt.target.parentNode.parentNode);
    }
  }
}

/**
 * Call the import_ function of the editor to import the modified Jiix with the new label.
 * @param {Event} evt - Event to determine the clicked candidate.
 * @param {Editor} editor - A reference to the editor.
 * @param {SmartGuide} smartGuide - A reference to the smart guide.
 */
function clickCandidate(evt, editor, smartGuide) {
  const smartGuideRef = smartGuide;
  const elementsRef = smartGuide.elements;
  const candidate = evt.target.innerText;

  if (candidate !== smartGuideRef.wordToChange.label && smartGuideRef.wordToChange.candidates.includes(candidate)) {
    const jiixToImport = JSON.parse(editor.exports[Constants.Exports.JIIX]);
    jiixToImport.words[smartGuideRef.wordToChange.id].label = candidate;
    // eslint-disable-next-line no-underscore-dangle
    editor.import_(JSON.stringify(jiixToImport), Constants.Exports.JIIX);
  }
  elementsRef.candidatesElement.style.display = 'none';
}

/**
 * Add the listeners to the smart guide elements.
 * @param {Editor} editor - A reference to the editor.
 * @param {SmartGuide} smartGuide - A reference to the smart guide.
 */
function addListeners(editor, smartGuide) {
  const elementsRef = smartGuide.elements;

  elementsRef.textElement.addEventListener('click', evt => showCandidates(evt, editor, smartGuide));
  elementsRef.candidatesElement.addEventListener('click', evt => clickCandidate(evt, editor, smartGuide));
  elementsRef.ellipsisElement.addEventListener('click', evt => showActions(evt, elementsRef));
  elementsRef.copyElement.addEventListener('click', () => {
    elementsRef.menuElement.style.display = 'none';
  });
  elementsRef.convertElement.addEventListener('click', () => {
    elementsRef.menuElement.style.display = 'none';
    editor.convert();
  });
  elementsRef.deleteElement.addEventListener('click', () => {
    elementsRef.menuElement.style.display = 'none';
    editor.clear();
  });
}

/**
 * Call mutation observer to trigger fade out animation.
 * @param {number} [duration=10000] - the duration in milliseconds before calling the fade out animation.
 * @param {SmartGuide} smartGuide - A reference to the smart guide.
 */
function callFadeOutObserver(duration = 10000, smartGuide) {
  const smartGuideRef = smartGuide;
  const elementsRef = smartGuide.elements;
  // eslint-disable-next-line no-undef
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      if (smartGuideRef.smartGuideTimeOutId) {
        clearTimeout(smartGuideRef.smartGuideTimeOutId);
      }
      if (elementsRef.candidatesElement.style.display === 'none' && elementsRef.menuElement.style.display === 'none') {
        smartGuideRef.smartGuideTimeOutId = setTimeout(() => {
          elementsRef.smartGuideElement.classList.add('smartguide-out');
          elementsRef.smartGuideElement.classList.remove('smartguide-in');
        }, duration);
      } else if (!document.contains(elementsRef.candidatesElement) && !document.contains(elementsRef.menuElement)) {
        smartGuideRef.smartGuideTimeOutId = setTimeout(() => {
          elementsRef.smartGuideElement.classList.add('smartguide-out');
          elementsRef.smartGuideElement.classList.remove('smartguide-in');
        }, duration);
      }
    });
  });
  observer.observe(elementsRef.smartGuideElement, { childList: true, subtree: true, attributes: true });
}

/**
 * Create a new smart guide
 * @param {Editor} editor - A reference to the editor.
 * @returns {SmartGuide} New smart guide
 */
export function createSmartGuide(editor) {
  const randomString = '-' + Math.random().toString(10).substring(2, 12);
  const elements = createHTMLElements(randomString);

  /**
   * Clipboard from clipboard.js used to get copy across all browsers.
   * @type {Clipboard}
   */
  const clipboard = new Clipboard(elements.copyElement);
  const perfectScrollbar = new PerfectScrollbar(elements.textContainer, { suppressScrollY: true });

  const smartGuide = {
    editor,
    wordToChange: '',
    lastWord: '',
    previousLabelExport: ' ',
    perfectScrollbar,
    elements,
    smartGuideTimeOutId: 0,
    randomString
  };
  addListeners(editor, smartGuide);

  if (editor.configuration.recognitionParams.v4.text.smartGuideFadeOut.enable) {
    callFadeOutObserver(editor.configuration.recognitionParams.v4.text.smartGuideFadeOut.duration, smartGuide);
  }

  return smartGuide;
}

export function resize(smartGuide) {
  const smartGuideRef = smartGuide;
  const elementsRef = smartGuide.elements;

  const mmToPixels = 3.779527559;
  let left = smartGuideRef.editor.configuration.recognitionParams.v4.text.margin.left * mmToPixels;

  const maxWidthTextContainer = smartGuideRef.editor.domElement.clientWidth - left - elementsRef.tagElement.offsetWidth - 35 - left;

  // Assign a max width to the smartguide based on the editor width, the left position and a small margin for the ellipsis (48px)
  elementsRef.textContainer.style.width = `${maxWidthTextContainer}px`;
  elementsRef.textContainer.style.maxWidth = `${maxWidthTextContainer}px`;

  left = elementsRef.tagElement.offsetWidth;
  left += maxWidthTextContainer;
  elementsRef.ellipsisElement.style.left = `${left}px`;

  elementsRef.smartGuideElement.style.width = `${elementsRef.tagElement.offsetWidth + elementsRef.textContainer.offsetWidth + elementsRef.ellipsisElement.offsetWidth}px`;
  smartGuideRef.perfectScrollbar.update();
}

/**
 * Insert the smart guide HTML elements in the DOM.
 * @param {SmartGuide} smartGuide - A reference to the smart guide.
 */
export function insertSmartGuide(smartGuide) {
  const smartGuideRef = smartGuide;
  const elementsRef = smartGuide.elements;

  const insertSmartGuideElement = (left, top) => {
    elementsRef.smartGuideElement.style.top = `${top}px`;
    elementsRef.smartGuideElement.style.left = `${left}px`;
    elementsRef.smartGuideElement.style.visibility = 'hidden';

    const parent = smartGuideRef.editor.domElement;
    parent.insertBefore(elementsRef.smartGuideElement, smartGuideRef.editor.loader);
  };
  const insertTag = () => {
    elementsRef.smartGuideElement.appendChild(elementsRef.tagElement);
  };
  const insertTextContainer = (left, maxWidth) => {
    elementsRef.textContainer.style.left = `${left}px`;

    // Assign a max width to the smartguide based on the editor width, the left position and a small margin for the ellipsis (48px)
    elementsRef.textContainer.style.width = `${maxWidth}px`;
    elementsRef.textContainer.style.maxWidth = `${maxWidth}px`;

    elementsRef.smartGuideElement.appendChild(elementsRef.textContainer);
  };
  const insertEllipsis = (left) => {
    elementsRef.ellipsisElement.style.left = `${left}px`;

    elementsRef.smartGuideElement.appendChild(elementsRef.ellipsisElement);
  };


  // FIXME Use value from contentChanged when available

  const mmToPixels = 3.779527559;

  const marginTop = smartGuideRef.editor.configuration.recognitionParams.v4.text.margin.top * mmToPixels;
  const marginLeft = smartGuideRef.editor.configuration.recognitionParams.v4.text.margin.left * mmToPixels;

  // 12 is the space between line in mm
  const top = marginTop - (12 * mmToPixels);
  let left = marginLeft;

  insertSmartGuideElement(left, top);
  insertTag();

  // 35 is the ellipsis element width
  const maxWidthTextContainer = smartGuideRef.editor.domElement.clientWidth - left - elementsRef.tagElement.offsetWidth - 35 - left;
  left = elementsRef.tagElement.offsetWidth;
  insertTextContainer(left, maxWidthTextContainer);

  left += maxWidthTextContainer;
  insertEllipsis(left);

  elementsRef.menuElement.style.display = 'none';
  elementsRef.menuElement.appendChild(elementsRef.convertElement);
  elementsRef.menuElement.appendChild(elementsRef.copyElement);
  elementsRef.menuElement.appendChild(elementsRef.deleteElement);
  elementsRef.smartGuideElement.appendChild(elementsRef.menuElement);

  elementsRef.candidatesElement.style.display = 'none';
  elementsRef.smartGuideElement.appendChild(elementsRef.candidatesElement);

  // 48px as set in css
  elementsRef.smartGuideElement.style.height = '48px';
  elementsRef.smartGuideElement.style.width = `${elementsRef.tagElement.offsetWidth + elementsRef.textContainer.offsetWidth + elementsRef.ellipsisElement.offsetWidth}px`;
  smartGuideRef.perfectScrollbar.update();
}

/**
 * Launch the smartguide.
 * @param {SmartGuide} smartGuide - A reference to the smart guide.
 * @param {Object} exports -  The export from the editor.
 */
export function launchSmartGuide(smartGuide, exports) {
  const smartGuideRef = smartGuide;
  const elementsRef = smartGuide.elements;

  const isSmartGuideInDocument = document.contains(elementsRef.smartGuideElement);

  if (!isInShadow(elementsRef.smartGuideElement) && !isSmartGuideInDocument) {
    insertSmartGuide(smartGuide);
  }

  const addAnimationToModifiedWord = (words) => {
    if (smartGuideRef.tempWords && smartGuideRef.tempWords.length === words.length) {
      const labelWordsArray = words.map(word => word.label);
      const tempLabelWordsArray = smartGuideRef.tempWords.map(word => word.label);
      const wordChangedId = labelWordsArray.indexOf(labelWordsArray.filter(a => tempLabelWordsArray.indexOf(a) === -1)[0]);
      if (document.getElementById(`word-${wordChangedId}${smartGuide.randomString}`) && wordChangedId > -1) {
        document.getElementById(`word-${wordChangedId}${smartGuide.randomString}`).classList.add('modified-word');
        elementsRef.textContainer.scrollLeft = document.getElementById(`word-${wordChangedId}${smartGuide.randomString}`).offsetLeft - 10;
      }
    }
    smartGuideRef.tempWords = JSON.parse(exports[Constants.Exports.JIIX]).words;
  };

  const createWordSpan = (empty, index, word) => {
    const span = document.createElement('span');
    span.id = `word-${index}${smartGuide.randomString}`;
    if (empty) {
      span.innerHTML = '&nbsp;';
    } else {
      span.textContent = word.label;
    }
    return span;
  };

  // Possible optimisation ? Check if we can find a way to not repopulate the smartguide every time even if we now use Document fragment
  const populatePrompter = (words) => {
    elementsRef.textElement.innerHTML = '';
    // We use a DocumentFragment to reflow the DOM only one time as it is not part of the DOM
    const myFragment = document.createDocumentFragment();
    words.forEach((word, index) => {
      if (word.label === ' ' || word.label.includes('\n')) {
        myFragment.appendChild(createWordSpan(true, index));
      } else if (index !== words.length - 1) {
        myFragment.appendChild(createWordSpan(false, index, word));
      } else {
        elementsRef.textElement.appendChild(myFragment);
        smartGuideRef.perfectScrollbar.update();
        if (smartGuideRef.lastWord === '') {
          smartGuideRef.lastWord = word;
        }
        const span = createWordSpan(false, index, word);
        // This is used to scroll to last word if last word is modified
        if ((smartGuideRef.lastWord.candidates !== word.candidates) && (smartGuideRef.lastWord.label !== word.label)) {
          span.classList.add('added-word');
          elementsRef.textElement.appendChild(span);
          elementsRef.textContainer.scrollLeft = span.offsetLeft;
          smartGuideRef.lastWord = word;
        } else {
          elementsRef.textElement.appendChild(span);
          elementsRef.textContainer.scrollLeft = span.offsetLeft;
        }
      }
    });
  };

  if (exports && JSON.parse(exports[Constants.Exports.JIIX]).words.length > 0) {
    elementsRef.smartGuideElement.classList.add('smartguide-in');
    elementsRef.smartGuideElement.classList.remove('smartguide-out');
    elementsRef.candidatesElement.style.display = 'none';
    elementsRef.menuElement.style.display = 'none';
    if (smartGuideRef.previousLabelExport && smartGuideRef.previousLabelExport !== JSON.parse(exports[Constants.Exports.JIIX]).label) {
      const words = JSON.parse(exports[Constants.Exports.JIIX]).words;
      populatePrompter(words);
      addAnimationToModifiedWord(words);
    }
    smartGuideRef.previousLabelExport = JSON.parse(exports[Constants.Exports.JIIX]).label;
    // This is required by clipboard.js to get the text to be copied.
    elementsRef.copyElement.setAttribute('data-clipboard-text', JSON.parse(exports[Constants.Exports.JIIX]).label);
  } else {
    elementsRef.smartGuideElement.classList.add('smartguide-out');
    elementsRef.smartGuideElement.classList.remove('smartguide-in');
  }

  return smartGuideRef;
}
