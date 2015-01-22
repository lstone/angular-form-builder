angular.module 'builder.components', ['builder', 'validator.rules']
# don't allow more than maxlength of characters in field: http://stackoverflow.com/questions/17075969/ng-maxlength-screws-up-my-model
angular.module('builder.components').directive "pfMaxlength", ->
  require: "ngModel"
  link: (scope, element, attrs, ngModelCtrl) ->
    maxlength = Number(attrs.pfMaxlength)
    fromUser = (text) ->
      if text.length > maxlength
        # console.log 'too many characters'
        transformedInput = text.substring(0, maxlength)
        ngModelCtrl.$setViewValue transformedInput
        ngModelCtrl.$render()
        return transformedInput
      text
    ngModelCtrl.$parsers.push fromUser
    return

.config ['$builderProvider', ($builderProvider) ->
    # ----------------------------------------
    # text input
    # ----------------------------------------
    $builderProvider.registerComponent 'textInput',
        group: 'Default'
        label: 'Single-line text box'
        description: ''
        placeholder: ''
        required: no
        validationOptions: [
            {label: 'none', rule: '/.*/'}
            {label: 'number', rule: '[number]'}
            {label: 'email', rule: '[email]'}
            {label: 'url', rule: '[url]'}
        ]
        template:
            """
            <div class="form-group question text-input" data-element="text-input">
                <h4 class="question-header">
                    <span class="icon icon-gripper"></span>
                    <span class="title" data-element="text-input-title">{{label}}</span>
                    <span class="edit-btn" data-element="text-input-edit-btn">Edit question</span>
                    <span class="pull-right remove-btn" data-element="text-input-remove-btn" ng-click="popover.remove($event)">Remove</span>
                </h4>
                <div class="col-sm-8 form-elements">
                    <input type="text" ng-model="inputText" validator-required="{{required}}" validator-group="{{formName}}" id="{{formName+index}}" placeholder="{{placeholder}}"/>
                    <p class='help-block'>{{description}}</p>
                </div>
            </div>
            """
        popoverTemplate:
            """
            <form id="provider" data-element="text-input-popover">
                <div class="form-group question-name">
                    <label class='control-label required'>Question text</label>
                    <input type='text' pf-maxlength='300' ng-model="label" validator="[required]" class='form-control' data-element="text-input-popover-name-input"/>
                </div>

                <hr/>
                <div class='form-group'>
                    <i ng-click="popover.cancel($event)" class='icon icon-go-away' data-element="text-input-popover-close"></i>
                    <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' data-element="text-input-popover-submit-btn" value='Save question'/>
                    <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' data-element="text-input-popover-remove-btn" value='Delete'/>
                </div>
            </form>
            """

    # ----------------------------------------
    # Text area
    # ----------------------------------------
    $builderProvider.registerComponent 'textArea',
        group: 'Default'
        label: 'Multi-line text box'
        description: ''
        placeholder: ''
        required: no
        template:
            """
            <div class="form-group question text-area" data-element="text-area">
                <h4 class="question-header">
                    <span class="icon icon-gripper"></span>
                    <span class="title" data-element="text-area-title">{{label}}</span>
                    <span class="edit-btn" data-element="text-area-edit-btn">Edit question</span>
                    <span class="pull-right remove-btn" data-element="text-area-remove-btn" ng-click="popover.remove($event)">Remove</span>
                </h4>
                <div class="col-sm-8 form-elements">
                    <textarea type="text" ng-model="inputText" validator-required="{{required}}" validator-group="{{formName}}" id="{{formName+index}}" rows='6' ng-attr-placeholder="{{placeholder}}"/>
                    <p class='help-block'>{{description}}</p>
                </div>
            </div>
            """
        popoverTemplate:
            """
            <form id="provider" data-element="text-area-popover">
                <div class="form-group question-name">
                    <label class='control-label required'>Question text</label>
                    <input type='text' pf-maxlength='300' ng-model="label" validator="[required]" class='form-control' data-element="text-area-popover-name-input"/>
                </div>

                <hr/>
                <div class='form-group'>
                    <i ng-click="popover.cancel($event)" class='icon icon-go-away' data-element="text-area-popover-close"></i>
                    <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' data-element="text-area-popover-submit-btn" value='Save question'/>
                    <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' data-element="text-area-popover-remove-btn" value='Delete'/>
                </div>
            </form>
            """

    # ----------------------------------------
    # checkbox
    # ----------------------------------------
    $builderProvider.registerComponent 'checkbox',
        group: 'Default'
        label: 'Checkbox'
        description: ''
        placeholder: ''
        required: no
        options: ['value one', 'value two']
        arrayToText: yes
        template:
            """
            <div class="form-group question checkbox" data-element="checkbox">
                <h4 class="question-header">
                    <span class="icon icon-gripper"></span>
                    <span class="title" data-element="checkbox-title">{{label}}</span>
                    <span class="edit-btn" data-element="checkbox-edit-btn">Edit question</span>
                    <span class="pull-right remove-btn" data-element="checkbox-remove-btn" ng-click="popover.remove($event)">Remove</span>
                </h4>
                <div class="col-sm-8 form-elements">
                    <input type='hidden' ng-model="inputText" validator-required="{{required}}" validator-group="{{formName}}"/>
                    <div class='checkbox' ng-repeat="item in options track by $index">
                        <label><input type='checkbox' ng-model="$parent.inputArray[$index]" value='item'/>
                            {{item}}
                        </label>
                    </div>
                    <p class='help-block'>{{description}}</p>
                </div>
            </div>
            """
        popoverTemplate:
            """
            <form id="provider" data-element="checkbox-popover">
                <div class="form-group question-name">
                    <label class='control-label required'>Question text</label>
                    <input type='text' pf-maxlength='300' ng-model="label" validator="[required]" class='form-control' data-element="checkbox-popover-name-input"/>
                </div>
                <div class="form-group">
                    <label class='control-label'>Answer options</label>
                    <textarea class="form-control" rows="3" ng-model="optionsText" data-element="checkbox-options-input"/>
                    <span class="help-text">Enter each choice on a separate line</span>
                </div>

                <hr/>
                <div class='form-group'>
                    <i ng-click="popover.cancel($event)" class='icon icon-go-away' data-element="checkbox-popover-close"></i>
                    <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' data-element="checkbox-popover-submit-btn" value='Save question'/>
                    <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' data-element="checkbox-popover-remove-btn" value='Delete'/>
                </div>
            </form>
            """

    # ----------------------------------------
    # radio
    # ----------------------------------------
    $builderProvider.registerComponent 'radio',
        group: 'Default'
        label: 'Radio button'
        description: ''
        placeholder: ''
        required: no
        options: ['value one', 'value two']
        template:
            """
            <div class="form-group question radio" data-element="radio">
                <h4 class="question-header">
                    <span class="icon icon-gripper"></span>
                    <span class="title" data-element="radio-title">{{label}}</span>
                    <span class="edit-btn" data-element="radio-edit-btn">Edit question</span>
                    <span class="pull-right remove-btn" data-element="radio-remove-btn" ng-click="popover.remove($event)">Remove</span>
                </h4>
                <div class="col-sm-8 form-elements">
                    <div class='radio' ng-repeat="item in options track by $index">
                        <label><input name='{{formName+index}}' ng-model="$parent.inputText" validator-group="{{formName}}" value='{{item}}' type='radio'/>
                            {{item}}
                        </label>
                    </div>
                    <p class='help-block'>{{description}}</p>
                </div>
            </div>
            """
        popoverTemplate:
            """
            <form id="provider" data-element="radio-popover">
                <div class="form-group question-name">
                    <label class='control-label required'>Question text</label>
                    <input type='text' pf-maxlength='300' ng-model="label" validator="[required]" class='form-control' data-element="radio-popover-name-input"/>
                </div>
                <div class="form-group">
                    <label class='control-label'>Answer options</label>
                    <textarea class="form-control" rows="3" ng-model="optionsText" data-element="radio-options-input"/>
                    <span class="help-text">Enter each choice on a separate line</span>
                </div>

                <hr/>
                <div class='form-group'>
                    <i ng-click="popover.cancel($event)" class='icon icon-go-away' data-element="radio-popover-close"></i>
                    <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' data-element="radio-popover-submit-btn" value='Save question'/>
                    <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' data-element="radio-popover-remove-btn" value='Delete'/>
                </div>
            </form>
            """

    # ----------------------------------------
    # select
    # ----------------------------------------
    $builderProvider.registerComponent 'select',
        group: 'Default'
        label: 'Dropdown'
        description: ''
        placeholder: ''
        required: no
        options: ['value one', 'value two']
        template:
            """
            <div class="form-group question select" data-element="select">
                <h4 class="question-header">
                    <span class="icon icon-gripper"></span>
                    <span class="title" data-element="select-title">{{label}}</span>
                    <span class="edit-btn" data-element="select-edit-btn">Edit question</span>
                    <span class="pull-right remove-btn" data-element="select-remove-btn" ng-click="popover.remove($event)">Remove</span>
                </h4>
                <div class="col-sm-8 form-elements">
                    <select ng-options="value for value in options" id="{{formName+index}}" class="form-control"
                        ng-model="inputText" ng-init="inputText = options[0]"/>
                    <p class='help-block'>{{description}}</p>
                </div>
            </div>
            """
        popoverTemplate:
            """
            <form id="provider" data-element="select-popover">
                <div class="form-group question-name">
                    <label class='control-label required'>Question text</label>
                    <input type='text' pf-maxlength='300' ng-model="label" validator="[required]" class='form-control' data-element="select-popover-name-input"/>
                </div>
                <div class="form-group">
                    <label class='control-label'>Answer options</label>
                    <textarea class="form-control" rows="3" ng-model="optionsText" data-element="select-options-input"/>
                    <span class="help-text">Enter each choice on a separate line</span>
                </div>

                <hr/>
                <div class='form-group'>
                    <i ng-click="popover.cancel($event)" class='icon icon-go-away' data-element="select-popover-close"></i>
                    <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' data-element="select-popover-submit-btn" value='Save question'/>
                    <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' data-element="select-popover-remove-btn" value='Delete'/>
                </div>
            </form>
            """
]
