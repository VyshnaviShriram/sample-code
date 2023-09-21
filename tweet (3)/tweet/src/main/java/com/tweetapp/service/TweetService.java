package com.tweetapp.service;

import java.util.List;

import com.tweetapp.model.Tweet;

public interface TweetService {

	public List<Tweet> getAllTweets();

	public List<Tweet> getTweetsOfUser(String userName) throws Exception;

	public Tweet addTweet(String username,Tweet tweet);

	public Tweet updateTweet(String id, Tweet tweetApp) throws Exception;

	public String deleteTweet(String id) throws Exception;

	public long likeTweet(String id) throws Exception;

	public Tweet replyTweet(String username, String id, Tweet replyTweet) throws Exception;

}
