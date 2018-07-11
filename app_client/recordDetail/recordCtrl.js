angular
  .module('app')
  .controller('recordCtrl', recordCtrl);

  recordCtrl.$inject = ['$scope', '$routeParams', 'todoData'];

  function recordCtrl ($scope, $routeParams, todoData) {
    var vm = this;

    vm.recordid = $routeParams.recordid;
    vm.pageHeader = { title: vm.recordid };

    todoData.readOne(vm.recordid)
      .success(function(data) {
        vm.data = { record: data };
        vm.pageHeader = {
          title: vm.data.record.title,
          description: vm.data.record.description
        };
      })
      .error(function(err) {
        console.log(err);
      });

  }