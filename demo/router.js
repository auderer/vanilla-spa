const r = new VS.Router(
  // first, pass in the route configuration
  {
    about: new VS.Layout(new VS.Page('menu.html'), new VS.Page('about.html')),
    home: new VS.Layout(new VS.Page('menu.html'), new VS.Page('home.html')),
    '#default': new VS.Page('menu.html'),
  },
  // then, pass in the element to inject the route into
  document.querySelector('main')
);