angular.module 'builder.components', ['builder', 'validator.rules']
.config ['$builderProvider', ($builderProvider) ->
    # ----------------------------------------
    # text input
    # ----------------------------------------
    $builderProvider.registerComponent 'textInput',
        group: 'Default'
        label: 'Answer in one line'
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
            <div class="form-group question text-input">
                <h4 class="question-header">
                    <span class="icon icon-gripper"></span>
                    <span class="title">{{label}}</span>
                    <span class="edit-btn">Edit question</span>
                    <span class="pull-right remove-btn" ng-click="popover.remove($event)">Remove</span>
                </h4>
                <div class="col-sm-8 form-elements">
                    <input type="text" ng-model="inputText" validator-required="{{required}}" validator-group="{{formName}}" id="{{formName+index}}" placeholder="{{placeholder}}"/>
                    <p class='help-block'>{{description}}</p>
                </div>
            </div>
            """
        popoverTemplate:
            """
            <form id="provider">
                <div class="form-group question-name">
                    <label class='control-label required'>Question name</label>
                    <input type='text' ng-model="label" validator="[required]" class='form-control'/>
                </div>

                <hr/>
                <div class='form-group'>
                    <i ng-click="popover.cancel($event)" class='icon icon-go-away'></i>
                    <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' value='Save question'/>
                    <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' value='Delete'/>
                </div>
            </form>
            """

    # ----------------------------------------
    # Text area
    # ----------------------------------------
    $builderProvider.registerComponent 'textArea',
        group: 'Default'
        label: 'Answer in multiple lines'
        description: ''
        placeholder: ''
        required: no
        template:
            """
            <div class="form-group question text-area">
                <h4 class="question-header">
                    <span class="icon icon-gripper"></span>
                    <span class="title">{{label}}</span>
                    <span class="edit-btn">Edit question</span>
                    <span class="pull-right remove-btn" ng-click="popover.remove($event)">Remove</span>
                </h4>
                <div class="col-sm-8 form-elements">
                    <textarea type="text" ng-model="inputText" validator-required="{{required}}" validator-group="{{formName}}" id="{{formName+index}}" rows='6' ng-attr-placeholder="{{placeholder}}"/>
                    <p class='help-block'>{{description}}</p>
                </div>
            </div>
            """
        popoverTemplate:
            """
            <form id="provider">
                <div class="form-group question-name">
                    <label class='control-label required'>Question name</label>
                    <input type='text' ng-model="label" validator="[required]" class='form-control'/>
                </div>

                <hr/>
                <div class='form-group'>
                    <i ng-click="popover.cancel($event)" class='icon icon-go-away'></i>
                    <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' value='Save question'/>
                    <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' value='Delete'/>
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
            <div class="form-group question checkbox">
                <h4 class="question-header">
                    <span class="icon icon-gripper"></span>
                    <span class="title">{{label}}</span>
                    <span class="edit-btn">Edit question</span>
                    <span class="pull-right remove-btn" ng-click="popover.remove($event)">Remove</span>
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
            <form id="provider">
                <div class="form-group question-name">
                    <label class='control-label required'>Question name</label>
                    <input type='text' ng-model="label" validator="[required]" class='form-control'/>
                </div>
                <div class="form-group">
                    <label class='control-label'>Options</label>
                    <textarea class="form-control" rows="3" ng-model="optionsText"/>
                    <span class="help-text">Click "enter" after every option entry.</span>
                </div>

                <hr/>
                <div class='form-group'>
                    <i ng-click="popover.cancel($event)" class='icon icon-go-away'></i>
                    <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' value='Save question'/>
                    <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' value='Delete'/>
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
            <div class="form-group question radio">
                <h4 class="question-header">
                    <span class="icon icon-gripper"></span>
                    <span class="title">{{label}}</span>
                    <span class="edit-btn">Edit question</span>
                    <span class="pull-right remove-btn" ng-click="popover.remove($event)">Remove</span>
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
            <form id="provider">
                <div class="form-group question-name">
                    <label class='control-label required'>Question name</label>
                    <input type='text' ng-model="label" validator="[required]" class='form-control'/>
                </div>
                <div class="form-group">
                    <label class='control-label'>Options</label>
                    <textarea class="form-control" rows="3" ng-model="optionsText"/>
                    <span class="help-text">Click "enter" after every option entry.</span>
                </div>

                <hr/>
                <div class='form-group'>
                    <i ng-click="popover.cancel($event)" class='icon icon-go-away'></i>
                    <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' value='Save question'/>
                    <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' value='Delete'/>
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
            <div class="form-group question select">
                <h4 class="question-header">
                    <span class="icon icon-gripper"></span>
                    <span class="title">{{label}}</span>
                    <span class="edit-btn">Edit question</span>
                    <span class="pull-right remove-btn" ng-click="popover.remove($event)">Remove</span>
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
            <form id="provider">
                <div class="form-group question-name">
                    <label class='control-label required'>Question name</label>
                    <input type='text' ng-model="label" validator="[required]" class='form-control'/>
                </div>
                <div class="form-group">
                    <label class='control-label'>Options</label>
                    <textarea class="form-control" rows="3" ng-model="optionsText"/>
                    <span class="help-text">Click "enter" after every option entry.</span>
                </div>

                <hr/>
                <div class='form-group'>
                    <i ng-click="popover.cancel($event)" class='icon icon-go-away'></i>
                    <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' value='Save question'/>
                    <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' value='Delete'/>
                </div>
            </form>
            """
]
