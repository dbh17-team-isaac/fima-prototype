// Stub state
var state = {};

const UC1_AUTH = 'UC-1-authorizationCreated';
const UC1_REQ = 'UC-1-requestCreated';
const UC1_REQ_ASK_IDENTITY = 'UC-1-requestAskIdentityID';
const UC1_REQ_TARGET_IDENTITY = 'UC-1-requestTargetIdentityID';

/**
 * API prototype stubs.
 */
module.exports = {
    confirmRequest: function(identityId, requestId) {
        state[UC1_AUTH] = true;
        return {
            result: "success",
            requestId: requestId
        };
    },

    createRequest: function(askIdentityId, targetIdentityId, requestFields) {
        state[UC1_REQ] = true;
        state[UC1_REQ_ASK_IDENTITY] = askIdentityId;
        state[UC1_REQ_TARGET_IDENTITY] = targetIdentityId;
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
                    value: "Sem Koster"
                },
                {
                    field: {
                        UUID: "d4c7198c-9f0d-458d-8848-5e82d95d7da0",
                        type: "string",
                        caption: "Phone number"
                    },
                    value: "+31 6 55 55 55 55"
                },
                {
                    field: {
                        UUID: "eff69bda-0232-49b5-bc71-4f35def322b4",
                        type: "string",
                        caption: "Email address"
                    },
                    value: "sem.koster@company.tld"
                },
                {
                    field: {
                        UUID: "7ff209a8-aa7e-45b0-9d0a-e5259ca73a4f",
                        type: "string",
                        caption: "Birth date"
                    },
                    value: "1986-12-11"
                },
                {
                    field: {
                        UUID: "4182654f-72f3-4f88-87da-f569e3fff13a",
                        type: "string",
                        caption: "Birth place"
                    },
                    value: "Maastricht"
                },
                {
                    field: {
                        UUID: "71bb1295-a7ea-4a6d-bd03-be30de7156e2",
                        type: "string",
                        caption: "Burgerservicenummer"
                    },
                    value: "081365382"
                },
                {
                    field: {
                        UUID: "8eafa313-cb33-422b-b10e-3b74f0127d63",
                        type: "string",
                        caption: "Level of education"
                    },
                    value: "VWO"
                },
                {
                    field: {
                        UUID: "d9b8a106-f79c-4261-b583-e9509fd87760",
                        type: "string",
                        caption: "Blood type"
                    },
                    value: "AB+"
                },
                {
                    field: {
                        UUID: "84af3cb1-4f9d-4cf5-a48b-3767d308ff8f",
                        type: "string",
                        caption: "Last measured blood pressure"
                    },
                    value: "110 / 75"
                },
            ]
        };
    },

    getAuthorizationsForIdentity: function(identityId) {
        if (!(UC1_AUTH in state)) {
            return {authorizations: []};
        }
        return {
            authorizations: [
                {
                    fromIdentity: {
                        identityId: 999,
                        description: "Sem Koster"
                    },
                    subsnapId: "2d64dab5-4e5f-46ec-8613-3b18c099a5e9",
                    attributes: [
                        {
                            field: {
                                UUID: "7ff209a8-aa7e-45b0-9d0a-e5259ca73a4f",
                                type: "string",
                                caption: "Birth date"
                            },
                            value: "1986-12-11"
                        }
                    ]
                }
            ]
        };
    },

    getFields: function() {
        return {
            fields: [
                {
                    UUID: "16a8053c-329e-41cb-ab9d-87c6f4ee2d6a",
                    type: "string",
                    caption: "Full name"
                },
                {
                    UUID: "d4c7198c-9f0d-458d-8848-5e82d95d7da0",
                    type: "string",
                    caption: "Phone number"
                },
                {
                    UUID: "eff69bda-0232-49b5-bc71-4f35def322b4",
                    type: "string",
                    caption: "Email address"
                },
                {
                    UUID: "7ff209a8-aa7e-45b0-9d0a-e5259ca73a4f",
                    type: "string",
                    caption: "Birth date"
                },
                {
                    UUID: "4182654f-72f3-4f88-87da-f569e3fff13a",
                    type: "string",
                    caption: "Birth place"
                },
                {
                    UUID: "71bb1295-a7ea-4a6d-bd03-be30de7156e2",
                    type: "string",
                    caption: "Burgerservicenummer"
                },
                {
                    UUID: "8eafa313-cb33-422b-b10e-3b74f0127d63",
                    type: "string",
                    caption: "Level of education"
                },
                {
                    UUID: "d9b8a106-f79c-4261-b583-e9509fd87760",
                    type: "string",
                    caption: "Blood type"
                },
                {
                    UUID: "84af3cb1-4f9d-4cf5-a48b-3767d308ff8f",
                    type: "string",
                    caption: "Last measured blood pressure"
                },
            ]
        };
    },

    getRequestById: function(requestId) {
        if (requestId == "12345") {
            return {
                requestId: 12345,
                askIdentity: {
                    identityId: state[UC1_REQ_ASK_IDENTITY],
                    description: "Sem Koster"
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
            };
        }
        return {};
    },

    getRequestsForIdentity: function(identityId) {
        if (!(UC1_REQ in state)) {
            return {requests: []};
        }
        return {
            requests: [
                module.exports.getRequestById(12345)
            ]
        };
    },

    reset: function() {
        state = {};
        return {
            result: "success"
        };
    }
};
