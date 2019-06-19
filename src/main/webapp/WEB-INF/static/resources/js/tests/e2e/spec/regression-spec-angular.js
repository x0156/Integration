
// Tests for the sample REST APP - http://10.120.101.126:3000/

describe('Regression Suite for the Community Application', function() {
	
	 beforeEach(function() {
		 	browser.ignoreSynchronization = true;
			browser.get('http://192.168.40.159:3000/#/login');	
            browser.driver.manage().window().maximize();
			browser.driver.sleep(3000);			
        });
	
	
	function UserLoginToApp(ID,PASSWORD){
		
		var usernamelInput = element(by.id('username'));
		var passwordInput = element(by.id('password'));http://192.168.40.159:3000/#/loginr OkButton = element(by.buttonText('OK'));			
			usernamelInput.clear();
			usernamelInput.sendKeys(ID);
			passwordInput.clear();
			passwordInput.sendKeys(PASSWORD);
			OkButton.click();
			browser.driver.sleep(3000);
			expect(browser.getTitle()).toEqual('REST EXAMPLE APP');				

	}	
	
  it('Testcase001 > Test the LOGIN Functionality', function() {
	  
	UserLoginToApp('admin','test123');
	browser.driver.sleep(3000);
	var signOutLink = element(by.xpath("//a[text()='Logout']"));
	signOutLink.click();
	console.log('The User logged in successfully');	
	
  });
  
    it('Testcase002 > Test the SignUp Functionality', function() {
	  
	var signUpButton = element(by.css('.btn.btn-lg.btn-success.ng-binding'));
	signUpButton.click();
	browser.driver.sleep(3000);
	var today = new Date();
	var user = 'leapuser'+today.getHours()+today.getMilliseconds()+today.getMinutes();
		var signupUsernameInput = element(by.name('username'));
		var sigupPasswordInput = element(by.id('password'));
		var sigupEmailInput = element(by.id('email'));
		var sigupNameInput = element(by.id('name'));
		var OkButton = element(by.css('.btn.btn-primary.btn-lg.ng-binding'));		
		signupUsernameInput.sendKeys(user);
		sigupPasswordInput.sendKeys('test1ng');
		sigupEmailInput.sendKeys(user+'@leap.com');
		sigupNameInput.sendKeys('LEAP Tester');
		browser.driver.sleep(3000);
		OkButton.click();
	browser.driver.sleep(3000);	
	console.log('The User ['+ user +'] registered successfully');	
/* 	UserLoginToApp(user,'test1ng');
	browser.driver.sleep(3000);	
	console.log('The user login post sign up was successfully');
	var signOutLink = element(by.xpath("//a[text()='Logout']"));
	signOutLink.click(); */
	
  });
  
 
});
