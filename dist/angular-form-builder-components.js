(function() {
  angular.module('builder.components', ['builder', 'validator.rules']);

  angular.module('builder.components').directive("pfMaxlength", function() {
    return {
      require: "ngModel",
      link: function(scope, element, attrs, ngModelCtrl) {
        var fromUser, maxlength;
        maxlength = Number(attrs.pfMaxlength);
        fromUser = function(text) {
          var transformedInput;
          if (text.length > maxlength) {
            transformedInput = text.substring(0, maxlength);
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
            return transformedInput;
          }
          return text;
        };
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  }).config([
    '$builderProvider', function($builderProvider) {
      $builderProvider.registerComponent('textInput', {
        group: 'Default',
        label: 'Single-line text box',
        description: '',
        placeholder: '',
        required: false,
        validationOptions: [
          {
            label: 'none',
            rule: '/.*/'
          }, {
            label: 'number',
            rule: '[number]'
          }, {
            label: 'email',
            rule: '[email]'
          }, {
            label: 'url',
            rule: '[url]'
          }
        ],
        template: "<div class=\"form-group question text-input\" data-element=\"text-input\">\n    <h4 class=\"question-header\">\n        <span class=\"icon icon-gripper\"></span>\n        <span class=\"title\" data-element=\"text-input-title\">{{label}}</span>\n        <span class=\"edit-btn\" data-element=\"text-input-edit-btn\">Edit question</span>\n        <span class=\"pull-right remove-btn\" data-element=\"text-input-remove-btn\" ng-click=\"popover.remove($event)\">Remove</span>\n    </h4>\n    <div class=\"col-sm-8 form-elements\">\n        <input type=\"text\" ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\" id=\"{{formName+index}}\" placeholder=\"{{placeholder}}\"/>\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form id=\"provider\" data-element=\"text-input-popover\">\n    <div class=\"form-group question-name\">\n        <label class='control-label required'>Question text</label>\n        <input type='text' pf-maxlength='300' ng-model=\"label\" validator=\"[required]\" class='form-control' data-element=\"text-input-popover-name-input\"/>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <i ng-click=\"popover.cancel($event)\" class='icon icon-go-away' data-element=\"text-input-popover-close\"></i>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' data-element=\"text-input-popover-submit-btn\" value='Save question'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' data-element=\"text-input-popover-remove-btn\" value='Delete'/>\n    </div>\n</form>"
      });
      $builderProvider.registerComponent('textArea', {
        group: 'Default',
        label: 'Multi-line text box',
        description: '',
        placeholder: '',
        required: false,
        template: "<div class=\"form-group question text-area\" data-element=\"text-area\">\n    <h4 class=\"question-header\">\n        <span class=\"icon icon-gripper\"></span>\n        <span class=\"title\" data-element=\"text-area-title\">{{label}}</span>\n        <span class=\"edit-btn\" data-element=\"text-area-edit-btn\">Edit question</span>\n        <span class=\"pull-right remove-btn\" data-element=\"text-area-remove-btn\" ng-click=\"popover.remove($event)\">Remove</span>\n    </h4>\n    <div class=\"col-sm-8 form-elements\">\n        <textarea type=\"text\" ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\" id=\"{{formName+index}}\" rows='6' ng-attr-placeholder=\"{{placeholder}}\"/>\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form id=\"provider\" data-element=\"text-area-popover\">\n    <div class=\"form-group question-name\">\n        <label class='control-label required'>Question text</label>\n        <input type='text' pf-maxlength='300' ng-model=\"label\" validator=\"[required]\" class='form-control' data-element=\"text-area-popover-name-input\"/>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <i ng-click=\"popover.cancel($event)\" class='icon icon-go-away' data-element=\"text-area-popover-close\"></i>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' data-element=\"text-area-popover-submit-btn\" value='Save question'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' data-element=\"text-area-popover-remove-btn\" value='Delete'/>\n    </div>\n</form>"
      });
      $builderProvider.registerComponent('checkbox', {
        group: 'Default',
        label: 'Checkbox',
        description: '',
        placeholder: '',
        required: false,
        options: ['value one', 'value two'],
        arrayToText: true,
        template: "<div class=\"form-group question checkbox\" data-element=\"checkbox\">\n    <h4 class=\"question-header\">\n        <span class=\"icon icon-gripper\"></span>\n        <span class=\"title\" data-element=\"checkbox-title\">{{label}}</span>\n        <span class=\"edit-btn\" data-element=\"checkbox-edit-btn\">Edit question</span>\n        <span class=\"pull-right remove-btn\" data-element=\"checkbox-remove-btn\" ng-click=\"popover.remove($event)\">Remove</span>\n    </h4>\n    <div class=\"col-sm-8 form-elements\">\n        <input type='hidden' ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\"/>\n        <div class='checkbox' ng-repeat=\"item in options track by $index\">\n            <label><input type='checkbox' ng-model=\"$parent.inputArray[$index]\" value='item'/>\n                {{item}}\n            </label>\n        </div>\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form id=\"provider\" data-element=\"checkbox-popover\">\n    <div class=\"form-group question-name\">\n        <label class='control-label required'>Question text</label>\n        <input type='text' pf-maxlength='300' ng-model=\"label\" validator=\"[required]\" class='form-control' data-element=\"checkbox-popover-name-input\"/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Answer options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\" data-element=\"checkbox-options-input\"/>\n        <span class=\"help-text\">Enter each choice on a separate line</span>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <i ng-click=\"popover.cancel($event)\" class='icon icon-go-away' data-element=\"checkbox-popover-close\"></i>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' data-element=\"checkbox-popover-submit-btn\" value='Save question'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' data-element=\"checkbox-popover-remove-btn\" value='Delete'/>\n    </div>\n</form>"
      });
      $builderProvider.registerComponent('radio', {
        group: 'Default',
        label: 'Radio button',
        description: '',
        placeholder: '',
        required: false,
        options: ['value one', 'value two'],
        template: "<div class=\"form-group question radio\" data-element=\"radio\">\n    <h4 class=\"question-header\">\n        <span class=\"icon icon-gripper\"></span>\n        <span class=\"title\" data-element=\"radio-title\">{{label}}</span>\n        <span class=\"edit-btn\" data-element=\"radio-edit-btn\">Edit question</span>\n        <span class=\"pull-right remove-btn\" data-element=\"radio-remove-btn\" ng-click=\"popover.remove($event)\">Remove</span>\n    </h4>\n    <div class=\"col-sm-8 form-elements\">\n        <div class='radio' ng-repeat=\"item in options track by $index\">\n            <label><input name='{{formName+index}}' ng-model=\"$parent.inputText\" validator-group=\"{{formName}}\" value='{{item}}' type='radio'/>\n                {{item}}\n            </label>\n        </div>\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form id=\"provider\" data-element=\"radio-popover\">\n    <div class=\"form-group question-name\">\n        <label class='control-label required'>Question text</label>\n        <input type='text' pf-maxlength='300' ng-model=\"label\" validator=\"[required]\" class='form-control' data-element=\"radio-popover-name-input\"/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Answer options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\" data-element=\"radio-options-input\"/>\n        <span class=\"help-text\">Enter each choice on a separate line</span>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <i ng-click=\"popover.cancel($event)\" class='icon icon-go-away' data-element=\"radio-popover-close\"></i>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' data-element=\"radio-popover-submit-btn\" value='Save question'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' data-element=\"radio-popover-remove-btn\" value='Delete'/>\n    </div>\n</form>"
      });
      return $builderProvider.registerComponent('select', {
        group: 'Default',
        label: 'Dropdown',
        description: '',
        placeholder: '',
        required: false,
        options: ['value one', 'value two'],
        template: "<div class=\"form-group question select\" data-element=\"select\">\n    <h4 class=\"question-header\">\n        <span class=\"icon icon-gripper\"></span>\n        <span class=\"title\" data-element=\"select-title\">{{label}}</span>\n        <span class=\"edit-btn\" data-element=\"select-edit-btn\">Edit question</span>\n        <span class=\"pull-right remove-btn\" data-element=\"select-remove-btn\" ng-click=\"popover.remove($event)\">Remove</span>\n    </h4>\n    <div class=\"col-sm-8 form-elements\">\n        <select ng-options=\"value for value in options\" id=\"{{formName+index}}\" class=\"form-control\"\n            ng-model=\"inputText\" ng-init=\"inputText = options[0]\"/>\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form id=\"provider\" data-element=\"select-popover\">\n    <div class=\"form-group question-name\">\n        <label class='control-label required'>Question text</label>\n        <input type='text' pf-maxlength='300' ng-model=\"label\" validator=\"[required]\" class='form-control' data-element=\"select-popover-name-input\"/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Answer options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\" data-element=\"select-options-input\"/>\n        <span class=\"help-text\">Enter each choice on a separate line</span>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <i ng-click=\"popover.cancel($event)\" class='icon icon-go-away' data-element=\"select-popover-close\"></i>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' data-element=\"select-popover-submit-btn\" value='Save question'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' data-element=\"select-popover-remove-btn\" value='Delete'/>\n    </div>\n</form>"
      });
    }
  ]);

}).call(this);
