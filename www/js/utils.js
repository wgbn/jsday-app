angular.module('jsday')
    .factory('Utils', [
            function () {
                return {
                    parseStrToDate: function (_date, _time) {
                        _time = _time || false;
                        var _date = _date.split(' ');
                        var result = new Date(
                            _date[0].split('/')[2],
                            parseInt(_date[0].split('/')[1]) - 1,
                            _date[0].split('/')[0],
                            _time ? _date[1].split(':')[0] : 0,
                            _time ? _date[1].split(':')[1] : 0,
                            0,
                            0
                        );
                        return result.getTime();
                    },
                    parseDateToStr: function(_date, _time){
                        _time = _time || false;
                        var result = new Date(_date);
                        return (result.getDate() < 10 ? "0"+result.getDate() : result.getDate())
                            +"/"
                            +(result.getMonth()+1 < 10 ? "0"+(result.getMonth()+1) : result.getMonth()+1)
                            +"/"+result.getFullYear().toString()
                            +(_time ? " "+result.getHours().toString()
                            +":"
                            +result.getMinutes().toString() : "");
                    },
                    parseShortDateToStr: function(_date){
                        var result = new Date(_date);
                        return (result.getDate() < 10 ? "0"+result.getDate() : result.getDate())
                            +"/"
                            +(result.getMonth()+1 < 10 ? "0"+(result.getMonth()+1) : result.getMonth()+1);
                    },
                };
            }
        ]
    )
;
