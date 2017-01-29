var app = angular.module('insiten',['ui.router']);

app.config(function($stateProvider,$urlRouterProvider){
  $stateProvider
  .state({
    name: 'companies',
    url: '/companies',
    templateUrl:'companies.html',
    controller: 'companiesController'
  })
  .state({
    name: 'companies.company',
    url: '/{name}',
    templateUrl:'company.html',
    controller: 'companyController'
  })
  .state({
    name: 'companies.company.edit',
    url: '/edit',
    templateUrl:'editcompany.html',
    controller: 'editcompanyController'
  })

  .state({
    name: 'addcompany',
    url:'/addcompany',
    templateUrl:'addcompany.html',
    controller:'addcompanyController'
  });

  $urlRouterProvider.otherwise('/companies');
});


app.factory('API',function($http){
  var service = {};
  // HTTP request to get the data from data.json
  // service.companies = function(){
  //   var url = "data.json";
  //   return $http({
  //     method: 'GET',
  //     url:url,
  //   });
  // };

  service.companies = [
    {"name": "IBM","status":"researching","category":"Computer Software & Services","contacts":["Keyur Patel","Jason Stathan"],"comments": "poor"},
    {"name": "Insiten","status":"pending","category":"M&A assist Software","contacts":["Adam Trien","Gentry Ganote "],"comments": "good"}
  ];
  return service;
});

//Controller that shows the list of all the companies.
// Deleting and editing a company functions are also present here.
app.controller('companiesController',function($scope,API,$state){
  // API.companies().success(function(data){
  //   $scope.companies = data;
  //   $scope.delete = function($index){
  //     $scope.companies.splice($index,1);
  //   };
  // });
  $scope.companies = API.companies;
    $scope.delete = function($index){
      $scope.companies.splice($index,1);
    };
    $scope.edit = function($index){
      $scope.editcompany = API.companies[$index];
      // $state.go(API.companies[$index].name+"/edit");
    };
  });


//Add Company Controller
app.controller('addcompanyController',function($scope,API,$state){
$scope.addcompany = function(){
  var newcompany = {
    "name" : $scope.name,
    "category" : $scope.category,
    "status" : $scope.status,
    "contacts" : [$scope.contact1,$scope.contact2],
    "comments" : $scope.comments
    };
  API.companies.push(newcompany);
  $state.go('companies');
  };
});

// Filter the company that is selected to know which record to display.
app.controller('companyController',function($scope,API,$stateParams){
    var cname = API.companies.filter(function(a){
      return a.name === $stateParams.name;
    });
    $scope.companyInfo = cname[0];
  });

// Edit company controller
app.controller('editcompanyController',function($scope,API,$stateParams,$state){
  console.log($stateParams.name);

});
