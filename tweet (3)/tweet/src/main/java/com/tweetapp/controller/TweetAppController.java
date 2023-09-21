package com.tweetapp.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tweetapp.model.Tweet;
import com.tweetapp.model.User;
import com.tweetapp.pojo.UserLogin;
import com.tweetapp.pojo.UserResponse;
import com.tweetapp.service.JWTUtil;
import com.tweetapp.service.TweetService;
import com.tweetapp.service.UserService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin("*")
@RequestMapping("/api/v1.0/tweets")
@RestController
public class TweetAppController {

	Logger logger = LoggerFactory.getLogger(TweetAppController.class);

	UserService userService;
	
	@Autowired
	public TweetAppController(UserService userService) {
		super();
		this.userService = userService;
	}

	TweetService tweetService;
	
	@Autowired
	public void setTweetService(TweetService tweetService) {
		this.tweetService = tweetService;
	}
	
	@Autowired
	JWTUtil util;

	@GetMapping("/validate")
	@ApiOperation(notes = "Returns if a token is valid or not ", value= "validate a token")
	public ResponseEntity<Boolean> validateToken(String token) {
		return new ResponseEntity<Boolean>(util.isValidToken(token), HttpStatus.OK);
	}

	@PostMapping(value = "/register")
	@ApiOperation(notes= "Returns the user if the User details are valid", value= "Register a User")
	public ResponseEntity<User> registerUser(@RequestBody User user) throws Exception {
		logger.info("Creating User");
		return new ResponseEntity<User>(userService.createUser(user), HttpStatus.CREATED);
	}

	@PostMapping(value = "/login")
	@ApiOperation(notes= "Return the User Response fo login details", value= "User Login")
	public ResponseEntity<UserResponse> Login(@RequestBody UserLogin userLogin) throws Exception {
		UserResponse response = userService.login(userLogin.getUsername(), userLogin.getPassword());
		ResponseEntity<UserResponse> user = new ResponseEntity<UserResponse>(response, HttpStatus.OK);
		return user;
	}

	@PutMapping(value = "/{username}/forgot")
	@ApiOperation(notes= "Returns if password reset is successful or not", value= "forgot password to reset password")
	public ResponseEntity<String> forgotPassword(@PathVariable String username,@RequestBody UserLogin user) throws Exception {
		userService.resetPassword(username,user.getPassword());
		return new ResponseEntity<String>(HttpStatus.OK);
	}

	@GetMapping(value = "/all")
	@ApiOperation(notes= "Returns the List of the tweets", value= "Get all the tweets")
	public ResponseEntity<List<Tweet>> getAllTweets() {
		logger.info("Retrieve all the tweets");
		return new ResponseEntity<List<Tweet>>(tweetService.getAllTweets(), HttpStatus.OK);
	}

	@GetMapping(value = "/users/all")
	@ApiOperation(notes= "Returns the list of all the Users", value= "Get all the Users")
	public ResponseEntity<List<User>> getAllUsers() {
		logger.info("get All the Users");
		return new ResponseEntity<List<User>>(userService.getAllUsers(), HttpStatus.OK);
	}

	@GetMapping(value = "/user/search/{username}")
	@ApiOperation(notes= "Return the List of Users whose Username contains the same characters", value= "Get Users By Username")
	public ResponseEntity<List<User>> searchByUserName(@PathVariable String username) throws Exception {
		logger.info("Search the user by Username");
		List<User> user = userService.getUserByUserName(username);
		ResponseEntity<List<User>> response = new ResponseEntity<List<User>>(user, HttpStatus.OK);
		return response;
	}

	@GetMapping(value = "/{username}")
	@ApiOperation(notes= "Return the List of a Particular User", value= "Get All the tweets of a User")
	public ResponseEntity<List<Tweet>> getAllTweetsofUser(@PathVariable String username) throws Exception {
		logger.info("Get all the Tweets of the User");
		List<Tweet> tweetsOfuser = tweetService.getTweetsOfUser(username);
		ResponseEntity<List<Tweet>> response = new ResponseEntity<List<Tweet>>(tweetsOfuser, HttpStatus.OK);
		System.out.println(response);
		return response;
	}

	@PostMapping(value = "/{username}/add")
	@ApiOperation(notes= "Returns the Tweet if the provided Tweet details are all valid  ", value= "Post a new Tweet")
	public ResponseEntity<Tweet> postTweet(@PathVariable String username, @RequestBody Tweet tweet) {
		logger.info("Created a new Tweet Successfully!!!");
		Tweet newTweet = tweetService.addTweet(username,tweet);
		ResponseEntity<Tweet> response = new ResponseEntity<Tweet>(newTweet, HttpStatus.CREATED);
		return response;
	}

	@PutMapping(value = "/{username}/update/{id}")
	@ApiOperation(notes= "Returns the updated Tweet", value= "Update an Existing Tweet")
	public ResponseEntity<Tweet> updateTweet(@PathVariable String username, @PathVariable String id,
			@RequestBody Tweet updateTweet) throws Exception {
		Tweet tweet = tweetService.updateTweet(id, updateTweet);
		logger.info("Successfully Updated the existing tweet" + tweet);
		ResponseEntity<Tweet> response = new ResponseEntity<Tweet>(tweet, HttpStatus.OK);
		return response;
	}

	@DeleteMapping(value = "/{username}/delete/{id}")
	@ApiOperation(notes= "Returns if the tweet is deleted or not", value= "Delete a Tweet")
	public ResponseEntity<String> deleteTweet(@PathVariable String username, @PathVariable String id) throws Exception {
		logger.info("Deleted the tweet Successfully!!");
		tweetService.deleteTweet(id);
		return new ResponseEntity<String>(HttpStatus.OK);
	}

	@PutMapping(value = "/{username}/like/{id}")
	@ApiOperation(notes= "Returns if the Tweet is liked or not", value= "Like a tweet")
	public ResponseEntity<Long> likeTweet(@PathVariable String username, @PathVariable String id) throws Exception {
		logger.info("Like a Tweet");
		 long likes= tweetService.likeTweet(id);
	  ResponseEntity<Long> response=new ResponseEntity<Long>(likes,HttpStatus.OK);
	  return response;
	}

	@PostMapping(value = "/{username}/reply/{id}")
	@ApiOperation(notes= "Returns if a new reply is added to a Tweet or not", value= "Reply to a Tweet")
	public ResponseEntity<Tweet> replyTweet(@PathVariable String username, @PathVariable String id,@RequestBody Tweet replyTweet)
			throws Exception {
		logger.info("Reply to a Tweet");
		Tweet replies=tweetService.replyTweet(username, id, replyTweet);
		return new ResponseEntity<Tweet>(replies,HttpStatus.OK);
	}
}
