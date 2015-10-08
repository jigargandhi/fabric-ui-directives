describe("dropdownDirective", function () {
    beforeEach(function () {
        angular.mock.module('fabric.ui.components.dropdown');
    });
    afterEach(function () {
        // myfunc.reset();
    });
    it("should be able to set options", inject(function ($compile, $rootScope) {
        var $scope = $rootScope.$new();
        $scope["options"] = [
            { text: "Option 1" },
            { text: "Option 2" },
            { text: "Option 3" },
            { text: "Option 4" }
        ];
        var dropdown = $compile('<uif-dropdown options="options"></uif-dropdown>')($scope);
        $scope.$digest();
        var items = $(dropdown[0]).find('.ms-Dropdown-item');
        expect(items.length).toBe(4);
        expect(items[2].innerText).toBe("Option 3");
    }));
    it("should be able to select an option", inject(function ($compile, $rootScope) {
        var $scope = $rootScope.$new();
        $scope["options"] = [
            { text: "Option 1" },
            { text: "Option 2" },
            { text: "Option 3" },
            { text: "Option 4" }
        ];
        $scope["selectedValue"] = "Option 1";
        var dropdown = $compile('<uif-dropdown options="options" selected-value="selectedValue"></uif-dropdown>')($scope);
        $scope.$digest();
        var title = $(dropdown[0]).find('.ms-Dropdown-title');
        expect(title.text()).toBe("Option 1");
        var items = $(dropdown[0]).find('.ms-Dropdown-item');
        $(items[3]).click();
        title = $(dropdown[0]).find('.ms-Dropdown-title');
        expect(title.text()).toBe("Option 4");
    }));
    it("should be able to disable a select", inject(function ($compile, $rootScope) {
        var $scope = $rootScope.$new();
        $scope["options"] = [
            { text: "Option 1" },
            { text: "Option 2" },
            { text: "Option 3" },
            { text: "Option 4" }
        ];
        $scope["selectedValue"] = "Option 1";
        $scope["isDisabled"] = true;
        var dropdown = $compile('<uif-dropdown is-disabled="isDisabled" options="options" selected-value="selectedValue"></uif-dropdown>')($scope);
        $scope.$digest();
        var title = $(dropdown[0]).find('.ms-Dropdown-title');
        expect(title.text()).toBe("Option 1");
        var items = $(dropdown[0]).find('.ms-Dropdown-item');
        console.log("3:" + items[3].outerHTML);
        $(items[3]).click();
        title = $(dropdown[0]).find('.ms-Dropdown-title');
        expect(title.text()).toBe("Option 1");
    }));
});
