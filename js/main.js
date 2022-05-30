(function (w, d) {
  function addItem(wrapper, index) {
    var content = d.createDocumentFragment();
    var html = d.getElementById('itemStep').innerHTML;
    var itemTemplate = Handlebars.compile(html);

    var text = itemTemplate({ index: index });
    var div = d.createElement('div');
    div.id = 'item' + index;
    div.innerHTML = text;
    content.appendChild(div);
    wrapper.appendChild(content);
  }

  function list() {
    var items = [];
    var countItems = wrapper.childElementCount;
    for (var i = 0; i < countItems; i++) {
      var index = i + 1;
      var itemData = {};
      itemData.title = d.getElementById('title-' + index).value;
      itemData.description = d.getElementById('description-' + index).value;
      itemData.image = d.getElementById('image-' + index).value;
      itemData.image2x = d.getElementById('image2x-' + index).value;
      itemData.orden = index;
      itemData.total = countItems;
      itemData.active = index === 1 ? true : false;

      items.push(itemData);
    }
    return items;
  }

  function generateTemplate(items, index) {
    var html = d.getElementById('template-' + index).innerHTML;
    var template = Handlebars.compile(html);
    return template({ items: items });
  }

  function encodeHTML(str) {
    const code = {
      ' ': '&nbsp;',
      '¢': '&cent;',
      '£': '&pound;',
      '¥': '&yen;',
      '€': '&euro;',
      '©': '&copy;',
      '®': '&reg;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '&': '&amp;',
      "'": '&apos;',
    };
    return str.replace(/[\u00A0-\u9999<>\&''""]/gm, (i) => code[i]);
  }

  const btn = d.getElementById('add');
  const btnGenerate = d.getElementById('generate');
  const wrapperRenderHTML = d.getElementById('wrapperRenderHTML');
  const selectTemplate = d.getElementById('selectTemplate');
  const imgTemplate = d.getElementById('imgTemplate');
  const renderHTML = d.getElementById('renderHTML');

  btn.addEventListener('click', function () {
    const wrapper = d.getElementById('wrapper');
    const index = wrapper.childElementCount + 1;
    addItem(wrapper, index);
    if (index === 2) {
      btnGenerate.disabled = false;
      wrapperRenderHTML.style.display = 'block';
    }
  });

  selectTemplate.addEventListener('change', function () {
    let item = this.value;
    imgTemplate.src = 'images/image-' + item + '.png';
  });

  btnGenerate.addEventListener('click', function () {
    var selectTemplate = d.getElementById('selectTemplate').value;
    var items = list();

    var result = generateTemplate(items, selectTemplate);

    var NEW_LINE_EXP = /\n(?!$)/g;
    var lineNumbersWrapper;

    Prism.hooks.add('after-tokenize', function (env) {
      var match = env.code.match(NEW_LINE_EXP);
      var linesNum = match ? match.length + 1 : 1;
      var lines = new Array(linesNum + 1).join('<span></span>');

      lineNumbersWrapper = `<span aria-hidden="true" class="line-numbers-rows">${lines}</span>`;
    });

    const formated = Prism.highlight(result.trim(), Prism.languages.html, 'html');
    const html = formated + lineNumbersWrapper;
    renderHTML.innerHTML = html;
  });

  d.addEventListener('DOMContentLoaded', function () {});
})(window, document);
