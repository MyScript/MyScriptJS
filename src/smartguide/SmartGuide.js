import PerfectScrollbar from 'perfect-scrollbar';
import Clipboard from 'clipboard';
import Constants from '../configuration/Constants';

/**
 * Smart Guide
 */
export default class SmartGuide {

  /**
   * @constructor
   * @param editor - The editor.
   */
  constructor(editor) {
    /**
     * Reference to the editor
     * @type {Editor}
     */
    this.editor = editor;
    /**
     * Word to change.
     * @type {string}
     */
    this.wordToChange = '';
    /**
     * Keep the last word of the previous export to compare with the new and scroll if it's different.
     * @type {string}
     */
    this.lastWord = '';
    /**
     * Keep the previous label export to know if we should repopulate the prompter text.
     * @type {string}
     */
    this.previousLabelExport = ' ';

    this.addHtml();
    this.addListeners();

    /**
     * Clipboard from clipboard.js used to get copy across all browsers.
     * @type {Clipboard}
     */
    const clipboard = new Clipboard(this.copyElement);

    /**
     * Perfect Scrollbar used to get gestures from smart guide using touch-action none anyway and get scrolling too!
     * @type {PerfectScrollbar}
     */
    this.ps = new PerfectScrollbar(this.textContainer, { suppressScrollY: true });
  }

  /**
   * Call mutation observer to trigger fade out animation.
   * @param {number} [duration=10000] - the duration in milliseconds before calling the fade out animation.
   */
  callFadeOutObserver(duration = 10000) {
    // eslint-disable-next-line no-undef
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        if (this.hideTimer) {
          clearTimeout(this.hideTimer);
        }
        if (this.candidatesElement.style.display === 'none' && this.optionsElement.style.display === 'none') {
          this.hideTimer = setTimeout(() => {
            this.smartGuideElement.classList.add('smartguide-out');
            this.smartGuideElement.classList.remove('smartguide-in');
          }, duration);
        } else if (!document.contains(this.candidatesElement) && !document.contains(this.optionsElement)) {
          this.hideTimer = setTimeout(() => {
            this.smartGuideElement.classList.add('smartguide-out');
            this.smartGuideElement.classList.remove('smartguide-in');
          }, duration);
        }
      });
    });
    observer.observe(this.smartGuideElement, { childList: true, subtree: true, attributes: true });
  }

  /**
   * Create all the smart guide HTML elements.
   */
  addHtml() {
    /**
     * The smart guide element.
     * @type {HTMLDivElement}
     */
    this.smartGuideElement = document.createElement('div');
    this.smartGuideElement.id = 'smartguide';

    /**
     * The prompter text element that contains the text to get the overflow working.
     * @type {HTMLDivElement}
     */
    this.textElement = document.createElement('div');
    this.textElement.id = 'prompter-text';
    // we use touch-action auto to get the overflow scroll on touch device
    this.textElement.setAttribute('touch-action', 'none');
    /**
     * The text container element that contains the text element.
     * @type {HTMLDivElement}
     */
    this.textContainer = document.createElement('div');
    this.textContainer.id = 'prompter-text-container';
    this.textContainer.classList.add('prompter-text-container');
    this.textContainer.appendChild(this.textElement);

    /**
     * The actions menu represented by the ellipsis character.
     * @type {HTMLDivElement}
     */
    this.ellipsisElement = document.createElement('div');
    this.ellipsisElement.id = 'ellipsis';
    this.ellipsisElement.innerHTML = '...';

    /**
     * The tag element.
     * @type {HTMLDivElement}
     */
    this.tagElement = document.createElement('div');
    this.tagElement.id = 'tag-icon';
    this.tagElement.classList.add('tag-icon');
    this.tagElement.innerHTML = '&#182;';

    /**
     * The candidates element that contains the candidates for a word.
     * @type {HTMLDivElement}
     */
    this.candidatesElement = document.createElement('div');
    this.candidatesElement.classList.add('candidates');

    /**
     * The options element that contains the options / actions.
     * @type {HTMLDivElement}
     */
    this.optionsElement = document.createElement('div');
    this.optionsElement.classList.add('options');

    /**
     * The convert button from actions menu.
     * @type {HTMLButtonElement}
     */
    this.convertElement = document.createElement('button');
    this.convertElement.classList.add('options-label-button');
    this.convertElement.id = 'convert';
    this.convertElement.innerHTML = 'Convert';

    /**
     * The copy button from actions menu.
     * @type {HTMLButtonElement}
     */
    this.copyElement = document.createElement('button');
    this.copyElement.classList.add('options-label-button');
    this.copyElement.id = 'copy';
    this.copyElement.innerHTML = 'Copy';

    /**
     * The delete button from actions menu.
     * @type {HTMLButtonElement}
     */
    this.deleteElement = document.createElement('button');
    this.deleteElement.classList.add('options-label-button');
    this.deleteElement.id = 'delete';
    this.deleteElement.innerHTML = 'Delete';
  }

  /**
   * Add the listeners to the smart guide elements.
   */
  addListeners() {
    this.textElement.addEventListener('click', this.showCandidates.bind(this));
    this.candidatesElement.addEventListener('click', this.clickCandidate.bind(this));
    this.ellipsisElement.addEventListener('click', this.showOptions.bind(this));
    this.copyElement.addEventListener('click', this.hideOptions.bind(this));
    this.convertElement.addEventListener('click', () => { this.editor.convert(); });
    this.deleteElement.addEventListener('click', () => { this.editor.clear(); });
  }

  /**
   * Show the options of the action menu.
   * @param {Event} evt - Event used to insert the option div using the event's target.
   */
  showOptions(evt) {
    const insertOptions = () => {
      this.optionsElement.appendChild(this.convertElement);
      this.optionsElement.appendChild(this.copyElement);
      this.optionsElement.appendChild(this.deleteElement);

      const parent = evt.target.parentNode;
      parent.insertBefore(this.optionsElement, evt.target);
    };

    const positionOptions = () => {
      // 47 (48 minus border) to get the boundary of smart guide element.
      const top = 47;
      const left = evt.target.offsetLeft - 42;
      this.optionsElement.style.top = `${top}px`;
      this.optionsElement.style.left = `${left}px`;
    };

    const textWebElement = document.querySelector('myscript-text-web');
    const commonElement = textWebElement ? textWebElement.shadowRoot.querySelector('myscript-common-element') : document.querySelector('myscript-common-element');

    const isOptionsInCommonOrWebElement = commonElement ? commonElement.shadowRoot.querySelector('.options') : false;
    const isOptionsInDocument = document.querySelector('.options');

    if (this.candidatesElement.style.display !== 'none') {
      this.candidatesElement.style.display = 'none';
    }

    if (!isOptionsInCommonOrWebElement && !isOptionsInDocument) {
      this.optionsElement.style.display = 'block';
      positionOptions();
      insertOptions();
    } else if (this.optionsElement.style.display !== 'none') {
      this.optionsElement.style.display = 'none';
    } else if (this.optionsElement.style.display === 'none') {
      positionOptions();
      this.optionsElement.style.display = 'block';
    }
  }

  /**
   * Show the candidates of the clicked word.
   * @param evt - Event used to determine the clicked word.
   */
  showCandidates(evt) {
    if (this.optionsElement.style.display !== 'none') {
      this.optionsElement.style.display = 'none';
    }
    if (evt.target.id !== 'prompter-text') {
      const id = evt.target.id;
      const words = JSON.parse(this.editor.exports[Constants.Exports.JIIX]).words;
      this.wordToChange = words[id];
      this.wordToChange.id = id;
      this.candidatesElement.innerHTML = '';
      if (this.wordToChange && this.wordToChange.candidates) {
        this.candidatesElement.style.display = 'block';
        this.wordToChange.candidates.forEach((word) => {
          if (this.wordToChange.label === word) {
            this.candidatesElement.innerHTML += `<span><b>${word}</b> &#10004;</span><br>`;
          } else {
            this.candidatesElement.innerHTML += `<span>${word}</span><br>`;
          }
        });
        // get the parent parent of word to insert just before smart guide, 47 (48 minus border) to get the boundary of smart guide element.
        const top = 47;
        const left = evt.target.getBoundingClientRect().left - 40;
        this.candidatesElement.style.top = `${top}px`;
        this.candidatesElement.style.left = `${left}px`;

        const parent = evt.target.parentNode.parentNode.parentNode;
        parent.insertBefore(this.candidatesElement, evt.target.parentNode.parentNode);
      }
    }
  }

  /**
   * Call the importContent function of the editor to import the modified Jiix with the new label.
   * @param evt - Event to determine the clicked candidate.
   */
  clickCandidate(evt) {
    const candidate = evt.target.innerText;
    if (candidate !== this.wordToChange.label && this.wordToChange.candidates.includes(candidate)) {
      const jiixToImport = JSON.parse(this.editor.exports[Constants.Exports.JIIX]);
      jiixToImport.words[this.wordToChange.id].label = candidate;
      const xToImport = jiixToImport.words[0]['bounding-box'].x;
      const yToImport = jiixToImport.words[0]['bounding-box'].y;
      this.editor.importContent({ x: xToImport, y: yToImport }, JSON.stringify(jiixToImport), Constants.Exports.JIIX);
    }
    this.hideCandidates();
  }

  /**
   * Hide the candidates div.
   */
  hideCandidates() {
    this.candidatesElement.style.display = 'none';
  }

  /**
   * Hide the options div.
   */
  hideOptions() {
    this.optionsElement.style.display = 'none';
  }

  /**
   * Launch the smartguide.
   * @param exports -  The export from the editor.
   */
  launchSmartGuide(exports) {
    const textWebElement = document.querySelector('myscript-text-web');
    const commonElement = textWebElement ? textWebElement.shadowRoot.querySelector('myscript-common-element') : document.querySelector('myscript-common-element');

    const isSmartGuideInCommonOrWebElement = commonElement ? commonElement.shadowRoot.querySelector('#smartguide') : false;
    const isSmartGuideInDocument = document.querySelector('#smartguide');

    if (!isSmartGuideInCommonOrWebElement && !isSmartGuideInDocument) {
      this.insertSmartGuide();
    }

    const addAnimationToModifiedWord = (words) => {
      if (this.tempWords && this.tempWords.length === words.length) {
        const labelWordsArray = words.map(word => word.label);
        const tempLabelWordsArray = this.tempWords.map(word => word.label);
        const wordChangedId = labelWordsArray.indexOf(labelWordsArray.filter(a => tempLabelWordsArray.indexOf(a) === -1)[0]);
        if (document.getElementById(`${wordChangedId}`) && wordChangedId > -1) {
          document.getElementById(`${wordChangedId}`).classList.add('modified-word');
          this.textContainer.scrollLeft = document.getElementById(`${wordChangedId}`).offsetLeft - 10;
        }
      }
      this.tempWords = JSON.parse(exports[Constants.Exports.JIIX]).words;
    };

    const createWordSpan = (empty, index, word) => {
      const span = document.createElement('span');
      span.id = index;
      if (empty) {
        span.innerHTML = '&nbsp;';
      } else {
        span.textContent = word.label;
      }
      return span;
    };

    // Possible optimisation ? Check if we can find a way to not repopulate the smartguide every time even if we now use Document fragment
    const populatePrompter = (words) => {
      this.textElement.innerHTML = '';
      // We use a DocumentFragment to reflow the DOM only one time as it is not part of the DOM
      const myFragment = document.createDocumentFragment();
      words.forEach((word, index) => {
        if (word.label === ' ' || word.label === '\n') {
          myFragment.appendChild(createWordSpan(true, index));
        } else if (index !== words.length - 1) {
          myFragment.appendChild(createWordSpan(false, index, word));
        } else {
          this.textElement.appendChild(myFragment);
          this.ps.update();
          if (this.lastWord === '') {
            this.lastWord = word;
          }
          const span = createWordSpan(false, index, word);
          // This is used to scroll to last word if last word is modified
          if ((this.lastWord.candidates !== word.candidates) && (this.lastWord.label !== word.label)) {
            span.classList.add('modified-word');
            this.textElement.appendChild(span);
            this.textContainer.scrollLeft = span.offsetLeft;
            this.lastWord = word;
          } else {
            this.textElement.appendChild(span);
            this.textContainer.scrollLeft = span.offsetLeft;
          }
        }
      });
    };

    if (exports && JSON.parse(exports[Constants.Exports.JIIX]).words.length > 0) {
      this.smartGuideElement.classList.add('smartguide-in');
      this.smartGuideElement.classList.remove('smartguide-out');
      this.hideCandidates();
      this.hideOptions();
      if (this.previousLabelExport && this.previousLabelExport !== JSON.parse(exports[Constants.Exports.JIIX]).label) {
        const words = JSON.parse(exports[Constants.Exports.JIIX]).words;
        populatePrompter(words);
        addAnimationToModifiedWord(words);
      }
      this.previousLabelExport = JSON.parse(exports[Constants.Exports.JIIX]).label;
      // This is required by clipboard.js to get the text to be copied.
      this.copyElement.setAttribute('data-clipboard-text', JSON.parse(exports[Constants.Exports.JIIX]).label);
    } else {
      this.smartGuideElement.classList.add('smartguide-out');
      this.smartGuideElement.classList.remove('smartguide-in');
    }
  }

  /**
   * Insert the smart guide HTML elements in the DOM.
   */
  insertSmartGuide() {
    const insertSmartGuideElement = (left, top) => {
      this.smartGuideElement.style.top = `${top}px`;
      this.smartGuideElement.style.left = `${left}px`;
      this.smartGuideElement.style.visibility = 'hidden';

      const parent = this.editor.domElement;
      parent.insertBefore(this.smartGuideElement, this.editor.loader);
    };
    const insertTag = () => {
      this.smartGuideElement.appendChild(this.tagElement);
    };
    const insertTextContainer = (left, maxWidth) => {
      this.textContainer.style.left = `${left}px`;

      // Assign a max width to the smartguide based on the editor width, the left position and a small margin for the ellipsis (48px)
      this.textContainer.style.width = `${maxWidth}px`;
      this.textContainer.style.maxWidth = `${maxWidth}px`;

      this.smartGuideElement.appendChild(this.textContainer);
    };
    const insertEllipsis = (left) => {
      this.ellipsisElement.style.left = `${left}px`;

      this.smartGuideElement.appendChild(this.ellipsisElement);
    };


    // FIXME Use value from contentChanged when available
    const top = 20;
    let left = 40;

    insertSmartGuideElement(left, top);
    insertTag();

    left = this.tagElement.offsetWidth;
    const maxWidth = this.editor.domElement.clientWidth - 40 - left - 48;
    insertTextContainer(left, maxWidth);

    left += maxWidth;
    insertEllipsis(left);

    // 48px as set in css
    this.smartGuideElement.style.height = '48px';
    this.smartGuideElement.style.width = `${this.tagElement.offsetWidth + this.textContainer.offsetWidth + this.ellipsisElement.offsetWidth}px`;
    this.ps.update();
    this.callFadeOutObserver(10000);
  }
}
