(function ($) {

    $.fn.selectWord = function (option) {
        var x = 0, y = 0;
        var hasBind = false;
        var timeout = 1000 / 60;

        var moduleUrl = 'http://tbfe.baidu.com:8081/s?wd=';
        var tbCodeUrl = 'http://tbfe.baidu.com:8081/searchCode?wd=';

        var tipSelector = '#selectsearch-icon';

        var tipTpl = '<a id="selectsearch-icon" href="#" target="_blank" style=" cursor: pointer;position: absolute; z-index: 10000;margin-top: 10px;margin-left: 5px;">' +
            '<img src="http://img.baidu.com/img/iknow/qb/select-search.png" alt="搜索代码" style="width: 65px; height: 31px; border: 0;">' +
            '<span id="selectsearch-icon-text"></span></a>';
        var $tip;

        var settings = $.extend({
            searchUrl: moduleUrl
        }, option);


        function select() {
            var wrap = this;
            $(wrap).mouseup(function (e) {
                x = e.clientX;
                y = e.clientY;
                var tid = e.target.id;
                //延时使程序等待页面选区变化的系统响应
                setTimeout(function () {
                    var isStandard = !!window.getSelection;
                    var selection = isStandard ? window.getSelection() : document.selection.createRange();
                    var text = (isStandard ? selection + "" : selection.text).replace(/\n+/g, "|");
                    var textLen = text.length;

                    if (textLen < 2 || textLen > 200 || tid == "selectsearch-icon") {
                        return hideIcon();
                    }
                    showIcon(text, isStandard);
                    selection = null;
                }, timeout);

            });
        }

        function showIcon(text, isStandard) {
            $tip = $(tipSelector);
            if ($tip.length === 0) {
                $('body').append($(tipTpl));
                $tip = $(tipSelector);
            }

            if (isStandard) {
                var top = document.body.scrollTop + y;
                var left = document.body.scrollLeft + x;
                $tip.css({ top: top + 'px', left: left + 'px' });
                $tip.show();
            }

            handleIcon(text);
        }

        function handleIcon(text) {
            if (!text) {
                return;
            }
            var url = settings.searchUrl + text;

            if (!hasBind) {
                hasBind = true;
                $(tipSelector).click(function () {
                    hideIcon();
                    window.open(url);
                });
            }
        }

        function hideIcon() {
            $(tipSelector).hide();
        }

        select(option);
    }
 
    
})(jQuery);