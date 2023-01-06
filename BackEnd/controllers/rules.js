import {streams} from "./streams.js";

export const getRules = async (accountId) => {
    return await streams[accountId]["client"].v2.streamRules();
}

export const addRule = async (accountId, rule) => {
    const ruleToSend = {add : [JSON.parse(rule)]};
    const addRule = await streams[accountId]["client"].v2.updateStreamRules(ruleToSend);
}

export const deleteRule = async (accountId, ruleId) => {
    const deleteMessage = {delete : {ids : [ruleId]}}
    const deleteRule = await streams[accountId]["client"].v2.updateStreamRules(deleteMessage);
}