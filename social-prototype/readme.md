# Aufgabendurchführung

Verwendetes Tutorial:  
https://spring.io/guides/tutorials/spring-boot-oauth2/#_social_login_simple

## Durchgeführte Schritte:
- Clonen vom Repo
- Erstellen eines simplen Interfaces mit einem Login und Logout Link für Facebook.
      
      <h1>Login</h1>
      <div class="container unauthenticated">
          With Facebook: <a href="/login">click here</a>
      </div>
      <div class="container authenticated" style="display: none">
          Logged in as: <span id="user"></span>
          <div>
              <button onClick="logout()" class="btn btn-primary">Logout</button>
          </div>
      </div>
- Hinzufügen von den dazugehörigen JQuery Funktionen:

      <script type="text/javascript"
      src="/webjars/js-cookie/js.cookie.js"></script>
      <script type="text/javascript">
            $
                .ajaxSetup({
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
            $.get("/user", function(data) {
              $("#user").html(data.userAuthentication.details.name);
              $(".unauthenticated").hide();
              $(".authenticated").show();
            });
            var logout = function() {
              $.post("/logout", function() {
                $("#user").html('');
                $(".unauthenticated").show();
                $(".authenticated").hide();
              })
              return true;
            }
          </script>
- SpringBootApplication:
           
            @SpringBootApplication
            @EnableOAuth2Sso
            @RestController
            public class SocialApplication extends WebSecurityConfigurerAdapter {

                  @RequestMapping("/user")
                  public Principal user(Principal principal) {
                        return principal;
                  }

                  @Override
                  protected void configure(HttpSecurity http) throws Exception {
                        http.antMatcher("/**").authorizeRequests().antMatchers("/", "/login**", "/webjars/**",                                              "/error**").permitAll().anyRequest()
                                    .authenticated();
                  }

                  public static void main(String[] args) {
                        SpringApplication.run(SocialApplication.class, args);
                  }

                  }
- Mit Maven runnen

          mvn spring-boot:run
## Testen
Die Applikation kann mit cypress.io getestet werden.  
