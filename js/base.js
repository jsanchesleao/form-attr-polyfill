(function() {

  var ATTRIBUTE = 'poly-form';

  function getAllElements() {
    return document.querySelectorAll('['+ATTRIBUTE+']');
  }

  function doOnAllElements(f) {
    var elements = getAllElements();
    for (var i = 0; i < elements.length; i++) {
      f(elements[i], i);
    }
  }

  function getFormFromElement(element) {
    return document.getElementById(element.getAttribute(ATTRIBUTE));
  }

  var polyfills = {
    button: buttonPolyfill,
    input: inputPolyfill,
    select: inputPolyfill
  }

  function getPolyfill(_tagName) {
    var tagName = _tagName.toString().toLowerCase();
    if (polyfills[tagName]) {
      return polyfills[tagName];
    }
    else {
      console.warn('Cannot find polyfill for form attribute on tag [' + tagName +']');
    }
  }

  function buttonPolyfill(element) {
    var form = getFormFromElement(element);
    element.onclick = function() {
      form.submit();
    };
  }

  function inputPolyfill(element) {
    var form = getFormFromElement(element);
    var clone = document.createElement('input');
    clone.name = element.name;
    clone.value = element.value;
    clone.style.display = 'none';
    form.appendChild(clone);

    element.onchange = function() {
      clone.value = element.value;
    };
  }

  doOnAllElements(function(element) {
    getPolyfill(element.tagName)(element)
  });

}())