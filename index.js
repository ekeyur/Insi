var app = angular.module('insiten',['ui.router','nvd3']);

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
    name: 'companies.edit',
    url: '/{name}/edit',
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
    {"name": "Rigor","status":"researching","category":"Computer Software & Services","contacts":["Keyur Patel","Jason Stathan"],"comments": "poor","performance":[[2011,10000],[2012,12000],[2013,13000],[2014,15000],[2015,20000],[2016,23000]]},
    {"name": "Insiten","status":"pending","category":"M&A assist Software","contacts":["Adam Trien","Gentry Ganote "],"comments": "good","performance":[[2011,10000],[2012,12000],[2013,15000],[2014,20000],[2015,28000],[2016,39000]]}
  ];
  return service;
});

//Controller that shows the list of all the companies.
// Deleting and editing a company functions are also present here.
app.controller('companiesController',function($scope,API,$state,$rootScope){
  // API.companies().success(function(data){
  //   $scope.companies = data;
  //   $scope.delete = function($index){
  //     $scope.companies.splice($index,1);
  //   };
  // });
  $rootScope.editC = false;
  $scope.companies = API.companies;

  $scope.delete = function($index){
    $scope.companies.splice($index,1);
  };

  // $scope.edit = function($index){
  //   $scope.editcompany = API.companies[$index];
  //   $rootScope.editC = true;
  // };
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

// Display the selected company controller
app.controller('companyController',function($scope,API,$stateParams,$rootScope){
    let cname = API.companies.filter(function(a){
      return a.name === $stateParams.name;
    });
    $rootScope.editC = false;
    // Display Graph

    var options = {
            chart: {
                type: 'historicalBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 65,
                    left: 50
                },
                x: function(d){return d[0];},
                y: function(d){return d[1]/100000;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.1f')(d);
                },
                duration: 100,
                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d) {
                        return d3.time.format('%x')(new Date(d))
                    },
                    rotateLabels: 30,
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: -10,
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                },
                tooltip: {
                    keyFormatter: function(d) {
                        return d3.time.format('%x')(new Date(d));
                    }
                },
                zoom: {
                    enabled: true,
                    scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };
        cname[0].options = options;
        console.log("optoinasfasd asdf",cname[0]);
        $scope.companyInfo = cname[0];
  });

// Edit company controller
app.controller('editcompanyController',function($scope,API,$stateParams,$state){
  let cname = API.companies.filter(function(e){
    return e.name === $stateParams.name;
  });
  $scope.editCompany = cname[0];
  console.log($scope.editCompany);
});
