'use strict';
angular.module('jsday')

    .factory('fireService',
        ['$firebaseArray', 'Utils',
            function ($firebaseArray, Utils) {
                var db = new Firebase("https://jsday-app.firebaseio.com"); //.orderByChild('event_start').startAt(new Date().getTime());
                var sync = $firebaseArray(db.child('palestras'));

                return {
                    getPalestras: function () {
                        return sync;
                    },
                    addPalestra: function (_palestra) {
                        sync.$add(_palestra);
                    },
                    updatePalestra: function (_palestra) {
                        _dia.agenda.push({
                            hora: Utils.parseStrToDate("20/06/2016 12:00"),
                            nome: "Almoço",
                            servico: true
                        });
                        sync.$save(_palestra);
                        //db.child('dias').child(_dia.$id).set(_dia);
                        //console.info(_dia.$id);
                    },
                    setTesteDia: function () {
                        var _dia = {
                            data: Utils.parseStrToDate("21/06/2016"),
                            local: "Feira de Santana",
                            agenda: [
                                {
                                    hora: Utils.parseStrToDate("20/06/2016 08:00"),
                                    nome: "Abertura/Credenciamento",
                                    servico: true
                                },
                                {
                                    hora: Utils.parseStrToDate("20/06/2016 08:30"),
                                    nome: "Desenvolvendo aplicações fantásticas com Ionic",
                                    descricao: "lorem ipsum amet",
                                    capa: "https://lh3.googleusercontent.com/proxy/W2oxBUZ_Hi0LD93YCAuqNprJeY1dhjkTQl_ku4X_A261eQiAMtLhEf6RMHR8V64Yy0yt6lC4PGCBUe3rmt70vrq7HPD-pJcxyOHBCLP-qYtvnU4=s426",
                                    slide: "http://endereco-do-slide",
                                    autor: {
                                        nome: "Walter Gandarella",
                                        email: "walter.wgbn@gmail.com",
                                        avatar: "http://www.avatarpro.biz/avatar?s=100",
                                        github: "http://github.com/wgbn",
                                        twitter: "https://twitter.com/jebinha",
                                        site: "http://wgbn.com.br",
                                        bio: "lorem ipsum amet"
                                    },
                                    avaliacao: [
                                        0
                                    ],
                                    comentarios: []
                                }
                            ]
                        };
                        this.addDia(_dia);
                    },
                    setTestePalestra: function () {
                        var _p = {
                            hora: Utils.parseStrToDate("20/06/2016 10:00", true),
                            nome: "Cofee Break",
                            servico: true
                        };
                        this.addPalestra(_p);

                        _p = {
                            hora: Utils.parseStrToDate("20/06/2016 10:30", true),
                            nome: "Joomla",
                            descricao: "lorem ipsum amet",
                            capa: "https://media.licdn.com/media/p/3/000/1b3/075/2b81fd9.png",
                            slide: "http://endereco-do-slide",
                            autor: {
                                nome: "Walter Gandarella",
                                email: "walter.wgbn@gmail.com",
                                avatar: "http://www.avatarpro.biz/avatar?s=100",
                                github: "http://github.com/wgbn",
                                twitter: "https://twitter.com/jebinha",
                                site: "http://wgbn.com.br",
                                bio: "lorem ipsum amet"
                            },
                            avaliacao: [
                                0
                            ],
                            comentarios: []
                        };
                        this.addPalestra(_p);
                    },
                };
            }
        ]
    )
;
