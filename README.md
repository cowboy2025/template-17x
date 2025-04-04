# HCS Angular PrimeNG Template
This project was generated with Angular CLI version 15.1.4.

## Node Package Manager 
Run the below command to install the node packages. 
    npm install
    
## Commit

Do not commit without running this command "npm run-script build".

## Development server
Run the below command for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.
    npm start

## Project Description
This project contains the HCS Header, Sidebar with Prime menus, FontAwesome Pro. 

## PrimeNG 
This project has Prime NG V15.1.0 installed. 

## Prime Icons

This Project is using V6.0.1 Prime Icons. 

## Sidebar Expand in Desktop view. 

collapse = new BehaviorSubject(false); 

 Make this to True for collapsed sidebar on load in "HCS shared data service.ts file".


## FontAwesome Pro 

    npm config set "@fortawesome:registry" https://npm.fontawesome.com/
    npm config set "//npm.fontawesome.com/:_authToken" <AuthToken>
    npm config set "registry" https://registry.npmjs.org/
    npm config set "strict-ssl" false
    
                          OR
    
    Since the FontAwesome pro was installed please create the '.npmrc' file and configure it as below. 
                registry=https://registry.npmjs.org/
                strict-ssl=false
                @fortawesome:registry=https://npm.fontawesome.com/
                //npm.fontawesome.com/:_authToken= <Token>


## FontAwesome Icons

    This project has @fortawesome/angular-fontawesome V0.10.0,
    @fortawesome/fontawesome-pro V5.12.1,
    @fortawesome/fontawesome-svg-core V1.2.12,
    @fortawesome/pro-light-svg-icons V5.14.0,
    @fortawesome/free-brands-svg-icons installed. 


## Prime Designer 
    Injected the 'hcs_themev13x.css' file as per HCS styling and fonts. 

## Prime Designer and Fontawesome pro Configuration. 
    To configure the prime designer 'hcs_theme_v15x.css' file please follow the below steps in Angular.json.
            "styles": [
              "src/styles.scss",
              "src/assets/hcs_theme_v13x.css", or  hcs_theme_v15x.css relative path
              "node_modules/primeicons/primeicons.css",
               "node_modules/primeng/resources/primeng.min.css",
               "node_modules/@fortawesome/fontawesome-pro/css/fontawesome.css"
            ]





