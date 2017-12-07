import PerfectScrollbar from 'perfect-scrollbar';
import Clipboard from 'clipboard';
import { smartGuideLogger as logger } from '../configuration/LoggerConfig';

export default class SmartGuide {

  constructor(editor) {
    this.editor = editor;
    this.wordToChange = '';
    this.candidate = '';
    this.lastWord = '';
    this.previousLabelExport = ' ';

    this.addHtml();
    this.addListeners();

    const clipboard = new Clipboard(this.copyElement);

    // Perfect Scrollbar used to get gestures from smartguide using touch-action none anyway and get scrolling too!
    this.ps = new PerfectScrollbar(this.textContainer, { suppressScrollY: true });
  }

  // Add a fade out to the smartguide
  callFadeOutObserver(duration) {
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

  addHtml() {
    this.smartGuideElement = document.createElement('div');
    this.smartGuideElement.id = 'smartguide';

    // text is in textElement to get the overflow working
    this.textElement = document.createElement('div');
    this.textElement.id = 'prompter-text';
    // we use touch-action auto to get the overflow scroll on touch device
    this.textElement.setAttribute('touch-action', 'none');
    this.textContainer = document.createElement('div');
    this.textContainer.id = 'prompter-text-container';
    this.textContainer.classList.add('prompter-text-container');
    this.textContainer.appendChild(this.textElement);

    this.ellipsisElement = document.createElement('div');
    this.ellipsisElement.id = 'ellipsis';
    this.ellipsisElement.innerHTML = '...';

    this.tagElement = document.createElement('div');
    this.tagElement.id = 'tag-icon';
    this.tagElement.classList.add('tag-icon');
    this.tagElement.innerHTML = '&#182;';

    this.candidatesElement = document.createElement('div');
    this.candidatesElement.classList.add('candidates');

    this.optionsElement = document.createElement('div');
    this.optionsElement.classList.add('options');

    this.convertElement = document.createElement('button');
    this.convertElement.classList.add('options-label-button');
    this.convertElement.id = 'convert';
    this.convertElement.innerHTML = 'Convert';

    this.copyElement = document.createElement('button');
    this.copyElement.classList.add('options-label-button');
    this.copyElement.id = 'copy';
    this.copyElement.innerHTML = 'Copy';

    this.deleteElement = document.createElement('button');
    this.deleteElement.classList.add('options-label-button');
    this.deleteElement.id = 'delete';
    this.deleteElement.innerHTML = 'Delete';
  }

  addListeners() {
    this.textElement.addEventListener('click', this.showCandidates.bind(this));
    this.candidatesElement.addEventListener('click', this.clickCandidate.bind(this));
    this.ellipsisElement.addEventListener('click', this.showOptions.bind(this));
    this.copyElement.addEventListener('click', this.hideOptions.bind(this));
    this.convertElement.addEventListener('click', () => { this.editor.convert(); });
    this.deleteElement.addEventListener('click', () => { this.editor.clear(); });
  }

  showOptions(evt) {
    const insertOptions = () => {
      this.optionsElement.appendChild(this.convertElement);
      this.optionsElement.appendChild(this.copyElement);
      this.optionsElement.appendChild(this.deleteElement);

      const parent = evt.target.parentNode;
      parent.insertBefore(this.optionsElement, evt.target);
    };

    const positionOptions = () => {
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

  showCandidates(evt) {
    if (this.optionsElement.style.display !== 'none') {
      this.optionsElement.style.display = 'none';
    }
    if (evt.target.id !== 'smartguide-text') {
      const id = evt.target.id;
      const words = JSON.parse(this.editor.exports['application/vnd.myscript.jiix']).words;
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
        // get the parent parent of word to insert just before smartguide
        // 47 (48 minus border) to get the boundary of smartguide element
        const top = 47;
        const left = evt.target.getBoundingClientRect().left - 40;
        logger.debug(evt.target.getBoundingClientRect());
        this.candidatesElement.style.top = `${top}px`;
        this.candidatesElement.style.left = `${left}px`;

        const parent = evt.target.parentNode.parentNode.parentNode;
        parent.insertBefore(this.candidatesElement, evt.target.parentNode.parentNode);
      }
    }
  }

  clickCandidate(evt) {
    this.candidate = evt.target.innerText;
    if (this.candidate !== this.wordToChange.label && this.wordToChange.candidates.includes(this.candidate)) {
      const jiixToImport = JSON.parse(this.editor.exports['application/vnd.myscript.jiix']);
      jiixToImport.words[this.wordToChange.id].label = this.candidate;
      const xToImport = jiixToImport.words[0]['bounding-box'].x;
      const yToImport = jiixToImport.words[0]['bounding-box'].y;
      this.editor.importContent({ x: xToImport, y: yToImport }, JSON.stringify(jiixToImport), 'application/vnd.myscript.jiix');
      logger.debug(this.wordToChange.id);
      logger.debug(this.candidate);
    }
    this.hideCandidates();
  }

  hideCandidates() {
    this.candidatesElement.style.display = 'none';
  }

  hideOptions() {
    this.optionsElement.style.display = 'none';
  }

  launchSmartGuide(exports) {
    const textWebElement = document.querySelector('myscript-text-web');
    const commonElement = textWebElement ? textWebElement.shadowRoot.querySelector('myscript-common-element') : document.querySelector('myscript-common-element');

    const isSmartGuideInCommonOrWebElement = commonElement ? commonElement.shadowRoot.querySelector('#smartguide') : false;
    const isSmartGuideInDocument = document.querySelector('#smartguide');

    if (!isSmartGuideInCommonOrWebElement && !isSmartGuideInDocument) {
      this.insertSmartGuide();
    }

    const addBoldToModifiedWord = (words) => {
      if (this.tempWords && this.tempWords.length === words.length) {
        const labelWordsArray = words.map(word => word.label);
        const tempLabelWordsArray = this.tempWords.map(word => word.label);
        const wordChangedId = labelWordsArray.indexOf(labelWordsArray.filter(a => tempLabelWordsArray.indexOf(a) === -1)[0]);
        if (document.getElementById(`${wordChangedId}`) && wordChangedId > -1) {
          document.getElementById(`${wordChangedId}`).classList.add('last-word');
          this.textContainer.scrollLeft = document.getElementById(`${wordChangedId}`).offsetLeft - 10;
        }
      }
      this.tempWords = JSON.parse(exports['application/vnd.myscript.jiix']).words;
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
            span.classList.add('last-word');
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

    if (exports && JSON.parse(exports['application/vnd.myscript.jiix']).words.length > 0) {
      this.smartGuideElement.classList.add('smartguide-in');
      this.smartGuideElement.classList.remove('smartguide-out');
      this.hideCandidates();
      this.hideOptions();
      if (this.previousLabelExport && this.previousLabelExport !== JSON.parse(exports['application/vnd.myscript.jiix']).label) {
        const words = JSON.parse(exports['application/vnd.myscript.jiix']).words;
        populatePrompter(words);
        addBoldToModifiedWord(words);
      }
      this.previousLabelExport = JSON.parse(exports['application/vnd.myscript.jiix']).label;
      this.copyElement.setAttribute('data-clipboard-text', JSON.parse(exports['application/vnd.myscript.jiix']).label);
    } else {
      this.smartGuideElement.classList.add('smartguide-out');
      this.smartGuideElement.classList.remove('smartguide-in');
    }
  }

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
    // this.callFadeOutObserver(5000);
  }
}
