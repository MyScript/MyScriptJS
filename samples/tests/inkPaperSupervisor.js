let inkPaperSupervisor = document.querySelector('#inkPaperSupervisor');
if(!inkPaperSupervisor){
  const input = document.createElement('input');
  input.type = 'hidden';
  input.id = 'inkPaperSupervisor';
  document.querySelector('body').appendChild(input);
  inkPaperSupervisor = document.querySelector('#inkPaperSupervisor');
}

document.querySelector('#inkPaper').addEventListener('change', (evt) => {
  inkPaperSupervisor.lastevent = evt;
  inkPaperSupervisor.lastresult = evt.detail.rawResult.result.results;
  inkPaperSupervisor.nbstrokes = evt.detail.pendingStrokes.length;

})