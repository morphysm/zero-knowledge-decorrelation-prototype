
/** 
  * Use OAuth2 to authenticate into a platform.
  * 
  * Currently just logs the event.
  * 
  * @param: event - TODO
  * @param: context - Lambda execution context. Not needed.
*/
exports.authenticate_platform_handler = async function(event, context) {
  console.log("Authenticate Platform Event: \n" + JSON.stringify(event, null, 2))
  return {statusCode: 200, body: context.logStreamName}
}
