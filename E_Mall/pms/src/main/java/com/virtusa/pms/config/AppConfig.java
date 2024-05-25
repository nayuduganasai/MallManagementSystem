package com.virtusa.pms.config;


import java.util.List;
import java.util.stream.Collectors;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.virtusa.pms.repository.UserRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


@Configuration

public class AppConfig  {
	@Autowired
	private UserRepository userRepo;

	@Autowired
	private HttpServletRequest httpRequest;
	@Bean
	public ModelMapper mp() {
		return new ModelMapper();
	}
	@Bean
	public UserDetailsService userDetailsService() {
	    return username -> {
	        com.virtusa.pms.model.User user = userRepo.findByUserName(username);
			HttpSession session = httpRequest.getSession();
			session.setAttribute("userId", user.getUserId());
			// int a=user.getReferralId();
			if(user.getReferralId()!=0) {
				session.setAttribute("refferalId", user.getReferralId());
				System.out.println("Ia m "+user.getReferralId());
			}
			else {
				session.setAttribute("refferalId", 0);

			}
 
	        List<GrantedAuthority> authoritie = user.getRoles()
	                .stream()
	                .map(role -> new SimpleGrantedAuthority(role.getName()))
	                .collect(Collectors.toList());
      System.out.println("hey"+authoritie);
	        return new User(user.getUserName(), passwordEncoder().encode(user.getPassword()), authoritie);
	    };
	}
//	 @Bean
//	    public UserDetailsService userDetailsService() {
//	        UserDetails userDetails = User.builder().
//	                username("DURGESH")
//	                .password(passwordEncoder().encode("DURGESH")).roles("ADMIN").
//	                build();
//	        return new InMemoryUserDetailsManager(userDetails);
//	    }
//	  
	    @Bean
	    public PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    }
	    


	    @Bean
	    public AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
	        return builder.getAuthenticationManager();
	    }





}
	    
