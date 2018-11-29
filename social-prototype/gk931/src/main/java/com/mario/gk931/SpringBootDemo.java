package com.mario.gk931;

import java.security.Principal;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@SpringBootApplication
@EnableOAuth2Sso
@RestController
public class SpringBootDemo extends WebSecurityConfigurerAdapter{

    @RequestMapping("/user")
    public Principal user(Principal principal) {
        return principal;
    }

    public static void main(String[] args) {
        SpringApplication.run(SpringBootDemo.class, args);
    }

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


}