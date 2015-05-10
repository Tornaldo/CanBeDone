angular.module('cbdCommon').
factory('ideaService', ['baseService', 'config', '$q',
function (baseService, config, $q) {

    return {
        getPopularIdeas: function(category) {
        //wrong url. need api endpoint.
        var url = config.apiBaseUrl + 'ideas?page=1&pageSize=15';
        return baseService.getResources(url);
        },

        getSearchResult: function(searchQuery, categoryPreference, page, pageSize) {
        //wrong url. Need api endpoint.
        var url = config.apiBaseUrl + 'ideas?'+'page='+page+'&pageSize='+ pageSize;
        if(categoryPreference) {
            url += '&categoryId='+categoryPreference;
        }
         if(searchQuery) {
            url += '&query='+searchQuery;
        }
        return baseService.getResources(url);
        },

        getIdea:  function (id) {
        var url = config.apiBaseUrl + 'ideas/' + id;
        return baseService.getResources(url);
        },

        postIdea: function (idea) {
            console.log('post ' + idea);
            //TODO: WHERE TO PLACE
            //Need to convert array into a string, because of backend
            idea.categoryIds = idea.categoryIds.toString();
            var url = config.apiBaseUrl + 'ideas';
            console.log(idea)
            return baseService.postResource(url, idea);
        },


        editIdea: function (idea) {
            console.log('edit: '+ idea);
            var url = config.apiBaseUrl + 'ideas/' + 'editideas';
            return baseService.postResource(url, idea);
        },

        getParentComment: function (id) {
            var url = config.apiBaseUrl + 'comments?ideaId='+ id + '&includeAllAnswers=1';
            return baseService.getResources(url);
        },

        getChildComment: function(id) {
            var url = config.apiBaseUrl + 'comments/' + id;
            return baseService.getResources(url);
        },
        postComment: function (comment) {
            console.log("test: " + comment);
            var url = config.apiBaseUrl + 'comments';
            return baseService.postResource(url, comment);
        },           
        
        postFaq: function(ideaId, faq) {
            var url = config.apiBaseUrl + 'ideas/faqs';
            
            //Each faq question has to be sent as its own request. Api limitation.
            //All promises gather up and the super promise will resolve when all
            //requests has been resolved.
            var promises = [];
            for(var i = 0; i<faq.length; i++) {
                var faqPackage = {'ideaId': ideaId, 'question': faq[i].question, 'answer': faq[i].answer };
                promises.push(baseService.postResource(url, faqPackage));
            }
            return $q.all(promises);
        },

    };

    /*

    this.getRelatedIdeas = function (id) {
        //TEMP
        var url = 'api/ideas';
        return $http.get(url);
    };

    
    }*/


}]);