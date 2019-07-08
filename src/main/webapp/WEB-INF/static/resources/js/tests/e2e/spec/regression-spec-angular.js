// Tests for the sample REST APP - http://10.120.101.126:3000/

describe('Regression Suite for the Community Application', function() {
	
	 beforeEach(function() {
		 	browser.ignoreSynchronization = true;
			browser.get('http://ec2-18-188-132-250.us-east-2.compute.amazonaws.com:3000/#/login');	
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
			//expect(browser.getTitle()).toEqual('REST EXAMPLE APP');				
			//var signOutLink = element(by.xpath("//a[text()='Logout']"));
			//signOutLink.click();
	}
	
  it('Test the SignUp Page with Elements', function() {
	  
	browser.driver.sleep(3000);
	var signUpButton = element(by.css('.btn.btn-lg.btn-success.ng-binding'));	
	signUpButton.click();
	browser.driver.sleep(3000);
		var signupUsernameInput = element(by.id('username'));
		var sigupPasswordInput = element(by.id('password'));
		var sigupEmailInput = element(by.id('email'));
		var sigupNameInput = element(by.id('name'));
		var OkButton = element(by.css('.btn.btn-primary.btn-lg.ng-binding'));
		
		expect(signupUsernameInput.isPresent()).toEqual(true);
		expect(sigupPasswordInput.isPresent()).toEqual(true);
		expect(sigupEmailInput.isPresent()).toEqual(true);
		expect(sigupNameInput.isPresent()).toEqual(true);
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
	LoginToApp();
	browser.driver.sleep(3000);
	expect(addButton.isPresent()).toEqual(true);
	addButton.click();
	expect(nameInput.isPresent()).toEqual(true);
	expect(contentInput.isPresent()).toEqual(true);
	expect(saveButton.isPresent()).toEqual(true);
	console.log('The Add Post page was available with the web elements successfully');
	var signOutLink = element(by.xpath("//a[text()='Logout']"));
	signOutLink.click();
  });
  
 
});
