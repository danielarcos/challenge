'use strict';

/**
 * @ngdoc function
 * @name challenge2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the challenge2App
 */
angular.module('challenge2App')
  .controller('MainCtrl', function ($scope, $compile) {
    $scope.clips = [];

    function addDefaultClip(){
      var clip ={
        clipName : 'Full Video',
        time: 0,
        editable : false
      };
      $scope.clips.push(clip);
    }

    $scope.manageClips = function(){
      $scope.clipIndex = 0;
      $scope.clipName = '';
      $scope.startTime = '';
      $scope.endTime = '';

      var templateString = '<div class="row">  ' +
          '<div class="col-md-12"> ' +
          '<form class="form-horizontal"> ' +
          '<div class="form-group"> ' +
          '<div class="col-md-10">' +

          '<div class="row">'+
          '<div class="col-sm-3">' +
          '<input ng-model="clipName" class="form-control" placeholder="Clip Name">' +
          '</div><div class="col-sm-3">'+
          '<input ng-model="startTime" class="form-control" placeholder="Start Time">' +
          '</div><div class="col-sm-3">'+
          '<input ng-model="endTime" class="form-control" placeholder="End Time">' +
          '</div><div class="col-sm-3">'+
          '<a href="" ng-click="upsertClip()" class="btn btn-info" title="Ok"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></a>' +
          '</div></div><br>'+

          '<span><b>CLIPS</b></span>'+
          '<table class="table table-striped">'+
          '<tr ng-repeat="clip in clips">'+
          '<td>{{clip.clipName}}</td>'+
          '<td><a href="" ng-click="editClip($index)" ng-show="clip.editable" class="btn btn-info" title="Edit"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>'+
          '<a href="" ng-click="deleteClip($index)" ng-show="clip.editable" class="btn btn-info" title="Delete"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a></td>'+
          '</tr></table>'+

          '</div></div> ' +
          '</form> </div>  </div>';

      var element = $compile(templateString)($scope);

      bootbox.dialog({
                title: 'Manage Clips',
                message: element,
                buttons: {
                    success: {
                        label: 'Accept',
                        className: 'btn-success',
                    }
                }
            }
        );
    };

    $scope.upsertClip = function(){
      var clip ={
        clipName : $scope.clipName,
        timeStart : $scope.startTime,
        timeEnd : $scope.endTime,
        time: $scope.startTime + ',' + $scope.endTime,
        editable : true
      };

      if($scope.clipIndex === 0){
          $scope.clips.push(clip);
      }else{
        $scope.clips[$scope.clipIndex] = clip;
        $scope.clipIndex = 0;
      }
      $scope.clipName = '';
      $scope.startTime = '';
      $scope.endTime = '';
    };

    $scope.editClip = function (index){
      $scope.clipName = $scope.clips[index].clipName;
      $scope.startTime = $scope.clips[index].timeStart;
      $scope.endTime = $scope.clips[index].timeEnd;
      $scope.clipIndex = index;
    };

    $scope.deleteClip = function (index){
      $scope.clips.splice(index, 1);
    };

    $scope.changeClip = function (index) {
      var video, sources;
      video = document.querySelector('video#videoChallenge');
      sources = video.getElementsByTagName('source');
      for (var i = sources.length - 1; i >= 0; i--) {
        sources[i].setAttribute(
            'src', (sources[i].getAttribute('data-original')
            .concat('#t=' + $scope.clips[index].time)));
            video.load();
            video.play();
      }
    };

    addDefaultClip();
  });
