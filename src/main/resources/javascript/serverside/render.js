window.myapp = window.myapp || {};
window.myapp.render = window.myapp.render || {};

// jackson ObjectMapper
window.myapp.render.ObjectMapper = window.myapp.render.ObjectMapper ||
                                   new Packages.com.fasterxml.jackson.databind.ObjectMapper();

window.myapp.render.compiledTemplateCaches = {};

function render(template, model, url) {

  // 初期データをセット
  var store = window.myapp.createStore(window.myapp.todoApp);
  store.dispatch(window.myapp.addTodo(model.initialData));
  window.myapp.store = store;

  var jsonObject = convertToJsObject(model);
  var compiledTemplate;
  if (jsonObject.templateCache === false || window.myapp.render.compiledTemplateCaches[url] === undefined) {
    compiledTemplate = ejs.compile(template);
    window.myapp.render.compiledTemplateCaches[url] = compiledTemplate;
  } else {
    compiledTemplate = window.myapp.render.compiledTemplateCaches[url];
  }

  return compiledTemplate(jsonObject);
}

function convertToJsObject(model) {
  // // Javaのオブジェクトを一旦json文字列に変換
  var jsonString = window.myapp.render.ObjectMapper.writeValueAsString(model);

  // json文字列をJavaScriptのオブジェクトに変換
  return JSON.parse(jsonString);
}
