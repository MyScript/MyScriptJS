import Clipboard from 'clipboard';
import { prompterLogger as logger } from '../configuration/LoggerConfig';

export default class Prompter {

  constructor(editor) {
    this.editor = editor;
    this.wordToChange = '';
    this.candidate = '';
    this.lastWord = '';

    this.addHtml();
    this.addListeners();
    const clipboard = new Clipboard('#copy');
  }

  addHtml() {
    this.prompterElement = document.createElement('div');
    this.prompterElement.id = 'prompter';
    this.prompterElement.classList.add('withfadeout');

    // text is in textElement to get the overflow working
    this.textElement = document.createElement('div');
    this.textElement.id = 'prompter-text';
    this.textContainer = document.createElement('div');
    this.textContainer.id = 'prompter-text-container';
    this.textContainer.classList.add('prompter-text-container');
    this.textContainer.appendChild(this.textElement);

    this.ellipsisElement = document.createElement('div');
    this.ellipsisElement.id = 'ellipsis';
    this.ellipsisElement.innerHTML = '...';

    this.paragraphElement = document.createElement('div');
    this.paragraphElement.id = 'paragraph-icon';
    this.paragraphElement.classList.add('paragraph-icon');
    this.paragraphElement.innerHTML = '&#182;';

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
    this.prompterElement.addEventListener('pointerdown', (evt) => {
      logger.debug('pointer down on prompterElement');
      logger.debug(evt);
      this.pointerX = evt.x;
      this.pointerY = evt.y;
    });
    this.prompterElement.addEventListener('pointerup', (evt) => {
      logger.debug('pointer up on prompterElement');
      logger.debug(this.pointerX);
      logger.debug(this.pointerY);
      if (evt.x === this.pointerX && evt.y === this.pointerY) {
        logger.debug('click');
      } else {
        logger.debug('not clicked');
      }
    });
  }

  showOptions(evt) {
    if (this.candidatesElement.style.display !== 'none') {
      this.candidatesElement.style.display = 'none';
    }
    if (this.optionsElement.style.display !== 'none') {
      this.optionsElement.style.display = 'none';
    } else {
      this.optionsElement.style.display = 'grid';

      const top = evt.target.getBoundingClientRect().top + 47;
      const left = evt.target.getBoundingClientRect().left - 30;
      this.optionsElement.style.top = `${top}px`;
      this.optionsElement.style.left = `${left}px`;

      this.optionsElement.appendChild(this.convertElement);
      this.optionsElement.appendChild(this.copyElement);
      this.optionsElement.appendChild(this.deleteElement);

      const parent = evt.target.parentNode;
      parent.insertBefore(this.optionsElement, evt.target);
    }
  }

  showCandidates(evt) {
    if (this.optionsElement.style.display !== 'none') {
      this.optionsElement.style.display = 'none';
    } else if (evt.target.id !== 'prompter-text') {
      const id = evt.target.id;
      const words = JSON.parse(this.editor.exports['application/vnd.myscript.jiix']).words;
      this.wordToChange = words[id];
      this.wordToChange.id = id;
      this.candidatesElement.innerHTML = '';
      if (this.wordToChange && this.wordToChange.candidates) {
        this.candidatesElement.style.display = 'block';
        this.wordToChange.candidates.forEach((word, index) => {
          if (this.wordToChange.label === word) {
            this.candidatesElement.innerHTML += `<span id=${index}><b>${word}</b> &#10004;</span><br>`;
          } else {
            this.candidatesElement.innerHTML += `<span id=${index}>${word}</span><br>`;
          }
        });
        // get the parent parent of word to insert just before prompter
        // 32 to get the boundary of prompter element
        const top = evt.target.getBoundingClientRect().top + 32;
        this.candidatesElement.style.top = `${top}px`;
        this.candidatesElement.style.left = `${evt.target.getBoundingClientRect().left}px`;

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
    }
    this.hideCandidates();
  }

  hideCandidates() {
    this.candidatesElement.style.display = 'none';
  }

  hideOptions() {
    this.optionsElement.style.display = 'none';
  }

  launchPrompter(exports) {
    if (!document.querySelector('#prompter')) {
      this.insertPrompter();
    }

    // FIXME Check if we can find a way to not repopulate the prompter every time even if we now use Document fragment
    const populatePrompter = (words) => {
      this.textElement.innerHTML = '';
      // We use a DocumentFragment to reflow the DOM only one time as it is not part of the DOM
      const myFragment = document.createDocumentFragment();
      words.forEach((word, index) => {
        if (word.label === ' ') {
          const span = document.createElement('span');
          span.id = index;
          span.innerHTML = '&nbsp;';
          myFragment.appendChild(span);
        } else {
          const span = document.createElement('span');
          span.id = index;
          span.textContent = word.label;
          myFragment.appendChild(span);
          if (index === words.length - 1) {
            this.textElement.appendChild(myFragment);
            if (this.lastWord === '') {
              this.lastWord = word;
            }
            // This is used to scroll to last word if last word is modified
            if (JSON.stringify(this.lastWord) !== JSON.stringify(word)) {
              document.getElementById(index).scrollIntoView({ behavior: 'smooth' });
              this.lastWord = word;
            }
          }
        }
      });
    };

    if (exports && JSON.parse(exports['application/vnd.myscript.jiix']).words.length > 0) {
      this.displayPrompter('initial');
      this.hideCandidates();
      this.hideOptions();
      const words = JSON.parse(exports['application/vnd.myscript.jiix']).words;
      logger.debug(words);
      populatePrompter(words);
      this.copyElement.setAttribute('data-clipboard-text', JSON.parse(exports['application/vnd.myscript.jiix']).label);
    } else {
      this.displayPrompter('none');
    }
  }

  insertPrompter() {
    const insertPrompterElement = (left, top) => {
      this.prompterElement.style.top = `${top}px`;
      this.prompterElement.style.left = `${left}px`;

      const parent = this.editor.domElement.parentNode;
      parent.insertBefore(this.prompterElement, this.editor.domElement);
    };

    const insertParagraph = (left, top) => {
      this.paragraphElement.style.top = `${top}px`;
      this.paragraphElement.style.left = `${left}px`;

      this.prompterElement.appendChild(this.paragraphElement);
    };
    const insertTextContainer = (left, top) => {
      this.textContainer.style.top = `${top}px`;
      this.textContainer.style.left = `${left}px`;

      // Assign a max width to the prompter based on the editor width, the left position and a small margin for the ellipsis (48px)
      const maxWidth = document.querySelector('#editor').clientWidth - left - 48;
      this.textContainer.style.width = `${maxWidth}px`;
      this.textContainer.style.maxWidth = `${maxWidth}px`;

      this.prompterElement.appendChild(this.textContainer);
    };
    const insertEllipsis = (left, top) => {
      this.ellipsisElement.style.top = `${top}px`;
      this.ellipsisElement.style.left = `${left}px`;

      this.prompterElement.appendChild(this.ellipsisElement);
    };


    // FIXME Use value from contentChanged when available
    const top = 77;
    let left = 40;

    insertPrompterElement(left, top);
    insertParagraph(left, top);

    left += this.paragraphElement.offsetWidth;
    insertTextContainer(left, top);

    left += this.textContainer.offsetWidth;
    insertEllipsis(left, top);

    // 48px as set in css
    this.prompterElement.style.height = '48px';
    this.prompterElement.style.width = `${this.paragraphElement.offsetWidth + this.textContainer.offsetWidth + this.ellipsisElement.offsetWidth}px`;
  }

  displayPrompter(display) {
    this.prompterElement.style.display = display;
  }
}
