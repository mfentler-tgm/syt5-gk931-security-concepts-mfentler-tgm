# GK 931 - Social Prototyp OAuth V2

## Voraussetzungen
- Java
- Maven oder Gradle

## Umsetzung
Hier wird beschrieben wie man ein OAuth V2 Projekt erstellt, in dem man sich mit Facebook verifizieren, einloggen und ausloggen kann.
Als erstes erstellt man ein neues Spring Initializr Projekt und added die Dependency Web. Folgende weitere Dependencies werden für die Umsetzung benötigt:  

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.security.oauth.boot</groupId>
            <artifactId>spring-security-oauth2-autoconfigure</artifactId>
            <version>2.1.0.RELEASE</version>
        </dependency>

        <dependency>
            <groupId>org.webjars</groupId>
            <artifactId>jquery</artifactId>
            <version>2.1.1</version>
        </dependency>
        <dependency>
            <groupId>org.webjars</groupId>
            <artifactId>bootstrap</artifactId>
            <version>3.2.0</version>
        </dependency>
        <dependency>
            <groupId>org.webjars</groupId>
            <artifactId>webjars-locator-core</artifactId>
        </dependency>
    </dependencies>

Der erste Schritt danach ist es ein index.html File im "static" Ordner anzulegen, welches die Homepage darstellen soll.

### Login
Um das Login zu realisieren muss als erster Schritt die Main Klasse diese Annotationen erhalten.  

    @EnableOAuth2Sso
    @RestController
Als nächstes wird das File "application.properties" in ein .yml File umgewandelt, damit man es besser lesen kann mit folgendem Inhalt für die Authentifizierung für Facebook.  

    security:
    oauth2:
        client:
        clientId: 355441765259442
        clientSecret: 8888bbc1089155c8f3f5544ac25fbe39
        accessTokenUri: https://graph.facebook.com/oauth/access_token
        userAuthorizationUri: https://www.facebook.com/dialog/oauth
        tokenName: oauth_token
        authenticationScheme: query
        clientAuthenticationScheme: form
        resource:
        userInfoUri: https://graph.facebook.com/me
Um dem User Content zu zeigen, der darauf angepasst ist ob er angemeldet ist oder nicht, werden zwei Container im html File erstellt. (div class="container unauthenticated"; "...authenticated")  

Weiters wird noch eine JavaScript Funktion eingefügt, die das managed.  

Der __Server__ wird zum REST Controller und bekommt einen Endpunkt für die Adresse /user.

    @RequestMapping("/user")
    public Principal user(Principal principal) {
        return principal;
    }
__Spring Security__ muss nun auch noch gesagt werden, dass der Endpunkt freigeschalten werden soll.  

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .antMatcher("/**")
                .authorizeRequests()
                .antMatchers("/", "/login**", "/webjars/**", "/error**")
                .permitAll()
                .anyRequest()
                .authenticated()
                //ergänzt für logout
                .and().logout().logoutSuccessUrl("/").permitAll()
                .and().csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());

    }
### Logout
Um sich auch wieder ausloggen zu können muss auf der Client Seite nur ein Button, der bei onClick die Funktion logout() aufruft, und JS-Code in das HTML-File eingefügt werden.  

    var logout = function() {
        $.post("/logout", function () {
            $("#user").html('');
            $(".unauthenticated").show();
            $(".authenticated").hide();
        })
        return true;
    }
Anschließend widmen wir uns den Änderungen auf der __Server Seite__.  
Spring Security hat bereits schon eine logout Funktion, die die Session und den Cookie bereinigt. Das bedeutet wir müssen uns darum auf der Server Seite nicht kümmern. Wir müssen nur den Code hier an die vorhandene Method __configure()__ anfügen.  

    .and().logout().logoutSuccessUrl("/").permitAll()
    .and().csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
Dafür muss man ein weiteres Package importen:

    import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
Damit man mit dem CRSF(Cross Site Request Forgery) Token am Client arbeiten kann, muss eine neue Dependency geadded, das index.html File um ein weiteres Script ergänzt und ajax Code hinzugefügt werden.  

    //pom.xml
    <dependency>
        <groupId>org.webjars</groupId>
        <artifactId>js-cookie</artifactId>
        <version>2.1.0</version>
    </dependency>

    //index.html
    <script type="text/javascript" src="/webjars/js-cookie/js.cookie.js"></script>

    //index.html
    $.ajaxSetup({
        beforeSend : function(xhr, settings) {
        if (settings.type == 'POST' || settings.type == 'PUT'
            || settings.type == 'DELETE') {
            if (!(/^http:.*/.test(settings.url) || /^https:.*/
                .test(settings.url))) {
            // Only send the token to relative URLs i.e. locally.
            xhr.setRequestHeader("X-XSRF-TOKEN",
                Cookies.get('XSRF-TOKEN'));
            }
        }
        }
    });
### Deploying
Deployed wird das ganze auf Heroku. Wie man eine Spring-Boot-Application auf Heroku pusht wird [hier](https://dzone.com/articles/spring-boot-heroku-and-cicd) nochmals beschrieben.  
Das einzige was man beachten muss, ist das Heroku standardmäßig vorraussetzt, dass die Applikation im Project-Root ist. Wenn sie in einem Subdir ist hilft folgender Befehl weiter:  

    git add .
    git commit -m "Commit msg"
    git subtree push --prefix pythonapp heroku master

Die Webseite ist nun über folgenden Link, der im Output vom push-Command ersichtlich ist, erreichbar:  
[https://polar-badlands-95072.herokuapp.com/](https://polar-badlands-95072.herokuapp.com/)

## Facebook-Application
Damit die Applikation sich mit Facebook authentifizieren kann muss man die App noch auf [developers.facebook.com](developers.facebook.com) erstellen.  
Dort fügt man das Produkt "Facebook-Login" mit folgenden Einstellungen hinzu.  

<center>
<kbd>

![FacebookEinstellungen1](images/FacebookLogin.png)  
</kdb>  
</center>  

Unter _"Einstellungen/Allgemeines"_ findet man die App-ID und das App-Secret, die man in das __application.yml__ File einfügt.  

## Ergebnis
Wenn man sich nun mit der Webseite verbindet, sieht man einen Link zum Einloggen mit Facebook. Wenn man darauf klick, öffnet sich Facebook, man muss angeben, dass man der Webseite vertraut und wird daraufhin wieder zurück geleitet.  
Dort wird man dann mit einer Willkommens-Nachricht und einem Logout Button empfangen.  

<center>
<kbd>

![Login](images/login.png)  
</kbd>
Unauthenticated

</center>  

<center>  
<kbd>

![Logout](images/logout.png)
</kbd>
Authenticated
</center>

## Quellen
[1] [https://docs.spring.io/spring-security/site/docs/4.2.6.RELEASE/apidocs/org/springframework/security/web/csrf/CookieCsrfTokenRepository.html](https://docs.spring.io/spring-security/site/docs/4.2.6.RELEASE/apidocs/org/springframework/security/web/csrf/CookieCsrfTokenRepository.html)  
[2] [https://spring.io/guides/tutorials/spring-boot-oauth2/](https://spring.io/guides/tutorials/spring-boot-oauth2/)