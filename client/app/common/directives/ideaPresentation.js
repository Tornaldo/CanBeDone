  angular.module('cbdCommon')
.directive('ideaViewer', [ function() {
  return {
    restrict: 'AE',

    scope: {
      'size': '=size',
      'ideas': '=ideaModel'
    },

  template:
  '<carousel class = "carousel-container" interval="myInterval" >' +
    '<slide ng-repeat="slide in slides" active="slide.active" >' +
      '<div class="carousel-inner carouselin-thumb">' +
        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 col-3-thumb-modified clearfix" ng-repeat="idea in slide" >' +
          '<ng-include src="template" ></ng-include>' +
        '</div>'+
      '</div>' +
    '</slide>'+
  '</carousel>',

  controller: ['$scope',function($scope) {
    $scope.template = '/common/partials/ideaThumb.tpl.html';
    $scope.ideas;
    $scope.slides;


    //front end parser. Parse ideas json string into slides for carousel of size defined by $scope.size
    $scope.parseIdeasToSlides = function(ideas) {
      var slides = [];

      var slideLength = Math.ceil(ideas.length/$scope.size)
      for(var i = 0; i<slideLength; i++) {

        var slide = [];
        for(var j = i*$scope.size; j< ((i*$scope.size) + $scope.size) && j<ideas.length; j++) {
          slide.push(ideas[j]);
        }
        slides.push(slide);
      }
      $scope.slides = slides;
    };

  }],

  link: function(scope, elem, attrs) {
    scope.$watch('ideas', function(newValue, oldValue) {
      if (newValue) {
        scope.parseIdeasToSlides(newValue);
      }
    });
  }
};
}]);

angular.module('cbdCommon')
.directive('ppcommentViewer', [ function() {   //pcommentViwer --   Post Parent Comment Viewer (place holder to add new comment to idea)
  return {
    restrict: 'AE',

    scope: {
      'idea': '=ideaModel',
      'parentComment': '=commentModel',
    },

    template: 
        '<div class="panel panel-default panel-comment col-lg-12">'+
          '<div class="panel-footer clearfix">'+
              '<div class="img-placeholder-container" ng-class="{inputplaceholderselected: isPlaceHolderHidden }" >'+
                  '<div class="col-lg-2 img-container">'+
                      '<img class="" src="img/avatar.png" alt="Image"/>'+
                  '</div>'+
                  '<div class="col-lg-10 placeholder-container pull-left">'+
                      '<div class="input-placeholder" ng-click="toggleParentCommet()">Add a comment...</div>'+
                  '</div>'+
              '</div>'+
          
              '<div class="comment-text-area-container-hidden" ng-class="{commenttextareacontainervisible: isParentTextAreaVisible }" >'+                  
                    '<div class="row img-placeholder-container img-placeholder-container-hidden">'+
                      '<div class="col-lg-2 img-container">'+
                          '<img class="" src="img/avatar.png" alt="Image" />'+
                      '</div>'+
                      '<div class="textarea-container col-lg-10 pull-left">'+
                          '<textarea name="comment" rows="3" column="8" ng-keyup="enableCommentButton()" ng-model="commentText"></textarea>   '+
                      '</div>'+
                    '</div>'+
                    '<div class="row">'+                      
                      '<div class="post-cancel pull-right">'+
                          '<button type="submit" class="btn btn-success btn-sm" ng-class="{disabled:!isParentCommentButtonDisabled}" ng-click="postParentComment()">Post Comment</button>'+
                          '<span>&nbsp;</span>'+
                          '<button type="reset" class="btn btn-default btn-sm" ng-click="parentCommentClose()">Cancel</button>'+
                      '</div>'+   
                    '</div>'+                                                         
              '</div>'+           
          '</div>'+
        '</div>'+
        '<br><br><br>',


    controller: ['$scope','ideaService', 'notification', function($scope,ideaService,notification) {
      //$scope.template = '/common/partials/parentComment.tpl.html';
      //$scope.parentComments = "something writeen here";
      $scope.commentText;
      $scope.ideaComment;
      $scope.comment={
        text:'',
        ideaId:''
      };
      $scope.toggleParentCommet = function(){
        $scope.isPlaceHolderHidden = true;
        $scope.isParentTextAreaVisible=true;
      }    

      $scope.parentCommentClose = function() {        
       $scope.isPlaceHolderHidden = false;
       $scope.isParentTextAreaVisible=false;
       $scope.commentText = '';
      }     

  
      $scope.enableCommentButton = function(){
        $scope.isParentCommentButtonDisabled = true;
        if($scope.commentText == '') {
          $scope.isParentCommentButtonDisabled = false;
        }

     }

     $scope.postParentComment = function(){ 
        $scope.isPlaceHolderHidden = false;
        $scope.isParentTextAreaVisible=false;        
        $scope.comment.text = $scope.commentText;
        $scope.comment.ideaId = $scope.idea.id;
        ideaService.postComment($scope.comment)
          .then(function(data) {          

              ideaService.getParentComment($scope.idea.id).then(function(response){
                  $scope.parentComment = response;       
              });

              notification.success("Comment posted");
          }, function(error) {
              notification.error("Could not post comment" + error);
          });
        $scope.commentText = '';
     }

    }], 

    link: function(scope, elem, attrs){

    }
  };
}]);


angular.module('cbdCommon')
.directive('pcommentViewer', [ function() {   //pcommentViwer --   Parent Comment Viewer (parent and child comment viewer)
  return {
    restrict: 'AE',

    scope: {
      'parentComment': '=commentModel'
    },

    template: 

        '<div class="panel panel-default panel-comment col-lg-12">'+
          '<div class="panel-footer">'+
              '<div class="row img-placeholder-container">'+            
                  '<div class="col-lg-2 img-container">'+
                      '<img class="" src="img/avatar.png" alt=" Image" />'+
                  '</div>'+
                  '<div class="col-lg-10 placeholder-container pull-left">'+
                      '<p class="comment-user-name">'+
                          '<span class="highlight"> <a href=""> <b>Zekarias</b> </a></span>'+
                          '<time datetime= "{{ parentComment.created| date:\'dd-M-yyyy H:mm\' }}">'+
                          '{{ parentComment.created | date:\'medium\'  }} </time>'+
                      '</p>'+
                      '<p class="comment-user-text">{{ parentComment.text }}</p>'+
                  '</div>'+   
              '</div>'+
              '<div class="row img-reply-like-dislike-container">'+
                  '<div class="col-lg-2 img-container"></div>'+
                  '<div class="col-lg-10 reply-like-dislike-container pull-left">'+
                        '<div class="col-lg-2 reply-link-container pull-left">'+
                            '<a class="replylink" ng-click="Reply()">reply</a>'+
                        '</div>'+                      
                        '<div class="col-lg-3 like-dislike-container pull-left">'+
                          '<div class="col-lg-6 like-container pull-left">'+
                              '<p><i class="fa fa-thumbs-o-up"></i></p>'+
                          '</div>'+
                          '<div class="col-lg-6 dislike-container pull-left">'+
                              '<p><i class="fa fa-thumbs-o-down"></i></p>'+
                          '</div>'+
                        '</div>'+
                  '</div>'+                
              '</div>'+
          '</div>'+
          '<div class="panel-footer" ng-repeat="reply in parentComment.replies">'+
              '<div class="row child-comment-container">'+
                '<div class="col-lg-2 img-container"></div>'+
                '<div class="col-lg-10">'+                          
                    '<div class="col-lg-2 img-container img-container-child">'+
                        '<img class="" src="img/avatar.png" alt=" Image" />'+
                    '</div>'+
                    '<div class="placeholder-container placeholder-container-child col-lg-10 pull-left ">'+
                        '<p class="comment-user-name"> <span class="highlight"> <a href=""> <b>Zekarias</b> </a></span></p>'+
                        '<p class="comment-user-text"> {{ reply.text}} </p>'+                                          
                    '</div>'+
                '</div>'+
              '</div>'+
              '<div class="row">'+
                  '<div class="col-lg-2 img-container"></div>'+
                  '<div class="col-lg-10 reply-like-dislike-container pull-left">'+
                    '<div class="col-lg-2 reply-link-container pull-left"></div>'+
                    '<div class="reply-like-dislike">'+                        
                        '<div class="col-lg-2 reply-link-container reply-link-container-child pull-left">'+
                            '<a class="replylink" ng-click="Reply()">reply</a>'+
                        '</div>'+                      
                        '<div class="col-lg-3 like-dislike-container pull-left">'+
                          '<div class="col-lg-6 like-container pull-left">'+
                              '<p><i class="fa fa-thumbs-o-up"></i></p>'+
                          '</div>'+
                          '<div class="col-lg-6 dislike-container pull-left">'+
                              '<p><i class="fa fa-thumbs-o-down"></i></p>'+
                          '</div>'+
                        '</div>'+
                    '</div>'+                      
                  '</div>'+
              '</div>'+              
          '</div>'+ 
          '<div class="panel-footer comment-text-area-container-hidden clearfix" ng-class="{commentreplytextareacontainer: isReplyTextAreaVisible }" >'+                  
              '<div class="row child-comment-container">'+
                '<div class="col-lg-2 img-container"></div>'+
                '<div class="col-lg-10">'+
                  '<div class="col-lg-2 img-container img-container-child">'+
                      '<img class="" src="img/avatar.png" alt="Image" />'+
                  '</div>'+
                  '<div class="placeholder-container placeholder-container-child col-lg-10 pull-left">'+
                      '<textarea name="comment" rows="3" column="8" ng-keyup="enableCommentButton()" ng-model="childCommenText"></textarea>   '+
                  '</div>'+
                  '<br><br>'+
                '</div>'+
              '</div>'+
              '<div class="row">'+
                  '<div class="post-cancel post-cancel-child pull-right">'+
                    '<button type="submit" class="btn btn-success" ng-class="{disabled:!isParentCommentButtonDisabled}" ng-click="postChildComment()">Post Comment</button>'+
                    '<span>&nbsp;</span>'+
                    '<button type="reset" class="btn btn-default" ng-click="CommentAreaClose()">Cancel</button>'+
                  '</div>'+
              '</div>'+            
          '</div>'+                                        
        '</div>',



    controller: ['$scope', 'ideaService', 'notification', function($scope, ideaService, notification) {
      
      $scope.comment={
        text:'',  
        parentId:''
      };

      $scope.parentComment;


      $scope.Reply = function (){
        $scope.isReplyTextAreaVisible = true;
        $scope.childCommenText = "Zekarias";
      }

      $scope.CommentAreaClose = function() {        
       $scope.isReplyTextAreaVisible=false;
       $scope.childCommenText ='';
      }     

      $scope.enableCommentButton = function(){
        $scope.isParentCommentButtonDisabled = true;
        if($scope.childCommenText == '') {
          $scope.isParentCommentButtonDisabled = false;
        }
     }

     $scope.postChildComment = function(){ 
        $scope.isReplyTextAreaVisible=false;       
        $scope.comment.text = $scope.childCommenText;
        $scope.comment.parentId =  $scope.parentComment.id;

        ideaService.postComment($scope.comment)
          .then(function(data) {          
              ideaService.getChildComment($scope.comment.parentId).then(function(response){
                  $scope.parentComment.replies = response.replies;
              });
              notification.success("Reply posted");
          }, function(error) {
              notification.error("Could not reply comment" + error);
          });
        $scope.childCommenText = '';          
     }     

    }], 

    link: function(scope, elem, attrs){

    }
  };
}]);


angular.module('cbdCommon')
.directive('leftsideNavigation', [ function() {
return {
    restrict: 'AE',

    scope: {
      
    },

    template: 
        '<div class="side-nav-left">'+
            '<ul class="nav navbar-nav  idea-profile-navigator-box">'+
                '<li class="side-nav-top">'+
                    '<a href="#"><i class="fa fa-star-o"></i>&nbsp;Recommended for you</a>'+
                '</li>'+
                '<li class="side-nav-top">'+
                    '<a href="#"><i class="fa fa-fire"></i>&nbsp;Popular ideas</a>'+
                '</li>'+
                '<li class="side-nav-top">'+
                    '<a href="#"><i class="fa fa-bullseye"></i>&nbsp;Ideas from your area</a>'+
                '</li>'+
                '<li class="side-nav-top">'+
                    '<a href="#"><i class="fa fa-flag"></i>&nbsp;Ideas from your country</a>'+
                '</li>'+
                '<li class="side-nav-top">'+
                    '<a href="#"><i class="fa fa-clock-o"></i>&nbsp;New ideas</a>'+
                '</li>'+
            '</ul>'+

            '<ul class="nav navbar-nav navbar-nav-categories-popular">'+
                '<li class="side-nav-categories-popular-main">'+
                    '<a href="#"><b>CATEGORIES</b></a>'+
                '</li>'+

                '<li class="side-nav-categories-popular">'+
                    '<a href="#">Culture</a>'+
                '</li>'+

                '<li class="side-nav-categories-popular">'+
                    '<a href="#">Global issues</a>'+
                '</li>'+

                '<li class="side-nav-categories-popular">'+
                    '<a href="#">Environment</a>'+
                '</li>'+

                '<li class="side-nav-categories-popular">'+
                    '<a href="#">Humorous</a>'+
                '</li>'+

                '<li class="side-nav-categories-popular">'+
                    '<a href="#">Web</a>'+
                '</li>'+


                '<li class="side-nav-categories-popular">'+
                    '<a href="#">Entertainment</a>'+
                '</li>'+

                '<li class="side-nav-categories-popular">'+
                    '<a href="#">Academia</a>'+
                '</li>'+
                '<li class="dropdown side-nav-categories-popular">'+
                    '<a href="#" class="dropdown-toggle" data-toggle="dropdown">more <b class="caret"></b></a>'+
                    '<ul class="dropdown-menu">'+
                        '<li>'+
                            '<a href="#" class="list-group-item">Education</a>'+
                        '</li>'+
                        '<li>'+
                            '<a href="#">Another Item</a>'+
                        '</li>'+
                        '<li>'+
                            '<a href="#">Third Item</a>'+
                        '</li>'+
                        '<li>'+
                            '<a href="#">Last Item</a>'+
                        '</li>'+
                    '</ul>'+
                '</li>'+
            '</ul>'+
            '<ul class="nav navbar-nav navbar-nav-categories-popular">'+
                '<li class="side-nav-categories-popular-main">'+
                    '<a href="#"><b>POPULAR</b></a>'+
                '</li>'+
                '<li class="side-nav-categories-popular">'+
                    '<a href="#">Global issues</a>'+
                '</li>'+

                '<li class="side-nav-categories-popular">'+
                    '<a href="#">Environment</a>'+
                '</li>'+

                '<li class="side-nav-categories-popular">'+
                    '<a href="#">Humorous</a>'+
                '</li>'+

                '<li class="side-nav-categories-popular">'+
                    '<a href="#">Web</a>'+
                '</li>'+
            '</ul>'+
        '</div>',



    controller: ['$scope', function($scope) {
      
  

    }], 

    link: function(scope, elem, attrs){

    }  
  };
}])

.filter('cut', function () {
  return function (value, wordwise, max, tail) {
      if (!value) return '';

      max = parseInt(max, 10);
      if (!max) return value;
      if (value.length <= max) return value;

      value = value.substr(0, max);
      if (wordwise) {
          var lastspace = value.lastIndexOf(' ');
          if (lastspace != -1) {
              value = value.substr(0, lastspace);
          }
      }

      return value + (tail || ' …');
  };
});
