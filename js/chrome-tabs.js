(function() {
  var $, chromeTabs, defaultNewTabData, tabTemplate;

  $ = jQuery;

  if (document.body.style['-webkit-mask-repeat'] !== void 0) {
    $('html').addClass('cssmasks');
  } else {
    $('html').addClass('no-cssmasks');
  }

  tabTemplate = '<div class="chrome-tab">\n'+
    '<div class="chrome-tab-title"></div>\n'+ 
    '<div class="chrome-tab-curves">\n'+
        '<div class="chrome-tab-curves-left-shadow"></div>\n'+
        '<div class="chrome-tab-curves-left-highlight"></div>\n'+
        '<div class="chrome-tab-curves-left"></div>\n'+
        '<div class="chrome-tab-curves-right-shadow"></div>\n'+
        '<div class="chrome-tab-curves-right-highlight"></div>\n'+
        '<div class="chrome-tab-curves-right"></div>\n'+
    '</div>\n'+
'</div>';

  defaultNewTabData = {
    title: 'New Tab',
    data: {}
  };

  chromeTabs = {
    init: function(options) {
      var render;
      $.extend(options.$shell.data(), options);
      options.$shell.find('.chrome-tab').each(function() {
        return $(this).data().tabData = {
          data: {}
        };
      });
      render = function() {
        return chromeTabs.render(options.$shell);
      };
      $(window).resize(render);
      return render();
    },
    render: function($shell) {
      chromeTabs.fixTabSizes($shell);
      chromeTabs.fixZIndexes($shell);
      chromeTabs.setupEvents($shell);
      return $shell.trigger('chromeTabRender');
    },
    fixTabSizes: function($shell) {
      var $tabs, margin, width;
      $tabs = $shell.find('.chrome-tab');
      margin = (parseInt($tabs.first().css('marginLeft'), 10) + parseInt($tabs.first().css('marginRight'), 10)) || 0;
      width = $shell.width() - 300;
      width = (width / $tabs.length) - margin;
      width = Math.max($shell.data().minWidth, Math.min($shell.data().maxWidth, width));
      $tabs.css({
        width: width
      });
    },
    fixZIndexes: function($shell) {
      var $tabs;
      $tabs = $shell.find('.chrome-tab');
      return $tabs.each(function(i) {
        var $tab, zIndex;
        $tab = $(this);
        zIndex = $tabs.length - i;
        if ($tab.hasClass('chrome-tab-current')) {
          zIndex = $tabs.length + 40;
        }
        $tab.css({
          zIndex: zIndex
        });
        return $tab.data({
          zIndex: zIndex
        });
      });
    },
    setupEvents: function($shell) {
      return $shell.find('.chrome-tab').each(function() {
        var $tab;
        $tab = $(this);
        $tab.unbind('click').click(function() {
          return chromeTabs.setCurrentTab($shell, $tab);
        });
      });
    },
    addNewTab: function($shell, newTabData) {
      var $newTab, tabData;
      $newTab = $(tabTemplate);
      $shell.find('.chrome-tabs').append($newTab);
      tabData = $.extend(true, {}, defaultNewTabData, newTabData);
      chromeTabs.updateTab($shell, $newTab, tabData);
      return chromeTabs.render($shell);
    },
    setCurrentTab: function($shell, $tab) {
      $shell.find('.chrome-tab-current').removeClass('chrome-tab-current');
      $tab.addClass('chrome-tab-current');
      return chromeTabs.render($shell);
    },
    updateTab: function($shell, $tab, tabData) {
      $tab.find('.chrome-tab-title').html(tabData.title);
      return $tab.data().tabData = tabData;
    }
  };

  window.chromeTabs = chromeTabs;

}).call(this);