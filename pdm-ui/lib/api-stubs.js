/**
 * API prototype stubs.
 */
module.exports = {
    confirmRequest: function(identityId, requestId) {
        return {};
    },

    createRequest: function(askIdentityId, targetIdentityId, requestFields) {
        return {};
    },

    getAttributesForIdentity: function(identityId) {
        return {};
    },

    getAuthorizationsForIdentity: function(identityId) {
        return {};
    },

    getRequestsForIdentity: function(identityId) {
        return {};
    }
};
