import { JwtTokenMiddleware } from './jwt-token.middleware';

describe('JwtTokenMiddleware', () => {
  it('should be defined', () => {
    expect(new JwtTokenMiddleware()).toBeDefined();
  });
});
