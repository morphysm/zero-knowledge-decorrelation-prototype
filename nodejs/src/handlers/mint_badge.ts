
/** 
  * Mint a badge for a user.
  * 
  * Currently just logs the event. In the future, import and call
  * smart contracts from the nodejs/lib/smart_contracts library.
  * 
  * @param: event - TODO
  * @param: context - Lambda execution context. Not needed.
*/
exports.mint_badge_handler =  async function(event, context) {
  console.log("Mint Badge Handler Event: \n" + JSON.stringify(event, null, 2))
  return {statusCode: 200, body: context.logStreamName}
}
