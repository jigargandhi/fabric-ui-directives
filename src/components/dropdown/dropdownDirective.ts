class DropdownController {
    static $inject = ['$element', '$scope'];
    $dropdownWrapper: JQuery;
    constructor(public $element: JQuery, public $scope) {
        this.$dropdownWrapper = $($element).find("[id^='dropdown']");
        this.init();
    }
    init() {
        var self = this;
        /** Toggle open/closed state of the dropdown when clicking its title. */
        this.$dropdownWrapper.on('click', '.ms-Dropdown-title', function (event) {
            self.openDropdown(event);
        });

        /** Keyboard accessibility */
        this.$dropdownWrapper.on('keyup', function (event) {
            var keyCode = event.keyCode || event.which;
            // Open dropdown on enter or arrow up or arrow down and focus on first option
            if (!$(self).hasClass('is-open')) {
                if (keyCode === 13 || keyCode === 38 || keyCode === 40) {
                    self.openDropdown(event);
                    if (!$(self).find('.ms-Dropdown-item').hasClass('is-selected')) {
                        $(self).find('.ms-Dropdown-item:first').addClass('is-selected');
                    }
                }
            }
            else if ($(self).hasClass('is-open')) {
                // Up arrow focuses previous option
                if (keyCode === 38) {
                    if ($(self).find('.ms-Dropdown-item.is-selected').prev().siblings().length > 0) {
                        $(self).find('.ms-Dropdown-item.is-selected').removeClass('is-selected').prev().addClass('is-selected');
                    }
                }
                // Down arrow focuses next option
                if (keyCode === 40) {
                    if ($(self).find('.ms-Dropdown-item.is-selected').next().siblings().length > 0) {
                        $(self).find('.ms-Dropdown-item.is-selected').removeClass('is-selected').next().addClass('is-selected');
                    }
                }
                // Enter to select item
                if (keyCode === 13) {
                    if (!self.$dropdownWrapper.hasClass('is-disabled')) {

                        // Item text
                        var selectedItemText = $(self).find('.ms-Dropdown-item.is-selected').text();
                        self.$scope.selectedValue = selectedItemText;

                        $(self).find('.ms-Dropdown-title').html(selectedItemText);
                        
                        $(self).removeClass('is-open');
                    }
                }
            }

            // Close dropdown on esc
            if (keyCode === 27) {
                $(self).removeClass('is-open');
            }
        });

        /** Select an option from the dropdown. */
        this.$dropdownWrapper.on('click', '.ms-Dropdown-item', (evt: JQueryEventObject) => {
            if (!this.$dropdownWrapper.hasClass('is-disabled')) {
                /** Deselect all items and select self one. */
                $(evt.target).siblings('.ms-Dropdown-item').removeClass('is-selected');
                $(evt.target).addClass('is-selected');

                this.$scope.selectedValue = $(evt.target).html();
                this.$scope.$digest();
            }
        });
    }
    openDropdown(evt) {
        if (!this.$dropdownWrapper.hasClass('is-disabled')) {

            /** First, let's close any open dropdowns on this page. */
            this.$dropdownWrapper.find('.is-open').removeClass('is-open');

            /** Stop the click event from propagating, which would just close the dropdown immediately. */
            evt.stopPropagation();

            /** Before opening, size the items list to match the dropdown. */
            var dropdownWidth = $(this).parents(".ms-Dropdown").width();
            $(this).next(".ms-Dropdown-items").css('width', dropdownWidth + 'px');

            /** Go ahead and open that dropdown. */
            this.$dropdownWrapper.toggleClass('is-open');

            /** Temporarily bind an event to the document that will close this dropdown when clicking anywhere. */
            $(document).bind("click.dropdown", event => {
                this.$dropdownWrapper.removeClass('is-open');
                $(document).unbind('click.dropdown');
            });
        }
    }

    
}

class DropdownDirective implements ng.IDirective {

    template = '<div ng-class="{\'ms-Dropdown\' : true, \'is-disabled\' : isDisabled}" tabindex="0" id="dropdown-{{uniqueId}}">' +
    '<i class="ms-Dropdown-caretDown ms-Icon ms-Icon--caretDown"></i>' +
    '<span class="ms-Dropdown-title">{{selectedValue}}</span><ul class="ms-Dropdown-items"><li class="ms-Dropdown-item" ng-repeat="o in options">{{o.text}}</li></ul></div>'   ;
    constructor() {
    }
    uniqueId = 1;
    scope = {
        options: "=",
        selectedValue: "=",
        isDisabled: "="
    }
    controller = DropdownController;

    link(scope, elem, attrs) {
        if (!this.uniqueId)
            this.uniqueId = 1;
        scope.uniqueId = this.uniqueId++;
    }
    static factory(): ng.IDirectiveFactory {
        const directive = () => new DropdownDirective();

        return directive;
    }
}

angular.module("fabric.ui.components.dropdown", ['fabric.ui.components'])
    .directive("uifDropdown", DropdownDirective.factory());