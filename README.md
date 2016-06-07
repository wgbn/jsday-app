# JSDay App

O **JSDay App** é um aplicativo feito em Ionic, pela comunidade JavaSctipt, para ser usado durante os eventos JSDay pelo Brasil.

No aplicativo, o usuário pode consultar a grade de palestras, fazer anotações, avaliar a palestra e fazer comentários.

[![Demonstração JSDay App](http://img.youtube.com/vi/obO6FVFFSL0/0.jpg)](https://www.youtube.com/watch?v=obO6FVFFSL0)

## Tecnologias Utilizadas

- [Ionic](http://ionicframework.com "Ionic") / [AngularJS](https://angularjs.org "AngularJS") / [Cordova](https://cordova.apache.org "Cordova") (como combo de desenvolvimento base)
- [Firebase](http://firebase.com "Firebase") (como banco de dados backend unificado)
- [Lovefield](https://google.github.io/lovefield "Lovefield") (como banco local para as anotações)

## Como Editar

Você pode fazer um fork deste repositório ou clona-lo diretamente para sua máquina de trabalho:

```
$ git clone https://github.com/wgbn/jsday-app.git
```

E então você deve entrar na pasta do app e instalar as dependências:

```
$ cd jsday-app
$ npm install -g ionic cordova gulp
$ npm install
$ bower install
$ ionic state restore
```

Para testar o app no browser:

```
$ ionic serve
```

Para editar os arquivos, você deve ativar a task padrão do **gulp** pois os arquivos estão separados e para testar é preciso cancatena-los e minifica-los.
Antes de começar a editar, rode:

```
$ gulp
```

E está tudo pronto!