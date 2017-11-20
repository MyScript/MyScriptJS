import { prompterLogger as logger } from '../configuration/LoggerConfig';


export default class Prompter {

  constructor(editor) {
    this.editor = editor;
    this.wordToChange = '';
    this.candidate = '';

    this.prompterElement = document.createElement('div');
    // bdi used to get punctuation to the right using direction:rtl
    this.bdiElement = document.createElement('bdi');
    this.prompterElement.appendChild(this.bdiElement);
    this.prompterElement.id = 'prompter';
    this.prompterElement.classList.add('prompter');

    this.candidatesElement = document.createElement('div');
    this.candidatesElement.classList.add('candidates');

    this.addListeners();
  }

  addListeners() {
    // We use bdi element and not prompter to only get text
    this.bdiElement.addEventListener('click', this.showCandidates.bind(this), false);
    this.candidatesElement.addEventListener('click', this.clickCandidate.bind(this), false);
  }

  showCandidates(evt) {
    logger.debug('show candidates');
    logger.debug(evt);
    const id = evt.target.id;
    const words = JSON.parse(this.editor.exports['application/vnd.myscript.jiix']).words;
    this.wordToChange = words[id];
    this.candidatesElement.innerHTML = '';
    if (this.wordToChange && this.wordToChange.candidates) {
      this.candidatesElement.style.display = 'block';
      this.wordToChange.candidates.forEach((word, index) => {
        if (index === 0) {
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
      logger.debug(parent);
      parent.insertBefore(this.candidatesElement, evt.target.parentNode.parentNode);
    }
  }

  clickCandidate(evt) {
    logger.debug('click candidate');
    if (evt.target.id !== '0') {
      this.candidate = evt.target.innerText;
      logger.debug(this.wordToChange);
      logger.debug(this.candidate);
    }
    // Import Jiix
    this.hideCandidates();
  }

  hideCandidates() {
    logger.debug('hide candidate');
    this.candidatesElement.style.display = 'none';
  }

  populatePrompter(exports) {
    this.insertPrompter(exports);
    const exportsJiix = JSON.parse(exports['application/vnd.myscript.jiix']);
    logger.debug(exportsJiix);
    const words = exportsJiix.words;
    this.bdiElement.innerHTML = '<span class="paragraph-icon">&#182;</span>';

    words.forEach((word, index) => {
      if (word.label === ' ') {
        this.bdiElement.innerHTML += `<span id=${index}>&nbsp;</span>`;
      } else {
        this.bdiElement.innerHTML += `<span id=${index}>${word.label}</span>`;
      }
    });
  }

  insertPrompter(exports) {
    const exportsJiix = JSON.parse(exports['application/vnd.myscript.jiix']);
    const prompterElement = document.querySelector('#prompter');

    if (prompterElement && exportsJiix.words.length === 0) {
      prompterElement.parentNode.removeChild(prompterElement);
    } else if (exportsJiix['bounding-box']) {
      const mm = 3.779528;

      logger.debug(exportsJiix['bounding-box']);

      const top = exportsJiix['bounding-box'].y * mm;
      const left = exportsJiix['bounding-box'].x * mm;

      this.prompterElement.style.top = `${top}px`;
      this.prompterElement.style.left = `${left}px`;

      if (!document.querySelector('#prompter')) {
        const parent = this.editor.domElement.parentNode;
        parent.insertBefore(this.prompterElement, this.editor.domElement);
      }
    }
  }
}
