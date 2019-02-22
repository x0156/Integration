
// Tests for the sample REST APP - http://ec2-3-17-187-0.us-east-2.compute.amazonaws.com:3000/#/login 

describe('Smoke Suite for the Community Application', function() {

	beforeEach(function() {
	  browser.ignoreSynchronization = true;
	  browser.get('http://ec2-3-17-187-0.us-east-2.compute.amazonaws.com:3000/#/login'); 
	  browser.driver.manage().window().maximize();
	  browser.driver.sleep(3000);   
	});

	function LoginToApp(){	 
		 var usernamelInput = element(by.id('username'));
		 var passwordInput = element(by.id('password'));
		 var OkButton = element(by.buttonText('OK'));   
		  usernamelInput.clear();
		  usernamelInput.sendKeys('admin');
		  passwordInput.clear();
		  passwordInput.sendKeys('test123');
		  OkButton.click();
		  browser.driver.sleep(3000);
		  expect(browser.getTitle()).toEqual('REST EXAMPLE APP');    
		  //var signOutLink = element(by.xpath("//a[text()='Logout']"));
		  //signOutLink.click();
	}

  it('Test the SignUp Page with Elements', function() {  
	var signUpButton = element(by.css('.btn.btn-lg.btn-success.ng-binding'));
	signUpButton.click();
	browser.driver.sleep(3000);
	var signupUsernameInput = element(by.id('username'));
	 var sigupPasswordInput = element(by.id('password'));
	 var sigupPasswordInput = element(by.id('email'));
	 var sigupPasswordInput = element(by.id('name'));
	 var OkButton = element(by.css('.btn.btn-primary.btn-lg.ng-binding'));
	console.log('The SignUp page loaded successfully');  
  });


  it('Test the LOGIN Functionality', function() {  
	LoginToApp();
	var signOutLink = element(by.xpath("//a[text()='Logout']"));
	signOutLink.click();
	console.log('The User logged in successfully');
  });
  
  it('Test the Add Post Functionality', function() {
	var addButton = element(by.css('.btn.btn-success.btn-block.ng-binding'));
	var nameInput = element(by.name('title'));
	var contentInput = element(by.name('content'));
	var saveButton = element(by.css('.btn.btn-primary.btn-lg.ng-binding'));
	var today = new Date();
	LoginToApp();
	browser.driver.sleep(3000)
	addButton.click();
	nameInput.sendKeys('Post by Protractor script from Leap'+today.getHours()+today.getMilliseconds());
	contentInput.sendKeys('This is a sample content from protractor script for adding a test post...'+today);
	browser.driver.sleep(1000);
	saveButton.click();
	browser.driver.sleep(3000);
	console.log('The Post was added successfully');
	var signOutLink = element(by.xpath("//a[text()='Logout']"));
	signOutLink.click();
  });
  

});

