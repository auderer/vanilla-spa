# vanilla-spa
A simple SPA implementation built in vanilla javascript.

### Installation
You can easily install VanillaSpa using [npm](https://www.npmjs.com/).
```
npm install vanilla-spa --save
```

### Dependencies
None! VanillaSpa is made entirely in vanilla ES6 javascript.

However, Since VanillaSpa uses AJAX to dynamically load views, you'll need to set up a local server.

The simplest way to do this is by globally installing [http-server](https://www.npmjs.com/package/http-server) using [npm](https://www.npmjs.com/).

Then, run `http-server` in your code directory and open your browser to `localhost:8080`
```
npm install -g http-server

cd /path/to/project/
http-server -o
```

### index.html
The index.html is like a "shell" for the routes to be injected into.

```html
<body>
  <!-- The main element that will receive the routed content -->
  <main></main>
  
  <!-- Load Vanilla Spa -->
  <script src="node_modules/vanilla-spa.js"></script>
  <!-- Load the router -->
  <script src="./router.js"></script>
</body>
```

### router.js
This is where your route configuration goes.

```javascript
const r = new Router(
  // first, pass in the route configuration
  {
    about: new Layout(new Page('menu.html'), new Page('about.html')),
    home: new Layout(new Page('menu.html'), new Page('home.html')),
    '#default': new Page('menu.html'),
  },
  // then, pass in the element to inject the route into
  document.querySelector('main')
);
```