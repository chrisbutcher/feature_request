'use strict';
angular.module('Tx.Services')
    .factory('DashboardService', function (ServiceConfig, $http, $q, $rootScope, Helper) {
        return {
            getMyRecentlyCreatedDrafts: getMyRecentlyCreatedDrafts,
            getTeamRecentlyCreatedOrModifiedDrafts: getTeamRecentlyCreatedOrModifiedDrafts,
            getDrafts: getDrafts
        };

        function getMyRecentlyCreatedDrafts() {
            var currentUserName;
            return getCurrentUser()
                .then(function(userName) {
                    currentUserName = userName;
                    return getDrafts();
                }).then(function(drafts) {
                    drafts.sort(function(a,b){
                        return a.modifiedOn.localeCompare(b.modifiedOn);
                    });
                    var results = [];
                    for (var i=drafts.length-1;i>-1;i--) {
                        if (drafts[i].createdBy == currentUserName)
                            results.push(drafts[i]);
                    }
                    return results;
                });
        }

        function getTeamRecentlyCreatedOrModifiedDrafts() {
            return getDrafts().then(function(drafts) {
                    drafts.sort(function(a,b){
                        return a.modifiedOn.localeCompare(b.modifiedOn);
                    });
                    var results = [];
                    for (var i=drafts.length-1; i>-1;i--) {
                            results.push(drafts[i]);
                    }
                    return results;
                });
        }

        function getDrafts(status) {
            var organizationParam = "?$select=Id,Title";
            return $http.get(ServiceConfig.rootUrl + "/_api/lists/getbytitle('Organizations')/items" + organizationParam)
                .then(function(organizationResults){
                    var draftParam =
                        "?$select=Id,Title,Author/Title,Created,TxFieldDraftStatus,TxFieldIsArchived,File/ModifiedBy,File/TimeLastModified,ContentTypeId,TxFieldOrderSetId,TxFieldOrganizationId," +
                            "TxFieldOrderSet/TxFieldDocumentTitle,TxFieldLocalization" +
                            "&$expand=Author/Title,File/ModifiedBy,File/TimeCreated,TxFieldOrderSet/TxFieldDocumentTitle" +
                            "&$filter=(TxFieldIsArchived ne 1) and startswith(ContentTypeId,'0x01010045946FCF45D240C6954D86F0F6F5C3890069C6BC7E2F9844D9AEBFC614401BE18A')";
                    if (status)
                        draftParam +=  encodeURIComponent("and (TxFieldDraftStatus eq '" + status + "')");
                    return $http.get(ServiceConfig.rootUrl + "/" + ServiceConfig.webName + "/" + "_api/lists/DraftDocuments/items" + draftParam)
                        .then(function (draftsResult) {
                            var drafts = [];
                            for (var i=0;i<draftsResult.data.d.results.length;i++) {
                                var draftResult = draftsResult.data.d.results[i];
                                var organization = Helper.findObjectById(draftResult.TxFieldOrganizationId,organizationResults.data.d.results);
                                drafts.push({
                                    id: draftResult.Id,
                                    title: draftResult.TxFieldOrderSet.TxFieldDocumentTitle,
                                    organization: organization ? organization.Title : "",
                                    localization: draftResult.TxFieldLocalization,
                                    modifiedBy: draftResult.File.ModifiedBy.Title,
                                    modifiedOn: draftResult.File.TimeLastModified,
                                    orderSetId: draftResult.TxFieldOrderSetId,
                                    createdBy: draftResult.Author.Title,
                                    createdOn: draftResult.Created
                                });
                            }
                            return drafts;
                        });
           });
        }

        function getCurrentUser() {
            return $http.get(ServiceConfig.rootUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties")
                .then(function(result){
                    for (var i=0;i<result.data.d.UserProfileProperties.results.length;i++) {
                        if (result.data.d.UserProfileProperties.results[i].Key == "UserName")
                            return  result.data.d.UserProfileProperties.results[i].Value;
                    }
                    return result.data.d.DisplayName;
                });
        }
    });


