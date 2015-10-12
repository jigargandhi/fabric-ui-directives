describe("choicefieldDirective", function () {
    beforeEach(function () {
        angular.mock.module('fabric.ui.components.choicefield');
    });
    afterEach(function () {
        // myfunc.reset();
    });
    it("should have unique ids", inject(function ($compile, $rootScope) {
        var $scope = $rootScope.$new();
        var choiceField1 = $compile('<uif-choicefield checked="checked" label="Test"></uif-textbox>')($scope);
        $scope.$digest();
        var input1 = $(choiceField1[0]).find('.ms-ChoiceField-input');
        var id1 = input1[0].id;
        var choiceField2 = $compile('<uif-choicefield checked="checked" label="Test"></uif-textbox>')($scope);
        $scope.$digest();
        var input2 = $(choiceField2[0]).find('.ms-ChoiceField-input');
        var id2 = input2[0].id;
        expect(id1 === id2).toBe(false);
    }));
    it("should be able to set value", inject(function ($compile, $rootScope) {
        var $scope = $rootScope.$new();
        $scope.checked = true;
        var choiceField = $compile('<uif-choicefield checked="checked" label="Test"></uif-textbox>')($scope);
        $scope.$digest();
        var input = $(choiceField[0]).find('.ms-ChoiceField-input');
        expect(input.prop("checked")).toBe(true);
        $scope.checked = false;
        $scope.$digest();
        expect(input.prop("checked")).toBe(false);
    }));
    it("should be able to set label", inject(function ($compile, $rootScope) {
        var $scope = $rootScope.$new();
        $scope.checked = true;
        var choiceField = $compile('<uif-choicefield checked="checked" label="Test"></uif-textbox>')($scope);
        $scope.$digest();
        var label = $(choiceField[0]).find('.ms-Label');
        expect(label.html()).toBe("Test");
    }));
});
