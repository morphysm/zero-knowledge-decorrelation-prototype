
/** 
  * List badges that a user is able to Mint on a given platform.
  * 
  * Currently just logs the event.
  * 
  * @param: event - TODO
  * @param: context - Lambda execution context. Not needed.
*/
exports.list_available_badges_handler = async function(event, context) {
  console.log("List Available Badges Event: \n" + JSON.stringify(event, null, 2))
  return {statusCode: 200, body: context.logStreamName}
}
