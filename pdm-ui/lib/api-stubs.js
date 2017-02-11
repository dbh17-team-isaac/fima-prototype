/**
 * API prototype stubs.
 */
module.exports = {
    confirmRequest: function(identityId, requestId) {
        return {};
    },

    createRequest: function(askIdentityId, targetIdentityId, requestFields) {
        return {
            result: "success",
            requestId: 12345
        };
    },

    getAttributesForIdentity: function(identityId) {
        return {
            identityId: identityId,
            attributes: [
                {
                    field: {
                        UUID: "16a8053c-329e-41cb-ab9d-87c6f4ee2d6a",
                        type: "string",
                        caption: "Full name"
                    },
                    value: "Jan Jansen"
                },
                {
                    field: {
                        UUID: "7ff209a8-aa7e-45b0-9d0a-e5259ca73a4f",
                        type: "string",
                        caption: "Birth date"
                    },
                    value: "1987-06-28"
                },
                {
                    field: {
                        UUID: "4182654f-72f3-4f88-87da-f569e3fff13a",
                        type: "string",
                        caption: "Birth place"
                    },
                    value: "Utrecht"
                },
            ]
        };
    },

    getAuthorizationsForIdentity: function(identityId) {
        return {};
    },

    getRequestsForIdentity: function(identityId) {
        return {
            requests: [
                {
                    requestId: 12345,
                    askIdentity: {
                        identityId: 999,
                        description: "Jan Jansen"
                    },
                    requestFields: [
                        {
                            field: {
                                UUID: "7ff209a8-aa7e-45b0-9d0a-e5259ca73a4f",
                                type: "string",
                                caption: "Birth date"
                            },
                            required: true
                        }
                    ]
                }
            ]
        };
    }
};
