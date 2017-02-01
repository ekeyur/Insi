var app = angular.module('insiten',['ui.router','nvd3']);


/// Route Providers
app.config(function($stateProvider,$urlRouterProvider,$locationProvider){
  // This line is added to take off the "!" from the url adjacent to "#" sign.
  $locationProvider.hashPrefix('');
  $stateProvider

  //List of all companies are on this state
  .state({
    name: 'companies',
    url: '/companies',
    templateUrl:'templates/companies.html',
    controller: 'companiesController'
  })
  // Showing home page (Landing page)
  .state({
    name: 'companies.home',
    url: '/home',
    templateUrl:'templates/home.html',
    controller: 'homeController'
  })
  //Showing each of the companies info
  .state({
    name: 'companies.company',
    url: '/{name}',
    templateUrl:'templates/company.html',
    controller: 'companyController'
  })
  // Editing a particular company
  .state({
    name: 'companies.edit',
    url: '/{name}/edit',
    templateUrl:'templates/editcompany.html',
    controller: 'editcompanyController'
  })
  // Adding a company
  .state({
    name: 'addcompany',
    url:'/addcompany',
    templateUrl:'templates/addcompany.html',
    controller:'addcompanyController'
  });

  $urlRouterProvider.otherwise('/companies/home');
});

//////////////////////////////////////////
//Directives

//Label and text input directive
app.directive('textinput',function(){
  return {
    scope: {
      'value':'=ngModel',
      'for':'@'
    },
    template: `<div class="form-group">
      <label class="col-lg-2 col-md-2 control-label">{{for}}</label>
      <div class="col-lg-10 col-md-10">
      <input type="text" ng-model="value" class="form-control">
      </div>
    </div>`
  };
});

///////////////////////////////////////////////////////////////
// Factories
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
    {"name": "Insiten","status":"Pending","category":"M&A Assist Software","contacts":["Adam Trien, CEO, (123) 456-7890","Gentry Ganote, President & CFO, (324) 432-4312"],"comments": "Chuck Norris does not get frostbite. Chuck Norris bites frost. Contrary to popular belief, Chuck Norris, not the box jellyfish of northern Australia, is the most venomous creature on earth, What was going through the minds of all of Chuck Norris' victims before they died? His shoe, Chuck Norris counted to infinity - twice. ","performance":[{"key" : "quantity","bar":"true","values":[[2011,5000],[2012,6000],[2013,8000],[2014,10000],[2015,15000],[2016,23000]]}]},
    {"name": "Facebook","status":"Approved","category":"Social Media","contacts":["Adam Trien, CEO, (123) 456-7890","Gentry Ganote, President & CFO, (324) 432-4312"],"comments": "The leading causes of death in the United States are: 1. Heart Disease 2. Chuck Norris 3. Cancer, If you spell Chuck Norris in Scrabble, you win. Forever, What was going through the minds of all of Chuck Norris' victims before they died? His shoe The US did not boycott the 1980 Summer Olympics in Moscow due to political reasons: Chuck Norris killed the entire US team with a single round-house kick during TaeKwonDo practice.","performance":[{"key" : "quantity","bar":"true","values":[[2011,1000],[2012,3000],[2013,8000],[2014,5000],[2015,7000],[2016,4000]]}]},
    {"name": "Intuit","status":"Pending","category":"Business Software","contacts":["Adam Trien, CEO, (123) 456-7890","Gentry Ganote, President & CFO, (324) 432-4312"],"comments": "Chuck Norris does not get frostbite. Chuck Norris bites frost. Contrary to popular belief, Chuck Norris, not the box jellyfish of northern Australia, is the most venomous creature on earth, What was going through the minds of all of Chuck Norris' victims before they died? His shoe, Chuck Norris counted to infinity - twice. ","performance":[{"key" : "quantity","bar":"true","values":[[2011,5000],[2012,4000],[2013,6000],[2014,7000],[2015,15000],[2016,18000]]}]},
    {"name": "Amazon","status":"Researching","category":"Internet Retailer","contacts":["Adam Trien, CEO, (123) 456-7890","Gentry Ganote, President & CFO, (324) 432-4312"],"comments": "Chuck Norris does not get frostbite. Chuck Norris bites frost. Contrary to popular belief, Chuck Norris, not the box jellyfish of northern Australia, is the most venomous creature on earth, What was going through the minds of all of Chuck Norris' victims before they died? His shoe, Chuck Norris counted to infinity - twice. ","performance":[{"key" : "quantity","bar":"true","values":[[2011,5000],[2012,6000],[2013,8000],[2014,10000],[2015,15000],[2016,23000]]}]},
    {"name": "Blackberry","status":"Pending","category":"Mobile Phones","contacts":["Adam Trien, CEO, (123) 456-7890","Gentry Ganote, President & CFO, (324) 432-4312"],"comments": "Chuck Norris does not get frostbite. Chuck Norris bites frost. Contrary to popular belief, Chuck Norris, not the box jellyfish of northern Australia, is the most venomous creature on earth, What was going through the minds of all of Chuck Norris' victims before they died? His shoe, Chuck Norris counted to infinity - twice. ","performance":[{"key" : "quantity","bar":"true","values":[[2011,20000],[2012,17000],[2013,12000],[2014,8000],[2015,7000],[2016,8000]]}]},
  ];
  return service;
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Controllers

//Controller that shows the list of all the companies.
// Deleting and editing a company functions are also present here.
app.controller('companiesController',function($scope,API,$state,$rootScope){
  $scope.companies = API.companies;
  //Function to delete a record
  $scope.delete = function(name){
    $scope.companies = $scope.companies.filter(function(item){
      return item.name !== name;
    });
    $state.go('companies.home');
    };
  });

//Home Controller
app.controller('homeController', function($scope, $stateParams, $state) {
  $state.go('companies.home');
});

//Add Company Controller
app.controller('addcompanyController',function($scope,API,$state){
  $scope.addcompany = function(){

  // Add fake financial data when a new company is added.
  let years = [2011,2012,2013,2014,2015,2016];
  var findata = [];
  for(let i=0;i<years.length;i++){
    findata[i] = [years[i],(Math.floor((Math.random() * 25) + 1))*1000];
  }
  var performance = [{"key" : "quantity","bar":"true","values":findata}];

  var newcompany = {
    "name" : $scope.name,
    "category" : $scope.category,
    "status" : $scope.status,
    "contacts" : [$scope.contact1,$scope.contact2],
    "comments" : $scope.comments,
    "performance" : performance
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
            title: {
                    enable: true,
                    text: "Past Performance"
            },
            yAxis: {
                axisLabel: 'Revenue (USD)',
                axisLabelDistance: -10,
                tickFormat: function(d){
                    return d3.format(',.0f')(d);
                }
            },
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
    // Add options to the object for display purpose
    cname[0].options = options;
    $scope.companyInfo = cname[0];
  });

// Edit company controller
app.controller('editcompanyController',function($scope,API,$stateParams,$state){
  //For going back to the company page after editing
  $scope.companies = API.companies;
  let cname = API.companies.filter(function(e){
    return e.name === $stateParams.name;
  });
  $scope.editCompany = cname[0];
});
