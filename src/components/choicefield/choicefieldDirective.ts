module Fabric.UI.Components.ChoiceField {
    export class ChoiceFieldGroupController {
        static $inject = ['$element'];
        cfRenderFns = [];
        ngModelCtrl;
        constructor(public $element : JQuery) {}
        
        init(ngModelCtrl) {
            this.ngModelCtrl = ngModelCtrl;
            this.ngModelCtrl.$render = angular.bind(this, this.render);
        }
        add(cfRenderFn) {
            this.cfRenderFns.push(cfRenderFn);
        }

        remove(cfRender) {
            var index = this.cfRenderFns.indexOf(cfRender);
            if (index !== -1) {
                this.cfRenderFns.splice(index, 1);
            }
        }

        render() {
            this.cfRenderFns.forEach(cfRenderFn => cfRenderFn());
        }

        setViewValue(value, eventType) {
            this.ngModelCtrl.$setViewValue(value, eventType);
            // update the other radio buttons as well
            this.render();
        }
        getViewValue() {
            return this.ngModelCtrl.$viewValue;
        }
    }

    export class ChoiceFieldGroupDirective implements ng.IDirective {
        restrict = 'E';
        template =
            '<div class="ms-ChoiceFieldGroup">' +
                '<div class="ms-ChoiceFieldGroup-title">' +
                    '<label ng-class="{\'ms-Label\' : true, \'is-required\' : required}">{{label}}</label>' +
                '</div>' +
                '<ng-transclude/>' +
            '</div>';
        transclude = true;
        scope = {
            label: "@"
            
        };
        link(scope, elem, attrs, ctrls) {
            var groupController: ChoiceFieldGroupController = ctrls[0];
            var modelController = ctrls[1];
            scope.required = false;
            attrs.$observe('required', value => {
                scope.required = value;
            });
            modelController.$validators["required"] = modelValue => {
                return !scope.required || (typeof modelValue !== "undefined" && modelValue !== "");
            }
            groupController.init(modelController);
        }
        controller = ChoiceFieldGroupController;
        require = ["uifChoicefieldGroup", "ngModel"];
        static factory(): ng.IDirectiveFactory {
            const directive = () => new ChoiceFieldGroupDirective();

            return directive;
        }
    }
    export class ChoiceFieldDirective implements ng.IDirective {

        template = '<div class="ms-ChoiceField">' +
            '<input id="{{uniqueId}}" class="ms-ChoiceField-input" type="radio" ng-checked="checked">' +
            '<label for="{{uniqueId}}" class="ms-ChoiceField-field"><span class="ms-Label"><ng-transclude/></span></label>' +
            '</div>';

        constructor() {
        }
        restrict = 'E';
        require ="^uifChoicefieldGroup";
        uniqueId = 1;
        transclude = true;
        scope = {
            //checked: "="
        }

        link(scope, elem, attrs, groupController : ChoiceFieldGroupController) {
            if (!this.uniqueId)
                this.uniqueId = 1;
            scope.uniqueId = this.uniqueId++;

            if (!groupController) {
                throw "Group controller not found!";
            }
            
            var render = () => {
                //console.log("Render: " + attrs["value"]);
                var currentValue = groupController.getViewValue();
                var checked = attrs["value"] === currentValue;
                scope["checked"] = checked;
            }
            groupController.add(render);
            
            attrs.$observe('value', render);

            elem
                .on('click', ev => {
                    console.log("CLICK");
                    scope.$apply(() => {
                        groupController.setViewValue(attrs["value"], ev);
                    });
                })
                .on('$destroy', ()=> {
                    groupController.remove(render);
                });


        }

        static factory(): ng.IDirectiveFactory {
            const directive = () => new ChoiceFieldDirective();

            return directive;
        }
    }

    
}

angular.module("fabric.ui.components.choicefield", ['fabric.ui.components'])
    .directive("uifChoicefieldGroup", Fabric.UI.Components.ChoiceField.ChoiceFieldGroupDirective.factory())
    .directive("uifChoicefield", Fabric.UI.Components.ChoiceField.ChoiceFieldDirective.factory());
    