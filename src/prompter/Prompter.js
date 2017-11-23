import { prompterLogger as logger } from '../configuration/LoggerConfig';


export default class Prompter {

  constructor(editor) {
    this.editor = editor;
    this.wordToChange = '';
    this.candidate = '';
    this.lastWord = '';

    this.prompterElement = document.createElement('div');
    // text is not in prompterElement but in textElement to get the overflow working
    this.textElement = document.createElement('div');
    this.textElement.id = 'prompter-text';
    this.prompterElement.id = 'prompter';
    this.prompterElement.classList.add('prompter');
    // this.prompterElement.setAttribute('touch-action', 'none');
    this.prompterElement.appendChild(this.textElement);

    this.ellipsisElement = document.createElement('div');
    this.ellipsisElement.id = 'ellipsis';
    // this.ellipsisElement.setAttribute('touch-action', 'none');
    this.ellipsisElement.innerHTML = '...';

    this.candidatesElement = document.createElement('div');
    this.candidatesElement.classList.add('candidates');

    this.optionsElement = document.createElement('div');
    this.optionsElement.classList.add('options');

    this.convertElement = document.createElement('button');
    this.convertElement.classList.add('options-label-button');
    this.convertElement.id = 'convert';
    this.convertElement.innerHTML = 'Convert';

    this.addListeners();
  }

  addListeners() {
    // We use bdi element and not prompter to only get text
    this.textElement.addEventListener('click', this.showCandidates.bind(this), false);
    this.candidatesElement.addEventListener('click', this.clickCandidate.bind(this), false);
    this.ellipsisElement.addEventListener('click', this.showOptions.bind(this), false);
    this.convertElement.addEventListener('click', () => {
      this.editor.convert();
    }, false);
    /* this.ellipsisElement.addEventListener('pointermove', (e) => {
      logger.debug(e.pointerType + ' ' + e.type + ' on a ' + e.target.nodeName);
      if (this.activePointerId && this.activePointerId === e.pointerId) {
        e.stopPropagation();
        this.editor.pointerMove(extractPoint(e, this.editor.domElement, this.editor.configuration, 0, 0));
      }
    }, false);
    this.ellipsisElement.addEventListener('pointerdown', (e) => {
      this.activePointerId = e.pointerId;
      logger.debug(e.pointerType + ' ' + e.type + ' on a ' + e.target.nodeName);
      e.stopPropagation();
      this.editor.pointerDown(extractPoint(e, this.editor.domElement, this.editor.configuration, 0, 0), e.pointerType, e.pointerId);
    }, false); */
    const upEvents = ['pointerup', 'pointerout', 'pointerleave', 'pointercancel'];
    upEvents.forEach((event) => {
      this.ellipsisElement.addEventListener(event, (e) => {
        logger.debug(e.pointerType + ' ' + e.type + ' on ellipsis');
      }, false);
    });
  }

  showOptions(evt) {
    if (this.candidatesElement.style.display !== 'none') {
      this.candidatesElement.style.display = 'none';
    }
    if (this.optionsElement.style.display !== 'none') {
      this.optionsElement.style.display = 'none';
    } else {
      this.optionsElement.style.display = 'block';

      const top = evt.target.getBoundingClientRect().top + 47;
      const left = evt.target.getBoundingClientRect().left - 30;
      this.optionsElement.style.top = `${top}px`;
      this.optionsElement.style.left = `${left}px`;

      this.optionsElement.appendChild(this.convertElement);

      const parent = evt.target.parentNode;
      parent.insertBefore(this.optionsElement, evt.target);
    }
  }

  showCandidates(evt) {
    if (this.optionsElement.style.display !== 'none') {
      this.optionsElement.style.display = 'none';
    } else {
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

    const populatePrompter = (words) => {
      this.textElement.innerHTML = '<span class="paragraph-icon">&#182;</span>';
      words.forEach((word, index) => {
        if (word.label === ' ') {
          this.textElement.innerHTML += `<span id=${index}>&nbsp;</span>`;
        } else {
          this.textElement.innerHTML += `<span id=${index}>${word.label}</span>`;
          if (index === words.length - 1) {
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
      populatePrompter(words);
    } else {
      this.displayPrompter('none');
    }
  }

  insertPrompter() {
    const insertEllipsis = (left, top) => {
      this.ellipsisElement.style.top = `${top}px`;
      this.ellipsisElement.style.left = `${left}px`;

      if (!document.querySelector('#ellipsis')) {
        const parent = this.editor.domElement.parentNode;
        parent.insertBefore(this.ellipsisElement, this.editor.domElement);
      }
    };

    // FIXME Use value from contentChanged when available
    const top = 77;
    const left = 40;

    this.prompterElement.style.top = `${top}px`;
    this.prompterElement.style.left = `${left}px`;

    // Assign a max width to the prompter based on the editor width, the left position and a small margin for the ellipsis (48px)
    const maxWidth = document.querySelector('#editor').clientWidth - left - 64;
    this.prompterElement.style.width = `${maxWidth}px`;
    this.prompterElement.style.maxWidth = `${maxWidth}px`;

    const parent = this.editor.domElement.parentNode;
    parent.insertBefore(this.prompterElement, this.editor.domElement);

    const leftEllipsis = left + this.prompterElement.offsetWidth;

    insertEllipsis(leftEllipsis, top);
  }

  displayPrompter(display) {
    this.prompterElement.style.display = display;
    this.ellipsisElement.style.display = display;
  }
}
