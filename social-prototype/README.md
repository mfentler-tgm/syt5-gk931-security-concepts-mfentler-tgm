# GK 931 - Social Prototyp OAuth V2

## Voraussetzungen
- Java
- Maven oder Gradle

## Umsetzung
Um ein einfaches OAuth V2 Projekt zu erstellen, in dem man sich mit Facebook verifiziert und einloggt geht in wenigen Schritten, die hier beschrieben werden.  

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

Der erste Schritt danach ist es ein index.html File anzulegen, welches die Homepage darstellen soll.