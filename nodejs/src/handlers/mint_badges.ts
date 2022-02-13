
/** 
  * Mint badges for a user.
  * 
  * Currently just logs the event. In the future, import and call
  * smart contracts from the nodejs/lib/smart_contracts library.
  * 
  * @param: event - TODO
  * @param: context - Lambda execution context. Probably not needed.
*/
exports.handler =  async function(event, context) {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2))
  return context.logStreamName
}
