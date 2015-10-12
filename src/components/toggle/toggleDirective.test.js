describe("toggleDirective", function () {
    beforeEach(function () {
        angular.mock.module('fabric.ui.components.toggle');
    });
    afterEach(function () {
        // myfunc.reset();
    });
    it("should have unique ids", inject(function ($compile, $rootScope) {
        var $scope = $rootScope.$new();
        var toggle1 = $compile('<uif-toggle label-off="No" label-on="Yes" toggled="toggled">Test</toggle>')($scope);
        $scope.$apply();
        var checkBox1 = $(toggle1[0]).find("input.ms-Toggle-input");
        var toggle2 = $compile('<uif-toggle  label-off="No" label-on="Yes" toggled="toggled">Test</toggle>')($scope);
        $scope.$apply();
        var checkBox2 = $(toggle2[0]).find("input.ms-Toggle-input");
        expect(checkBox1[0].id === checkBox2[0].id).toBe(false);
    }));
    it("should be able to set text location", inject(function ($compile, $rootScope) {
        var $scope = $rootScope.$new();
        $scope.toggled = true;
        var toggle = $compile('<uif-toggle label-off="No" label-on="Yes" toggled="toggled" text-location="right">Toggle this, or not</toggle>')($scope);
        $scope.$digest();
        var mainToggle = $(toggle[0]).find(".ms-Toggle");
        expect(mainToggle.hasClass("ms-Toggle--textRight")).toBe(true);
    }));
    it("should be able to set labels", inject(function ($compile, $rootScope) {
        var $scope = $rootScope.$new();
        $scope.toggled = true;
        var toggle = $compile('<uif-toggle label-off="No" label-on="Yes" toggled="toggled">Toggle this, or not</toggle>')($scope);
        $scope.$apply();
        var labelOff = $(toggle[0]).find('.ms-Label--off');
        var labelOn = $(toggle[0]).find('.ms-Label--on');
        var descLabel = $(toggle[0]).find('.ms-Toggle-description span');
        expect(labelOff.html()).toBe("No");
        expect(labelOn.html()).toBe("Yes");
        expect(descLabel.html()).toBe("Toggle this, or not");
    }));
    it("should be able to toggle", inject(function ($compile, $rootScope) {
        var $scope = $rootScope.$new();
        $scope.toggled = true;
        var toggle = $compile('<uif-toggle desc="TEST" label-off="No" label-on="Yes" toggled="toggled"></toggle>')($scope);
        $scope.$apply();
        var checkBox = $(toggle[0]).find("input.ms-Toggle-input");
        expect(checkBox.is(':checked')).toBe(true);
        $scope.toggled = false;
        $scope.$apply();
        expect(checkBox.is(':checked')).toBe(false);
        checkBox.click();
        expect(checkBox.is(':checked')).toBe(true);
        expect($scope.toggled).toBe(true);
    }));
});
