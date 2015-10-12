var Fabric;
(function (Fabric) {
    var UI;
    (function (UI) {
        var Components;
        (function (Components) {
            var ChoiceField;
            (function (ChoiceField) {
                var ChoiceFieldGroupController = (function () {
                    function ChoiceFieldGroupController($element) {
                        this.$element = $element;
                        this.cfRenderFns = [];
                    }
                    ChoiceFieldGroupController.prototype.init = function (ngModelCtrl) {
                        this.ngModelCtrl = ngModelCtrl;
                        this.ngModelCtrl.$render = angular.bind(this, this.render);
                    };
                    ChoiceFieldGroupController.prototype.add = function (cfRenderFn) {
                        this.cfRenderFns.push(cfRenderFn);
                    };
                    ChoiceFieldGroupController.prototype.remove = function (cfRender) {
                        var index = this.cfRenderFns.indexOf(cfRender);
                        if (index !== -1) {
                            this.cfRenderFns.splice(index, 1);
                        }
                    };
                    ChoiceFieldGroupController.prototype.render = function () {
                        this.cfRenderFns.forEach(function (cfRenderFn) { return cfRenderFn(); });
                    };
                    ChoiceFieldGroupController.prototype.setViewValue = function (value, eventType) {
                        this.ngModelCtrl.$setViewValue(value, eventType);
                        // update the other radio buttons as well
                        this.render();
                    };
                    ChoiceFieldGroupController.prototype.getViewValue = function () {
                        return this.ngModelCtrl.$viewValue;
                    };
                    ChoiceFieldGroupController.$inject = ['$element'];
                    return ChoiceFieldGroupController;
                })();
                ChoiceField.ChoiceFieldGroupController = ChoiceFieldGroupController;
                var ChoiceFieldGroupDirective = (function () {
                    function ChoiceFieldGroupDirective() {
                        this.restrict = 'E';
                        this.template = '<div class="ms-ChoiceFieldGroup">' +
                            '<div class= "ms-ChoiceFieldGroup-title">' +
                            '<label class="ms-Label is-required">{{label}}</label>' +
                            '</div>' +
                            '<ng-transclude/>' +
                            '</div>';
                        this.transclude = true;
                        this.scope = {
                            label: "@"
                        };
                        this.controller = ChoiceFieldGroupController;
                        this.require = ["uifChoicefieldGroup", "ngModel"];
                    }
                    ChoiceFieldGroupDirective.prototype.link = function (scope, elem, attrs, ctrls) {
                        var groupController = ctrls[0];
                        var modelController = ctrls[1];
                        groupController.init(modelController);
                    };
                    ChoiceFieldGroupDirective.factory = function () {
                        var directive = function () { return new ChoiceFieldGroupDirective(); };
                        return directive;
                    };
                    return ChoiceFieldGroupDirective;
                })();
                ChoiceField.ChoiceFieldGroupDirective = ChoiceFieldGroupDirective;
                var ChoiceFieldDirective = (function () {
                    function ChoiceFieldDirective() {
                        this.template = '<div class="ms-ChoiceField">' +
                            '<input id="{{uniqueId}}" class="ms-ChoiceField-input" type="radio" ng-checked="checked">' +
                            '<label for="{{uniqueId}}" class="ms-ChoiceField-field"><span class="ms-Label"><ng-transclude/></span></label>' +
                            '</div>';
                        this.restrict = 'E';
                        this.require = "^uifChoicefieldGroup";
                        this.uniqueId = 1;
                        this.transclude = true;
                        this.scope = {};
                    }
                    ChoiceFieldDirective.prototype.link = function (scope, elem, attrs, groupController) {
                        if (!this.uniqueId)
                            this.uniqueId = 1;
                        scope.uniqueId = this.uniqueId++;
                        if (!groupController) {
                            throw "Group controller not found!";
                        }
                        var render = function () {
                            //console.log("Render: " + attrs["value"]);
                            var currentValue = groupController.getViewValue();
                            var checked = attrs["value"] === currentValue;
                            scope["checked"] = checked;
                        };
                        groupController.add(render);
                        attrs.$observe('value', render);
                        elem
                            .on('click', function (ev) {
                            console.log("CLICK");
                            scope.$apply(function () {
                                groupController.setViewValue(attrs["value"], ev);
                            });
                        })
                            .on('$destroy', function () {
                            groupController.remove(render);
                        });
                    };
                    ChoiceFieldDirective.factory = function () {
                        var directive = function () { return new ChoiceFieldDirective(); };
                        return directive;
                    };
                    return ChoiceFieldDirective;
                })();
                ChoiceField.ChoiceFieldDirective = ChoiceFieldDirective;
            })(ChoiceField = Components.ChoiceField || (Components.ChoiceField = {}));
        })(Components = UI.Components || (UI.Components = {}));
    })(UI = Fabric.UI || (Fabric.UI = {}));
})(Fabric || (Fabric = {}));
angular.module("fabric.ui.components.choicefield", ['fabric.ui.components'])
    .directive("uifChoicefieldGroup", Fabric.UI.Components.ChoiceField.ChoiceFieldGroupDirective.factory())
    .directive("uifChoicefield", Fabric.UI.Components.ChoiceField.ChoiceFieldDirective.factory());
