const btnEl = document.querySelector('.theme-btn');
btnEl.addEventListener('click', () => {
  const classes = document.body.classList;
  classes.toggle('dark');
  classes.toggle('light');
});
