/** @namespace H5PUpgrades */
var H5PUpgrades = H5PUpgrades || {};

H5PUpgrades['H5P.DocumentationTool'] = (function ($) {
  return {
    1: {
      6: function (parameters, finished, extras) {
        // Copy title to new metadata structure if present
        var metadata = {
          title: parameters.taskDescription || ((extras && extras.metadata) ? extras.metadata.title : undefined)
        };
        extras.metadata = metadata;

        // Remove old parameter
        delete parameters.taskDescription;

        finished(null, parameters, extras);
      }
    }
  };
})(H5P.jQuery);
