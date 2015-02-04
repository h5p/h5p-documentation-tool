var H5P = H5P || {};

/**
 * Documentation tool module
 * @external {jQuery} $ H5P.jQuery
 */
H5P.DocumentationTool = (function ($) {
  // CSS Classes:
  var MAIN_CONTAINER = 'h5p-documentation-tool';

  /**
   * Initialize module.
   * @param {Object} params Behavior settings
   * @param {Number} id Content identification
   * @returns {Object} DocumentationTool DocumentationTool instance
   */
  function DocumentationTool(params, id) {
    this.$ = $(this);
    this.id = id;

    // Set default behavior.
    this.params = $.extend({}, {
      taskDescription: 'Documentation Tool',
      pagesList: []
    }, params);
  }

  /**
   * Attach function called by H5P framework to insert H5P content into page.
   *
   * @param {jQuery} $container The container which will be appended to.
   */
  DocumentationTool.prototype.attach = function ($container) {
    var self = this;
    var pageInstances = [];
    var goalsList = [];

    this.$inner = $container.addClass(MAIN_CONTAINER);

    this.params.pagesList.forEach(function (page) {
      var $pageContainer = $('<div>', {
      }).appendTo(self.$inner);

      var pageInstance = H5P.newRunnable(page, self.id);
      pageInstance.attach($pageContainer);
      pageInstances.push(pageInstance);
    });

    $('<button>', {
      'text': 'Page changer'
    }).click(function () {
      var assessmentGoals = self.getGoalAssessments(pageInstances);
      var newGoals = self.getGoals(pageInstances);
      assessmentGoals.forEach(function (assessmentPage) {
        newGoals = self.mergeGoals(newGoals, assessmentPage);
      });
      self.insertGoals(pageInstances, newGoals);
    }).appendTo(self.$inner);
  };

  /**
   * Merge assessment goals and newly created goals
   */
  DocumentationTool.prototype.mergeGoals = function (newGoals, assessmentGoals) {
    // Not an assessment page
    if (!assessmentGoals.length) {
      return newGoals;
    }
    newGoals.forEach(function (goalPage, pageIndex) {
      goalPage.forEach(function (goalInstance, instanceIndex) {
        var result = $.grep(assessmentGoals[pageIndex], function (assessmentInstance) {
          return assessmentInstance.goalId() === goalInstance.goalId();
        });
        if (result.length) {
          goalInstance.goalAnswer(result[0].goalAnswer());
        }
      });
    });
    return newGoals;
  };

  DocumentationTool.prototype.getGoalAssessments = function (pageInstances) {
    var goals = [];
    pageInstances.forEach(function (page) {
      var targetGoals = [];
      if (page instanceof H5P.GoalsAssessmentPage) {
        targetGoals = page.getAssessedGoals();
      }
      goals.push(targetGoals);
    });
    return goals;
  };

  /**
   * Gets goals from all goal pages and returns updated goals list.
   *
   * @param {Array} pageInstances Array containing all pages.
   *
   * @returns {Array} goals
   */
  DocumentationTool.prototype.getGoals = function (pageInstances) {
    var goals = [];
    pageInstances.forEach(function (page) {
      var targetGoals = [];
      if (page instanceof H5P.GoalsPage) {
        targetGoals = page.getGoals();
      }
      goals.push(targetGoals);
    });
    return goals;
  };

  /**
   * Insert goals to all goal assessment pages.
   *
   * @param {Array} goals Array of goals.
   */
  DocumentationTool.prototype.insertGoals = function (pageInstances, goals) {
    pageInstances.forEach(function (page) {
      if (page instanceof H5P.GoalsAssessmentPage) {
        page.updateAssessmentGoals(goals);
      }
    });
  };

  /**
   * Resize function for responsiveness.
   */
  DocumentationTool.prototype.resize = function () {
  };

  return DocumentationTool;
})(H5P.jQuery);