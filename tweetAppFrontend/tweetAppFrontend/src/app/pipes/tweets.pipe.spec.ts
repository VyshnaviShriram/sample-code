import { TweetsPipe } from './tweets.pipe';

describe('TweetsPipe', () => {
  it('create an instance', () => {
    const pipe = new TweetsPipe();
    expect(pipe).toBeTruthy();
  });
});
