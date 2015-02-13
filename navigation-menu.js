var H5P = H5P || {};

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
  function NavigationMenu(params, id) {
    this.$ = $(this);
    this.id = id;

    // Set default behavior.
    this.params = $.extend({}, {
    }, params);
  }

  /**
   * Attach function called by H5P framework to insert H5P content into page.
   *
   * @param {jQuery} $container The container which will be appended to.
   */
  NavigationMenu.prototype.attach = function ($container) {
    $('<div/>', {
      'class': 'h5p-navigation-menu'
    }).appendTo($container);
  };

  return NavigationMenu;

})(H5P.jQuery);