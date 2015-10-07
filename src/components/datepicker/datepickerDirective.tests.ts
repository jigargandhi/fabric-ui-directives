describe("datepickerDirective", () => {
    beforeEach(() => {
        angular.mock.module('fabric.ui.components.datepicker');
    });

    afterEach(() => {
        // myfunc.reset();
    });
    it("Should be able to configure months", inject(($compile, $rootScope) => {
        var $scope = $rootScope.$new();
        var datepicker = $compile('<uif-datepicker></uif-datepicker>')($scope);
        $scope.$digest();
        
        // verify default months
        var monthsContainer = $(datepicker[0]).find('.ms-DatePicker-optionGrid');
        expect(monthsContainer.length).toBe(1);  
        expect(monthsContainer.find('span').length).toBe(12);


        // verify valid set of months
        $scope = $rootScope.$new();
        datepicker = $compile('<uif-datepicker months="Jan,Feb,Maa,Apr,Mei,Jun,Jul,Aug,Sep,Okt,Nov,Dec"></uif-datepicker>')($scope);
        $scope.$digest();
        monthsContainer = $(datepicker[0]).find('.ms-DatePicker-optionGrid');
        expect(monthsContainer.length).toBe(1, "Custom months configuration");
        expect(monthsContainer.find('span').length).toBe(12);
        expect(monthsContainer.find('span[data-month="2"]').html()).toBe('Maa');

        // verify valid set of months
        $scope = $rootScope.$new();
        
        var exc = false;
        try {
            $compile('<uif-datepicker months="Jan,Feb,Maa,Apr,Mei,Jun,Jul,Aug,Sep,Okt,Nov"></uif-datepicker>')($scope);
            $scope.$digest();    
        }
        catch (e) {
            exc = true;
        }
        expect(exc).toBe(true);
        
    }));

    it("Should be able to set start label", inject(($compile, $rootScope) => {
        var $scope = $rootScope.$new();
        var datepicker = $compile('<uif-datepicker></uif-datepicker>')($scope);
        $scope.$digest();

        // verify default value
        var startLabel = $(datepicker[0]).find('.ms-Label');
        expect(startLabel.text()).toBe("Start Date", "Default start label should be Start Date");

        datepicker = $compile('<uif-datepicker start-label="First Date"></uif-datepicker>')($scope);
        $scope.$digest();

        // verify custom value
        startLabel = $(datepicker[0]).find('.ms-Label');
        expect(startLabel.text()).toBe("First Date", "Setting custom start date label");

    }));

    it("Should be able to set placeholder", inject(($compile, $rootScope) => {
        var $scope = $rootScope.$new();
        var datepicker = $compile('<uif-datepicker></uif-datepicker>')($scope);
        $scope.$digest();

        // verify default value
        var input = $(datepicker[0]).find('.ms-TextField-field');
        expect(input.attr("Placeholder")).toBe("Select a date");

        datepicker = $compile('<uif-datepicker place-holder-text="Please, find a date"></uif-datepicker>')($scope);
        $scope.$digest();

        // verify custom value
        input = $(datepicker[0]).find('.ms-TextField-field');
        expect(input.attr("Placeholder")).toBe("Please, find a date");

    }));
});