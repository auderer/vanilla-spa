/**
 * Namespace for VanillaSpa
 */
const VS = {
  version: '1.0.1'
};

(function() {

  /**
   * Gets a file at the given url and returns a Promise
   * @param {*string} url The URL of the file to get.
   * @returns Promise containing the file data
   */
  VS.get = function get(url) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  }

  /**
   * A Layout contains multiple pages.
   */
  VS.Layout = class Layout {
    constructor(...pages) {
      this.pages = pages;
    }

    load() {
      return Promise.all(this.pages.map(page => page.load()));
    }

    show(el) {
      for (let page of this.pages) {
        const div = document.createElement('div');
        page.show(div);
        el.appendChild(div);
      }
    }
  }

  /**
   * A Page displays content from an HTML template.
   */
  VS.Page = class Page {
    constructor(url) {
      this.url = 'views/' + url;
    }

    load() {
      return VS.get(this.url).then(res => this.html = res);
    }  

    show(el) {
      el.innerHTML = this.html;
    }
  }

  /**
   * The Router dynamically switches out pages and layouts.
   */
  VS.Router = class Router {
    constructor(routes, el) {
      this.routes = routes;
      this.el = el;
      window.onhashchange = this.hashChanged.bind(this);
      this.hashChanged();
    }

    async hashChanged(ev) {
      if (window.location.hash.length > 0) {
        const pageName = window.location.hash.substr(1);
        this.show(pageName);
      } else if (this.routes['#default']) {
        this.show('#default');
      }
    }

    async show(pageName) {
      const page = this.routes[pageName];
      await page.load();
      this.el.innerHTML = '';
      page.show(this.el);
    }
  }

})();
