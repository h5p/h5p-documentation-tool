var H5P = H5P || {};
H5P.DocumentationTool = H5P.DocumentationTool || {};

/**
 * Naivgation Menu module
 * @external {jQuery} $ H5P.jQuery
 */
H5P.DocumentationTool.NavigationMenu = (function ($) {

  /**
   * Initialize module.
   * @param {Object} params Behavior settings
   * @param {Number} id Content identification
   * @returns {Object} NavigationMenu NavigationMenu instance
   */
  function NavigationMenu(docTool) {
    this.$ = $(this);
    this.docTool = docTool;
  }

  /**
   * Attach function called by H5P framework to insert H5P content into page.
   *
   * @param {jQuery} $container The container which will be appended to.
   */
  NavigationMenu.prototype.attach = function ($container) {
    var self = this;
    var $navigationMenu = $('<div/>', {
      'class': 'h5p-navigation-menu'
    }).prependTo($container);

    this.docTool.pageInstances.forEach(function (page, pageIndex) {
      var pageTitle = '';

      // Try to get page title
      try {
        pageTitle = page.getTitle();
      } catch (e) {
        throw new Error('Page does not have a getTitle() function - ' + e);
      }

      // Create page entry
      $('<div/>', {
        'class': 'h5p-navigation-menu-entry',
        'html': pageTitle,
        'role': 'button',
        'tabindex': '0'
      }).click(function () {
        self.docTool.movePage(pageIndex);
      }).keydown(function (e) {
        var keyPressed = e.which;
        // 32 - space
        if (keyPressed === 32) {
          $(this).click();
          e.preventDefault();
        }
        $(this).focus();
      }).appendTo($navigationMenu);
    });
  };

  return NavigationMenu;

}(H5P.jQuery));
