(function() {
  angular.module('builder.components', ['builder', 'validator.rules']).config([
    '$builderProvider', function($builderProvider) {
      $builderProvider.registerComponent('textInput', {
        group: 'Default',
        label: 'Answer in one line',
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
        template: "<div class=\"form-group question text-input\">\n    <h4 class=\"question-header\">\n        <span class=\"icon icon-gripper\"></span>\n        <span class=\"title\">{{label}}</span>\n        <span class=\"edit-btn\">Edit question</span>\n        <span class=\"pull-right remove-btn\" ng-click=\"popover.remove($event)\">Remove</span>\n    </h4>\n    <div class=\"col-sm-8 form-elements\">\n        <input type=\"text\" ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\" id=\"{{formName+index}}\" placeholder=\"{{placeholder}}\"/>\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form id=\"provider\">\n    <div class=\"form-group question-name\">\n        <label class='control-label required'>Question name</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <i ng-click=\"popover.cancel($event)\" class='icon icon-go-away'></i>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save question'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
      $builderProvider.registerComponent('textArea', {
        group: 'Default',
        label: 'Answer in multiple lines',
        description: '',
        placeholder: '',
        required: false,
        template: "<div class=\"form-group question text-area\">\n    <h4 class=\"question-header\">\n        <span class=\"icon icon-gripper\"></span>\n        <span class=\"title\">{{label}}</span>\n        <span class=\"edit-btn\">Edit question</span>\n        <span class=\"pull-right remove-btn\" ng-click=\"popover.remove($event)\">Remove</span>\n    </h4>\n    <div class=\"col-sm-8 form-elements\">\n        <textarea type=\"text\" ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\" id=\"{{formName+index}}\" rows='6' ng-attr-placeholder=\"{{placeholder}}\"/>\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form id=\"provider\">\n    <div class=\"form-group question-name\">\n        <label class='control-label required'>Question name</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <i ng-click=\"popover.cancel($event)\" class='icon icon-go-away'></i>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save question'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
      $builderProvider.registerComponent('checkbox', {
        group: 'Default',
        label: 'Checkbox',
        description: '',
        placeholder: '',
        required: false,
        options: ['value one', 'value two'],
        arrayToText: true,
        template: "<div class=\"form-group question checkbox\">\n    <h4 class=\"question-header\">\n        <span class=\"icon icon-gripper\"></span>\n        <span class=\"title\">{{label}}</span>\n        <span class=\"edit-btn\">Edit question</span>\n        <span class=\"pull-right remove-btn\" ng-click=\"popover.remove($event)\">Remove</span>\n    </h4>\n    <div class=\"col-sm-8 form-elements\">\n        <input type='hidden' ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\"/>\n        <div class='checkbox' ng-repeat=\"item in options track by $index\">\n            <label><input type='checkbox' ng-model=\"$parent.inputArray[$index]\" value='item'/>\n                {{item}}\n            </label>\n        </div>\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form id=\"provider\">\n    <div class=\"form-group question-name\">\n        <label class='control-label required'>Question name</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <i ng-click=\"popover.cancel($event)\" class='icon icon-go-away'></i>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save question'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
      $builderProvider.registerComponent('radio', {
        group: 'Default',
        label: 'Radio button',
        description: '',
        placeholder: '',
        required: false,
        options: ['value one', 'value two'],
        template: "<div class=\"form-group question radio\">\n    <h4 class=\"question-header\">\n        <span class=\"icon icon-gripper\"></span>\n        <span class=\"title\">{{label}}</span>\n        <span class=\"edit-btn\">Edit question</span>\n        <span class=\"pull-right remove-btn\" ng-click=\"popover.remove($event)\">Remove</span>\n    </h4>\n    <div class=\"col-sm-8 form-elements\">\n        <div class='radio' ng-repeat=\"item in options track by $index\">\n            <label><input name='{{formName+index}}' ng-model=\"$parent.inputText\" validator-group=\"{{formName}}\" value='{{item}}' type='radio'/>\n                {{item}}\n            </label>\n        </div>\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form id=\"provider\">\n    <div class=\"form-group question-name\">\n        <label class='control-label required'>Question name</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <i ng-click=\"popover.cancel($event)\" class='icon icon-go-away'></i>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save question'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
      return $builderProvider.registerComponent('select', {
        group: 'Default',
        label: 'Dropdown',
        description: '',
        placeholder: '',
        required: false,
        options: ['value one', 'value two'],
        template: "<div class=\"form-group question select\">\n    <h4 class=\"question-header\">\n        <span class=\"icon icon-gripper\"></span>\n        <span class=\"title\">{{label}}</span>\n        <span class=\"edit-btn\">Edit question</span>\n        <span class=\"pull-right remove-btn\" ng-click=\"popover.remove($event)\">Remove</span>\n    </h4>\n    <div class=\"col-sm-8 form-elements\">\n        <select ng-options=\"value for value in options\" id=\"{{formName+index}}\" class=\"form-control\"\n            ng-model=\"inputText\" ng-init=\"inputText = options[0]\"/>\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form id=\"provider\">\n    <div class=\"form-group question-name\">\n        <label class='control-label required'>Question name</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <i ng-click=\"popover.cancel($event)\" class='icon icon-go-away'></i>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save question'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
    }
  ]);

}).call(this);
