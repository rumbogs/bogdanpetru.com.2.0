import 'fontfaceobserver';

const fontASubset = new FontFaceObserver('LibreFranklinSubset');
const fontBSubset = new FontFaceObserver('LibreBaskervilleSubset');

Promise.all([fontASubset.load(), fontBSubset.load()]).then(() => {
  document.documentElement.className += ' fonts-stage-1';

  const fontA = new FontFaceObserver('LibreFranklin');
  const fontB = new FontFaceObserver('LibreBaskerville');

  Promise.all([fontA.load(), fontB.load()]).then(() => {
    document.documentElement.className += ' fonts-stage-2';
  });
});
