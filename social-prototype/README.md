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

### Logout
Um sich auch wieder ausloggen zu können muss auf der Client Seite nur ein Button und JS-Code in das HTML-File eingefügt werden. Anschließend widmen wir uns den Änderungen auf der Server Seite.  
Spring Security hat bereits schon eine logout Funktion, die die Session und den Cookie bereinigt. Wir müssen nur den Code hier an die vorhandene Method __configure__ anfügen.  

    .and().logout().logoutSuccessUrl("/").permitAll()
    .and().csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
Dafür braucht man auch einen weiteres Package importen

    import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
Damit man mit dem CRSF Cookie am Client arbeiten kann, muss eine neue Dependency geadded, das index.html File um ein weiteres Script ergänzt und ajax Code hinzugefügt werden.  

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