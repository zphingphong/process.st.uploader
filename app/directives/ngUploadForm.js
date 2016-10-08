app.directive('ngUploadForm', [function () {
  return {
    restrict: 'E',
    templateUrl: './dist/templates/ngUploadForm.html',
    scope: {
      allowed: '@',
      url: '@',
      apiPassword: '@',
      autoUpload: '@',
      sizeLimit: '@'
    },
    controller: ['$scope', '$element', 'fileUpload', function ($scope, $element, fileUpload) {

      $scope.options = {  
        url: $scope.url,
        formData: [{name: 'api_password', value: $scope.apiPassword}],
        autoUpload: $scope.autoUpload,
        limitMultiFileUploadSize: $scope.sizeLimit,
        send: function (err, data) {
          console.log(data);
          return true;
        },
        add: function (err, data) {
          if ($scope.autoUpload) {
              data.process().done(function () {
                  data.submit();
              });
          }
        },
        done: function(err, data) {
          $scope.result = data.result;
        }

      };

    }]
  };
}]);