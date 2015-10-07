/// <reference path="../../../typings/pickadate/pickadate.d.ts" />

module Fabric.UI.Components.DatePicker {

    export class DatePickerController {
        static $inject = ['$element', '$scope'];
        static dateField: JQuery;
        static picker: Pickadate.DatePicker;
        $element:JQuery;
        constructor( $element: JQuery, public $scope: IDatePickerDirectiveScope) {
            $scope.vm = this;
            this.$element = $($element);
            //window.dump(this.$element.find('.ms-label').length);
            //window.dump(this.$element.find('.ms-TextField-field').html());
            //window.dump($($element).find('.ms-TextField-field').html());
            //var datefield = $element.find('.ms-TextField-field').pickadate();

            window.dump("CONTROLLER CONSTRUCTED");
            this.initConfiguration();
            //this.initDatepicker();
            // Any Jquery access goes here. Use $element

            // Setup any $watch on $scope that you need
        }

        initConfiguration() {
            this.$scope.monthsArray = this.$scope.months.split(',');
            if (this.$scope.monthsArray.length !== 12) {
                throw "Months setting should have 12 months, separated by a comma";
            }
        }

        static initDatepicker($element) {
            var self = this;
            
            this.dateField = $element.find('.ms-TextField-field').pickadate({
                // Strings and translations.
                weekdaysShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

                // Don't render the buttons
                today: '',
                clear: '',
                close: '',

                // Events
                onStart: function () {
                    self.initCustomView($element);
                },

                // Classes
                klass: {

                    // The element states
                    input: 'ms-DatePicker-input',
                    active: 'ms-DatePicker-input--active',

                    // The root picker and states
                    picker: 'ms-DatePicker-picker',
                    opened: 'ms-DatePicker-picker--opened',
                    focused: 'ms-DatePicker-picker--focused',

                    // The picker holder
                    holder: 'ms-DatePicker-holder',

                    // The picker frame, wrapper, and box
                    frame: 'ms-DatePicker-frame',
                    wrap: 'ms-DatePicker-wrap',
                    box: 'ms-DatePicker-dayPicker',

                    // The picker header
                    header: 'ms-DatePicker-header',

                    // Month & year labels
                    month: 'ms-DatePicker-month',
                    year: 'ms-DatePicker-year',

                    // Table of dates
                    table: 'ms-DatePicker-table',

                    // Weekday labels
                    weekdays: 'ms-DatePicker-weekday',

                    // Day states
                    day: 'ms-DatePicker-day',
                    disabled: 'ms-DatePicker-day--disabled',
                    selected: 'ms-DatePicker-day--selected',
                    now: 'ms-DatePicker-day--today',
                    infocus: 'ms-DatePicker-day--infocus',
                    outfocus: 'ms-DatePicker-day--outfocus'
                }
            });
            

            this.picker = this.dateField.pickadate('picker');

            /** Respond to built-in picker events. */
            this.picker.on({
                render: function () {
                    self.updateCustomView($element);
                },
                open: function () {
                    self.scrollUp($element);
                }
            });
        }

        static initCustomView($element) {

            /** Get some variables ready. */
            var $monthControls = $element.find('.ms-DatePicker-monthComponents');
            var $goToday = $element.find('.ms-DatePicker-goToday');
            var $dayPicker = $element.find('.ms-DatePicker-dayPicker');
            var $monthPicker = $element.find('.ms-DatePicker-monthPicker');
            var $yearPicker = $element.find('.ms-DatePicker-yearPicker');
            var $pickerWrapper = $element.find('.ms-DatePicker-wrap');
            var $picker = $element.find('.ms-TextField-field').pickadate('picker');
            //var $picker = this.picker;
            var self = this;
            
            /** Move the month picker into position. */
            
            $monthControls.appendTo($pickerWrapper);
            $goToday.appendTo($pickerWrapper);
            $monthPicker.appendTo($pickerWrapper);
            $yearPicker.appendTo($pickerWrapper);

            /** Update the custom view. */
            DatePickerController.updateCustomView($element);

            /** Move back one month. */
            $monthControls.on('click', '.js-prevMonth', function (event) {
                event.preventDefault();
                var newMonth = $picker.get('highlight').month - 1;
                DatePickerController.changeHighlightedDate(null, newMonth, null);
            });
            
            /** Move ahead one month. */
            $monthControls.on('click', '.js-nextMonth', function (event) {
                event.preventDefault();
                var newMonth = $picker.get('highlight').month + 1;
                self.changeHighlightedDate( null, newMonth, null);
            });

            /** Move back one year. */
            $monthPicker.on('click', '.js-prevYear', function (event) {
                event.preventDefault();
                var newYear = $picker.get('highlight').year - 1;
                self.changeHighlightedDate(newYear, null, null);
            });

            /** Move ahead one year. */
            $monthPicker.on('click', '.js-nextYear', function (event) {
                event.preventDefault();
                var newYear = $picker.get('highlight').year + 1;
                self.changeHighlightedDate(newYear, null, null);
            });

            /** Move back one decade. */
            $yearPicker.on('click', '.js-prevDecade', function (event) {
                event.preventDefault();
                var newYear = $picker.get('highlight').year - 10;
                self.changeHighlightedDate( newYear, null, null);
            });

            /** Move ahead one decade. */
            $yearPicker.on('click', '.js-nextDecade', function (event) {
                event.preventDefault();
                var newYear = $picker.get('highlight').year + 10;
                self.changeHighlightedDate(newYear, null, null);
            });

            /** Go to the current date, shown in the day picking view. */
            $goToday.click(function (event) {
                event.preventDefault();

                /** Select the current date, while keeping the picker open. */
                var now = new Date();
                $picker.set('select', [now.getFullYear(), now.getMonth(), now.getDate()]);

                /** Switch to the default (calendar) view. */
                this.$element.removeClass('is-pickingMonths').removeClass('is-pickingYears');

            });

            /** Change the highlighted month. */
            
            $monthPicker.on('click', '.js-changeDate', function (event) {
                event.preventDefault();

                /** Get the requested date from the data attributes. */
                var newYear = $(this).attr('data-year');
                var newMonth = $(this).attr('data-month');
                var newDay = $(this).attr('data-day');

                /** Update the date. */
                self.changeHighlightedDate(newYear, newMonth, newDay);

                /** If we've been in the "picking months" state on mobile, remove that state so we show the calendar again. */
                if ($element.hasClass('is-pickingMonths')) {
                    $element.removeClass('is-pickingMonths');
                }
            });

            /** Change the highlighted year. */
            $yearPicker.on('click', '.js-changeDate', function (event) {
                event.preventDefault();

                /** Get the requested date from the data attributes. */
                var newYear = $(this).attr('data-year');
                var newMonth = $(this).attr('data-month');
                var newDay = $(this).attr('data-day');

                /** Update the date. */
                self.changeHighlightedDate(newYear, newMonth, newDay);

                /** If we've been in the "picking years" state on mobile, remove that state so we show the calendar again. */
                if ($element.hasClass('is-pickingYears')) {
                    $element.removeClass('is-pickingYears');
                }
            });

            /** Switch to the default state. */
            $monthPicker.on('click', '.js-showDayPicker', function (event) {
                $element.removeClass('is-pickingMonths');
                $element.removeClass('is-pickingYears');
            });

            /** Switch to the is-pickingMonths state. */
            $monthControls.on('click', '.js-showMonthPicker', function (event) {
                $element.toggleClass('is-pickingMonths');
            });

            /** Switch to the is-pickingYears state. */
            $monthPicker.on('click', '.js-showYearPicker', function (event) {
                $element.toggleClass('is-pickingYears');
            });

        }

        static updateCustomView($element) {
            /** Get some variables ready. */
            var $monthPicker = $element.find('.ms-DatePicker-monthPicker');
            var $yearPicker = $element.find('.ms-DatePicker-yearPicker');
            var $pickerWrapper = $element.find('.ms-DatePicker-wrap');
            var $picker = $element.find('.ms-TextField-field').pickadate('picker');
            //var $picker = this.picker;

            /** Set the correct year. */
            $monthPicker.find('.ms-DatePicker-currentYear').text($picker.get('view').year);

            /** Highlight the current month. */
            $monthPicker.find('.ms-DatePicker-monthOption').removeClass('is-highlighted')
            $monthPicker.find('.ms-DatePicker-monthOption[data-month="' + $picker.get('highlight').month + '"]').addClass('is-highlighted');

            /** Generate the grid of years for the year picker view. */

            // Start by removing any existing generated output. */
            $yearPicker.find('.ms-DatePicker-currentDecade').remove();
            $yearPicker.find('.ms-DatePicker-optionGrid').remove();

            // Generate the output by going through the years.
            var startingYear = $picker.get('highlight').year - 11;
            var decadeText = startingYear + " - " + (startingYear + 11);
            var output = '<div class="ms-DatePicker-currentDecade">' + decadeText + '</div>';
            output += '<div class="ms-DatePicker-optionGrid">';
            for (var year = startingYear; year < (startingYear + 12); year++) {
                output += '<span class="ms-DatePicker-yearOption js-changeDate" data-year="' + year + '">' + year + '</span>';
            }
            output += '</div>';

            // Output the title and grid of years generated above.
            $yearPicker.append(output);

            /** Highlight the current year. */
            $yearPicker.find('.ms-DatePicker-yearOption').removeClass('is-highlighted')
            $yearPicker.find('.ms-DatePicker-yearOption[data-year="' + $picker.get('highlight').year + '"]').addClass('is-highlighted');
        }

        static scrollUp($element) {
            $('html, body').animate({
                scrollTop: $element.offset().top
            }, 367);
        }

        static changeHighlightedDate(newYear, newMonth, newDay) {

            /** All variables are optional. If not provided, default to the current value. */
            if (newYear == null) {
                newYear = this.picker.get('highlight').year;
            }
            if (newMonth == null) {
                newMonth = this.picker.get('highlight').month;
            }
            if (newDay == null) {
                newDay = this.picker.get('highlight').date;
            }

            /** Update it. */
            this.picker.set('highlight', [newYear, newMonth, newDay]);

        }

        
        

    }
    
    export interface IDatePickerDirectiveScope extends ng.IScope {
        bar: string;
        months: string;
        startLabel: string;
        placeHolderText: string;
        monthsArray: string[];
        // Local design only
        vm: DatePickerController;
        
    }

    export class DatePickerDirective implements ng.IDirective {

        template = '<span>{{bar}}</span><div class="ms-TextField">'+
         '<label class="ms-Label">{{startLabel}}</label>'+
         '<i class="ms-DatePicker-event ms-Icon ms-Icon--event"></i>'+
         '<input class="ms-TextField-field" type="text" placeholder="{{placeHolderText}}">'+
         '</div>'+
         '<div class="ms-DatePicker-monthComponents">'+
         '<span class="ms-DatePicker-nextMonth js-nextMonth"><i class="ms-Icon ms-Icon--chevronRight"></i></span>'+
         '<span class="ms-DatePicker-prevMonth js-prevMonth"><i class="ms-Icon ms-Icon--chevronLeft"></i></span>'+
         '<div class="ms-DatePicker-headerToggleView js-showMonthPicker"></div>'+
         '</div>'+
         '<span class="ms-DatePicker-goToday js-goToday">Go to today</span>'+
         '<div class="ms-DatePicker-monthPicker">'+
         '<div class="ms-DatePicker-header">'+
         '<div class="ms-DatePicker-yearComponents">'+
         '<span class="ms-DatePicker-nextYear js-nextYear"><i class="ms-Icon ms-Icon--chevronRight"></i></span>'+
         '<span class="ms-DatePicker-prevYear js-prevYear"><i class="ms-Icon ms-Icon--chevronLeft"></i></span>'+
         '</div>'+
         '<div class="ms-DatePicker-currentYear js-showYearPicker"></div>'+
         '</div>'+
        '<div class="ms-DatePicker-optionGrid" >' +
      
        '<span ng-repeat="month in monthsArray" class="ms-DatePicker-monthOption js-changeDate" data-month="{{$index}}">{{month}}</span>' + 
        '</div></div>' +
         '<div class="ms-DatePicker-yearPicker">'+
         '<div class="ms-DatePicker-decadeComponents">'+
         '<span class="ms-DatePicker-nextDecade js-nextDecade"><i class="ms-Icon ms-Icon--chevronRight"></i></span>'+
         '<span class="ms-DatePicker-prevDecade js-prevDecade"><i class="ms-Icon ms-Icon--chevronLeft"></i></span>'+
         '</div></div>';

        constructor() {
        }
        uniqueId = 1;
        scope = {
            value: "=",
            months: "@",
            startLabel: "@",
            placeHolderText : "@"
        };
        compile(element: JQuery, attrs: angular.IAttributes, transclude: any): any {
            
                if (!attrs["months"]) {
                    attrs["months"] = "'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'";
                }
                if (!attrs["startLabel"]) {
                    window.dump("Start label not set");
                    attrs["startLabel"] = "Start Date";
                }

                if (!attrs["placeHolderText"]) {
                    attrs["placeHolderText"] = "Select a date";
                }

                DatePickerController.initDatepicker($(element));
                /** Get some variables ready. */
                //var element = $(element);
                //var $monthControls = element.find('.ms-DatePicker-monthComponents');
                    
                //var $pickerWrapper = element.find('.ms-DatePicker-wrap');
                    
                    
                /** Move the month picker into position. */
                    
                //$monthControls.appendTo($pickerWrapper);
                
            
            
            
            //if (!attrs.attrOne) { attrs.attrOne = 'default value'; }
            //if (!attrs.attrTwo) { attrs.attrTwo = 42; }

        }
        //todo replace? 

        link(scope, elem, attrs) {
            //dump("Link");
            if (!this.uniqueId)
                this.uniqueId = 1;
            scope.uniqueId = this.uniqueId++;
            
        }

        controller = DatePickerController;

        static factory(): ng.IDirectiveFactory {
            const directive = () => new DatePickerDirective();

            return directive;
        }
    }

    
}
angular.module("fabric.ui.components.datepicker", ['fabric.ui.components'])
    .directive("uifDatepicker", Fabric.UI.Components.DatePicker.DatePickerDirective.factory());



