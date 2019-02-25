
// Tests for the sample REST APP - http://ec2-3-17-187-0.us-east-2.compute.amazonaws.com:3000/

describe('Smoke Suite for the Community Application', function() {
	
	 beforeEach(function() {
		 	browser.ignoreSynchronization = true;
			browser.get('http://ec2-3-17-187-0.us-east-2.compute.amazonaws.com:3000/#/login');	
            browser.driver.manage().window().maximize();
			browser.driver.sleep(3000);			
        });
	
	
	function LoginToApp(ID,PASSWORD){
		
		var usernamelInput = element(by.id('username'));
		var passwordInput = element(by.id('password'));
		var OkButton = element(by.buttonText('OK'));			
			usernamelInput.clear();
			usernamelInput.sendKeys(ID);
			passwordInput.clear();
			passwordInput.sendKeys(PASSWORD);
			OkButton.click();
			browser.driver.sleep(3000);
			expect(browser.getTitle()).toEqual('REST EXAMPLE APP');				
			//var signOutLink = element(by.xpath("//a[text()='Logout']"));
			//signOutLink.click();
	}	
	
  it('Testcase001 > Test the LOGIN Functionality', function() {
	  
	LoginToApp('admin','test123');
	browser.driver.sleep(3000);
	var signOutLink = element(by.xpath("//a[text()='Logout']"));
	signOutLink.click();
	console.log('The User logged in successfully');	
	
  });
  
/*   it('Testcase002 > Test the SignUp Functionality', function() {
	  
		var signUpButton = element(by.css('.btn.btn-lg.btn-success.ng-binding'));
	signUpButton.click();
	browser.driver.sleep(3000);
	var today = new Date();
	var user = 'leapuser'+today.getHours()+today.getMilliseconds()+today.getMinutes();
		var signupUsernameInput = element(by.id('username'));
		var sigupPasswordInput = element(by.id('password'));
		var sigupEmailInput = element(by.id('email'));
		var sigupNameInput = element(by.id('name'));
		var OkButton = element(by.css('.btn.btn-primary.btn-lg.ng-binding'));		
		signupUsernameInput.sendKeys(user);
		sigupPasswordInput.sendKeys('test1ng');
		sigupEmailInput.sendKeys(user+'@leap.com');
		sigupNameInput.sendKeys('LEAP Tester');
		OkButton.click();
	browser.driver.sleep(3000);	
	console.log('The User ['+ user +'] registered successfully');	
	LoginToApp(user,'test1ng');
	browser.driver.sleep(3000);	
	console.log('The user login post sign up was successfully');
	var signOutLink = element(by.xpath("//a[text()='Logout']"));
	   console.log('--signout present'+signOutLink.isPresent());
	expect(signOutLink.isPresent()).toEqual(true);
	   
	signOutLink.click();
	
  });   */
  
  it('Testcase003 > Test the Add Post Page with Elements', function() {
	
	var addButton = element(by.css('.btn.btn-success.btn-block.ng-binding'));
	var nameInput = element(by.name('title'));
	var contentInput = element(by.name('content'));
	var saveButton = element(by.css('.btn.btn-primary.btn-lg.ng-binding'));
	var today = new Date();
	LoginToApp('admin','test123');
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
