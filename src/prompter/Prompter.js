import { prompterLogger as logger } from '../configuration/LoggerConfig';


export default class Prompter {

  constructor(editor) {
    this.editor = editor;
    this.wordToChange = '';
    this.candidate = '';
    this.lastWord = '';

    this.prompterElement = document.createElement('div');
    // bdi used to get punctuation to the right using direction:rtl
    this.textElement = document.createElement('div');
    this.textElement.id = 'prompter-text';
    this.prompterElement.id = 'prompter';
    this.prompterElement.classList.add('prompter');
    this.prompterElement.setAttribute('touch-action', 'none');
    this.prompterElement.appendChild(this.textElement);

    this.ellipsisElement = document.createElement('div');
    this.ellipsisElement.id = 'ellipsis';
    this.ellipsisElement.setAttribute('touch-action', 'none');
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

  populatePrompter(exports) {
    if (exports) {
      this.insertPrompter(exports);
      const exportsJiix = JSON.parse(exports['application/vnd.myscript.jiix']);
      const words = exportsJiix.words;

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

      if (exportsJiix['bounding-box']) {
        const mm = 3.779528;
        const top = exportsJiix['bounding-box'].y < 15 ? (exportsJiix['bounding-box'].y * mm) + 2 : (exportsJiix['bounding-box'].y * mm) - 12;
        const left = (exportsJiix['bounding-box'].x * mm) + this.prompterElement.offsetWidth;
        this.insertEllipsis(left, top);
      }
      this.hideCandidates();
      this.hideOptions();
    } else {
      this.clearPrompter();
    }
  }

  insertPrompter(exports) {
    const exportsJiix = JSON.parse(exports['application/vnd.myscript.jiix']);
    if (this.prompterElement && exportsJiix.words.length === 0) {
      this.clearPrompter();
    } else if (exportsJiix['bounding-box']) {
      this.prompterElement.style.display = 'initial';
      this.ellipsisElement.style.display = 'initial';
      const mm = 3.779528;
      let top = 0;
      // Ensure that the prompter is not placed over the nav bar when text is converted
      // 15 is approximately the y bounding box of converted text
      top = exportsJiix['bounding-box'].y < 15 ? (exportsJiix['bounding-box'].y * mm) + 2 : (exportsJiix['bounding-box'].y * mm) - 12;
      const left = exportsJiix['bounding-box'].x * mm;

      this.prompterElement.style.top = `${top}px`;
      this.prompterElement.style.left = `${left}px`;

      // Assign a max width to the prompter based on the editor width, the left position and a small margin for the ellipsis (48px)
      const maxWidth = document.querySelector('#editor').clientWidth - left - 48;
      this.prompterElement.style.maxWidth = `${maxWidth}px`;

      if (!document.querySelector('#prompter')) {
        const parent = this.editor.domElement.parentNode;
        parent.insertBefore(this.prompterElement, this.editor.domElement);
      }
    }
  }

  clearPrompter() {
    this.prompterElement.style.display = 'none';
    this.ellipsisElement.style.display = 'none';
  }

  insertEllipsis(left, top) {
    this.ellipsisElement.style.top = `${top}px`;
    this.ellipsisElement.style.left = `${left}px`;

    if (!document.querySelector('#ellipsis')) {
      const parent = this.editor.domElement.parentNode;
      parent.insertBefore(this.ellipsisElement, this.editor.domElement);
    }
  }
}
