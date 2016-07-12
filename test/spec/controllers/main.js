'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('challenge2App'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    // document.body.insertAdjacentHTML(
    //   'afterbegin',
    //   '<video id="videoChallenge" controls preload="metadata"><source data-original=""></video>');
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should start with at least one button', function () {
    expect(scope.clips.length).toBe(1);
  });

  it('should add a clip to the list', function () {
    scope.clipName = 'Test clip';
    scope.startTime = 2;
    scope.endTime = 4;
    scope.clipIndex = 0;
    scope.upsertClip();
    expect(scope.clips[scope.clips.length - 1].clipName).toBe(scope.clipName);
    expect(scope.clips[scope.clips.length - 1].timeStart).toBe(scope.startTime);
    expect(scope.clips[scope.clips.length - 1].timeEnd).toBe(scope.endTime);
    expect(scope.clips[scope.clips.length - 1].time).toBe('2,4');
  });

  it('should edit a clip to the list', function () {
    var clip ={
      clipName : 'Test clip 1',
      timeStart : 23,
      timeEnd : 25,
      time : '23,25'
    };
    scope.clips.push(clip);
    var clip ={
      clipName : 'Test clip 2',
      timeStart : 30,
      timeEnd : 33,
      time : '30,33'
    };
    scope.clips.push(clip);
    scope.clipName = 'Test clip 1 edited';
    scope.startTime = 20;
    scope.endTime = 29;
    scope.clipIndex = 1;

    scope.upsertClip();
    expect(scope.clips.length).toBe(3);
    expect(scope.clips[1].clipName).toBe('Test clip 1 edited');
  });

  it('should delete a clip to the list', function () {
    var clip ={
      clipName : 'Test clip 1',
      timeStart : 23,
      timeEnd : 25,
      time : '23,25'
    };
    scope.clips.push(clip);
    var clip ={
      clipName : 'Test clip 2',
      timeStart : 30,
      timeEnd : 33,
      time : '30,33'
    };
    scope.clips.push(clip);

    scope.deleteClip(1);
    expect(scope.clips.length).toBe(2);
    expect(scope.clips[1].clipName).toBe('Test clip 2');
  });

  it('should change the start time of the video', function () {
    var videoElement = document.createElement('video');
    videoElement.load = function(){};
    videoElement.play = function(){};
    var sourceElement = document.createElement('source');
    sourceElement.setAttribute('data-original', '');
    videoElement.appendChild(sourceElement);

    document.querySelector = jasmine.createSpy('object HTMLVideoElement').and.returnValue(videoElement);

    var clip ={
      clipName : 'Test clip',
      timeStart : 23,
      timeEnd : 25,
      time : '23,25'
    };
    scope.clips.push(clip);
    scope.changeClip(1);

    var video, sources;
    video = document.querySelector('video#videoChallenge');
    sources = video.getElementsByTagName('source');

    expect(sources[0].getAttribute('src')).toBe('#t=23,25');
  });
});
