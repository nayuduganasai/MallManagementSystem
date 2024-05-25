package com.virtusa.pms.config;

import java.util.Collection;
import java.util.stream.Collectors;

import com.virtusa.pms.controller.BaseController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtusa.pms.dto.JwtRequest;
import com.virtusa.pms.dto.JwtResponse;
import com.virtusa.pms.security.JwtHelper;

@RestController
@RequestMapping("/auth")
//@CrossOrigin("http://localhost:3000")
public class AuthController{

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private AuthenticationManager manager;

	@Autowired
	private JwtHelper helper;

	@Autowired
	private HttpServletRequest httpRequest;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody JwtRequest request) {
		try {
			this.doAuthenticate(request.getUsername(), request.getPassword());

			UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());

			System.out.println("role " + userDetails.getAuthorities());
			String token = this.helper.generateToken(userDetails);

			Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();

			HttpSession session = httpRequest.getSession();
			Integer userId1 = (Integer) session.getAttribute("userId");
			System.out.println(userId1);

			Integer refId = (Integer) session.getAttribute("refferalId");
			System.out.println(refId);
			JwtResponse response = JwtResponse.builder().jwtToken(token).username(userDetails.getUsername()).userId(userId1).referralId(refId)
					.authorities(authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
					.build();
			System.out.println("--------------------------------------------------------------------------");
			System.out.println(response);
			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (BadCredentialsException e) {
			return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
		}
	}

	private void doAuthenticate(String email, String password) {

		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
		try {
			manager.authenticate(authentication);

		} catch (Exception e) {
			throw new BadCredentialsException(" Invalid Username or Password  !!");
		}

	}
}

//	@PostMapping("/login")
//	public ResponseEntity<?> login(@RequestBody JwtRequest request) {
//		try {
//			this.doAuthenticate(request.getUsername(), request.getPassword());
//
//			UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
//
//			String token = this.helper.generateToken(userDetails);
//
//			Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
//
//			// ... existing code
//
//			return new ResponseEntity<>(response, HttpStatus.OK);
//		} catch (BadCredentialsException e) {
//			return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
//		}
//	}
