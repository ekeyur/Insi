var app = angular.module('insiten',['ui.router','nvd3']);

app.config(function($stateProvider,$urlRouterProvider,$locationProvider){
  $locationProvider.hashPrefix('');
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
    {"name": "Krishna Ventures","status":"Researching","category":"Computer Software & Services","contacts":["Keyur Patel, CTO, (342) 453-5432","Jason Stathan, CEO, (123) 436-5678"],"comments": "Guns don't kill people. Chuck Norris kills people, Chuck Norris can rub one penny together, Chuck Norris doesn't go hunting... CHUCK NORRIS GOES KILLING. When Chuck Norris plays dodge ball...the balls dodge him. Chuck Norris can win a game of Connect Four in only three moves. ","performance":[{"key" : "quantity","bar":"true","values":[[2011,10000],[2012,12000],[2013,13000],[2014,15000],[2015,20000],[2016,23000]]}]},
    {"name": "Insiten","status":"Pending","category":"M&A Assist Software","contacts":["Adam Trien, CEO, (123) 456-7890","Gentry Ganote, President & CFO, (324) 432-4312"],"comments": "Chuck Norris does not get frostbite. Chuck Norris bites frost. Contrary to popular belief, Chuck Norris, not the box jellyfish of northern Australia, is the most venomous creature on earth, What was going through the minds of all of Chuck Norris' victims before they died? His shoe, Chuck Norris counted to infinity - twice. ","performance":[{"key" : "quantity","bar":"true","values":[[2011,5000],[2012,6000],[2013,8000],[2014,10000],[2015,15000],[2016,23000]]}]}
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
    let options = {
      chart: {
                type: 'historicalBarChart',
                height: 320,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 50
                },
                x: function(d){return d[0];},
                y: function(d){return d[1];},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.1f')(d);
                },
                duration: 100,
                xAxis: {
                    axisLabel: 'Year Ending',
                    tickFormat: function(d) {
                        return d3.format('.0f')(d);
                    },
                    rotateLabels: 50,
                    showMaxMin: true
                },
                yAxis: {
                    axisLabel: 'Revenue ($)',
                    axisLabelDistance: -10,
                    tickFormat: function(d){
                        return d3.format(',.0f')(d);
                    }
                },
                // tooltip: {
                //     keyFormatter: function(d) {
                //         return d3.time.format('%x')(new Date(d));
                //     }
                // },
                zoom: {
                    enabled: true,
                    scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: true,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };
        cname[0].options = options;
        console.log("company object after adding the options",cname[0]);
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
