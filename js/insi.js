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

  // Editing or adding a company
  .state({
    name: 'companies.editadd',
    url: '/{name}/editadd',
    templateUrl:'templates/editaddcompany.html',
    controller: 'edit-add-companyController'
  })

  $urlRouterProvider.otherwise('/companies/home');
});

//////////////////////////////////////////
//Directives

//Label and text input directive
app.directive('textInput',function(){
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

  service.statuses = [
              "Researching",
              "Pending",
              "Approved",
              "Denied"
            ];

  service.companies = [
    {
        id: 1,
        name: "SnapChat",
        status: "Researching",
        category: "Social media",
        contacts: [
          {
            name: "Evan Spiegel",
            phone: "408-574-3873"
          }
        ],
        comments: "Snapchat lets you easily talk with friends, view Live Stories from around the world, and explore news in Discover.",
        performance:  [{
          key : "quantity",
          bar: true,
          values:[[2011,10000],[2012,12000],[2013,13000],[2014,15000],[2015,20000],[2016,23000]]
        }]
    },
    {
      id: 2,
      name: "Insiten",
      status:"Pending",
      category:"Business Consulting",
      contacts:[
        {
          name: "Adam Trian",
          phone: "408-574-3873"
        }
      ],
      comments: "Insiten works with clients to understand thier business requirements and develop impactful solutions that improve efficiency, collaboration, and visibility.",
      performance:  [{
        key : "quantity",
        bar:true,
        values:[[2011,5000],[2012,6000],[2013,8000],[2014,10000],[2015,15000],[2016,23000]]
      }]
    },
    {
      id: 3,
      name: "Facebook",
      status:"Approved",
      category:"Social Media",
      contacts:[
        {
          name: "Mark Zuckerberg",
          phone: "408-574-3873"
        }
      ],
      comments: "Facebook is an American for-profit corporation and an online social media and social networking service based in Menlo Park, California.",
      performance:[{
        key : "quantity",
        bar:true,
        values:[[2011,1000],[2012,3000],[2013,8000],[2014,5000],[2015,7000],[2016,4000]]
      }]
    },
    {
      id: 4,
      name: "Intuit",
      status: "Pending",
      category: "Business Software",
      contacts:[
        {
          name: "Brad Smith",
          phone: "408-574-3873"
        }
      ],
      comments: "Intuit Inc. is a business and financial software company that develops and sells financial, accounting and tax preparation software and related services for small businesses, accountants and individuals.",
      performance:[{
        key : "quantity",
        bar : true,
        values : [[2011,5000],[2012,4000],[2013,6000],[2014,7000],[2015,15000],[2016,18000]]
      }]
    },
    {
      id: 5,
      name: "Amazon",
      status:"Researching",
      category:"Internet Retailer",
      contacts:[
          {
            name: "Zeff Bezoz",
            phone: "408-574-3873"
          }
      ],
      comments: "Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally. It operates through the North America, International, and Amazon Web Services (AWS) segments. ",
      performance:[{
        key : "quantity",
        bar : true,
        values :[[2011,5000],[2012,6000],[2013,8000],[2014,10000],[2015,15000],[2016,23000]]
      }]
    }
  ];
  return service;
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Controllers

//Controller that shows the list of all the companies
app.controller('companiesController',function($scope,API,$state){
  $scope.companies = API.companies;
  //Function to delete a record for a given company
  $scope.delete = function(name){
    $scope.companies = $scope.companies.filter(function(item){
      return item.name !== name;
    });
      $state.go('companies.home');
    };
  });

//Home Controller
app.controller('homeController', function($state) {
  $state.go('companies.home');
});

// Abandoned this controller as using the same controller for adding or editing companies

// //Add Company Controller
// app.controller('addcompanyController',function($scope,API,$state){
//   $scope.addcompany = function(){
//   // Add fake financial data when a new company is added.
//   $scope.statuses = API.statuses;
//   let years = [2011,2012,2013,2014,2015,2016];
//   var fin_data = [];
//   for(let i=0;i<years.length;i++){
//     fin_data[i] = [years[i],(Math.floor((Math.random() * 25) + 1))*1000];
//   }
//   var performance = [{
//       key : "quantity",
//       bar : true,
//       values : fin_data
//     }];
//
//   var newcompany = {
//       name : $scope.name,
//       category : $scope.category,
//       status : $scope.status,
//       contacts : [
//         {
//           name: $scope.contact1name,
//           phone: $scope.contact1phone
//         }
//       ],
//       comments : $scope.comments,
//       performance : [{
//           key : "quantity",
//           bar : true,
//           values : fin_data
//         }]
//     };
//
//   API.companies.push(newcompany);
//   $state.go('companies');
//   };
// });
//

// Edit and add company controller
app.controller('edit-add-companyController',function($scope,API,$stateParams,$state){
  //For going back to the company page after editing
    $scope.statuses = API.statuses;
    $scope.showaddform = false;


    // If Edit button is pressed it would pass the company name and not 'AddNew'
    if($stateParams.name !== 'AddNew') {
      // searches and returns the company object
      let cname = API.companies.filter(function(company) {
        return company.name === $stateParams.name;
      });
      //Saving the company to the scope variable
      $scope.editAddCompany = cname[0];
    }
    // Else adding a new company
    else
      {
        // Pushing the new company to the service.
        API.companies.push({
          id : API.companies.length,
          name : $stateParams.name,
          category : " ",
          status : " ",
          contacts : [
            {
              name: " ",
              phone: " "
            }
          ],
          comments : " ",
          performance : [{
              key : "quantity",
              bar : true,
              values : [[2011,0],[2012,0],[2013,0],[2014,0],[2015,0],[2016,0]]
            }]
        });

        let cname = API.companies.filter(function(company) {
          return company.name === $stateParams.name;
        });
        $scope.editAddCompany = cname[0];
        console.log(API);
    }

    // Add additional contact
    $scope.addContact = function(){
    $scope.editAddCompany.contacts.push({name: $scope.name, phone: $scope.phone});
    $scope.showaddform = false;
    // console.log($scope.editAddCompany)
    $scope.name = '';
    $scope.phone= '';
    }

    $scope.setShowAddForm = function(){
      $scope.showaddform = true;
    }
  });


// Display the selected company controller
app.controller('companyController',function($scope,API,$stateParams,$rootScope){
    let cname = API.companies.filter(function(company){
      return company.name === $stateParams.name;
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
                axisLabel: '',
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
                axisLabel: 'Revenue(USD)',
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
