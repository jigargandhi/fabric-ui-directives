 /// <reference path="../typings/karma/karma.d.ts"/>
 /// <reference path="../typings/jasmine/jasmine.d.ts"/>
/// <reference path="../typings/angularjs/angular-mocks.d.ts"/>
/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/jquery/jquery.d.ts"/>


describe("toggleDirective", () => {
    beforeEach(() => {
        angular.mock.module('fabricuiDirectives');
    });

    afterEach(() => {
        // myfunc.reset();
    });
    it("should have unique ids", inject(($compile, $rootScope) => {
        var $scope = $rootScope.$new();
        var toggle1 = $compile('<uif-toggle desc="TEST" label-off="No" label-on="Yes" toggled="toggled"></toggle>')($scope);
        $scope.$apply();
        
        var checkBox1 = $(toggle1[0]).find("input.ms-Toggle-input");

        var toggle2 = $compile('<uif-toggle desc="TEST" label-off="No" label-on="Yes" toggled="toggled"></toggle>')($scope);
        $scope.$apply();
        var checkBox2 = $(toggle2[0]).find("input.ms-Toggle-input");
        expect(checkBox1[0].id === checkBox2[0].id).toBe(false);

    }));
    it("should be able to set labels", inject(($compile, $rootScope) => {
        var $scope = $rootScope.$new();
        $scope.toggled = true;
       
        var toggle = $compile('<uif-toggle desc="TEST" label-off="No" label-on="Yes" toggled="toggled"></toggle>')($scope);
        $scope.$apply();

        var labelOff = $(toggle[0]).find('.ms-Label--off');
        var labelOn = $(toggle[0]).find('.ms-Label--on');

        expect(labelOff.html()).toBe("No");
        expect(labelOn.html()).toBe("Yes");
    }));

    it("should be able to toggle", inject(($compile, $rootScope) => {
        var $scope = $rootScope.$new();
        $scope.toggled = true;

        var toggle = $compile('<uif-toggle desc="TEST" label-off="No" label-on="Yes" toggled="toggled"></toggle>')($scope);
        $scope.$apply();

        var checkBox = $(toggle[0]).find("input.ms-Toggle-input");

        expect(checkBox.is(':checked')).toBe(true);

        $scope.toggled = false;
        $scope.$apply();

        expect(checkBox.is(':checked')).toBe(false);

    }));
    
});