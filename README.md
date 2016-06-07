# JSDay App

O **JSDay App** é um aplicativo feito em Ionic, pela comunidade JavaSctipt, para ser usado durante os eventos JSDay pelo Brasil.

No aplicativo, o usuário pode consultar a grade de palestras, fazer anotações, avaliar a palestra e fazer comentários.

[ Vídeo de demonstração ]

[![Demonstração JSDay App](http://img.youtube.com/vi/obO6FVFFSL0/0.jpg)](https://www.youtube.com/watch?v=obO6FVFFSL0)

## Tecnologias Utilizadas

- [Ionic](http://ionicframework.com "Ionic") / [AngularJS](https://angularjs.org "AngularJS") / [Cordova](https://cordova.apache.org "Cordova") (como combo de desenvolvimento base)
- [Firebase](http://firebase.com "Firebase") (como banco de dados backend unificado)
- [Lovefield](https://google.github.io/lovefield "Lovefield") (como banco local para as anotações)

## Funcionalidades

A **tela inicial** exibe a lista cronologica das palestras do JSDay

A tela de **detalhes de palestra** possui três abas.

- **Palestra** com os detalhes sobre a palestra e a biografia do palestrante. Aqui estão os links de contato com o palestrante e um link para o slide da palestra (este só estará disponível, automaticamente, após o início da palestra).
- **Notas** onde o usuário pode fazer pequenas anotações no decorrer da palestra.
- **Comentários** onde será possível deixar sua opinião sobre a palestra e sobre o palestrante (só é possível postar um comentário após o início da palestra).

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

## Como trocar a base Firebase por outra conta Firebase (a sua)

Acesse [https://console.firebase.google.com](https://console.firebase.google.com "Firebase Console") e crie uma conta usando sua conta do Google.

Crie um projeto dentro do console clicando no botão **CRIAR NOVO PROJETO**

Assim que seu projeto estiver criado, clique no link **Adicionar o Firebase ao seu app da Web** na tela que aparece.

Um popup irá mostrar o trecho de código que voce deve substituir no arquivo `firebaseService.js`:

```javascript
var config = {
    apiKey: "sua-chave-da-api",
    authDomain: "seu-projeto.firebaseapp.com",
    databaseURL: "https://seu-projeto.firebaseio.com",
    storageBucket: "seu-projeto.appspot.com",
  };
```

E está tudo pronto!