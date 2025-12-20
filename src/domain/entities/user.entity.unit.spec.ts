import { ValidatorDomainException } from '../shared/exceptions/validator-domain.exception';
import { User } from './user.entity';

describe('Domian > Entities > User', () => {
  describe('create', () => {
    it('should create a user entity', () => {
      const anEmail = 'john@doe.com.br';
      const aPassword = '12345678';

      const anUser = User.create({
        email: anEmail,
        password: aPassword,
      });

      expect(anUser.getEmail()).toBe(anEmail);
      expect(anUser.getPassword()).not.toBe(aPassword);
      expect(anUser).toBeInstanceOf(User);
      expect(anUser).toHaveProperty('id');
      expect(anUser).toHaveProperty('createdAt');
      expect(anUser).toHaveProperty('updatedAt');
      expect(anUser.comparePassword(aPassword)).toBe(true);
      expect(anUser.getId().length).toBe(36);
    });
  });

  it('should trow an error when email is invalid', () => {
    const anInvalidEmail = 'john.doe.com.br';
    const aPassword = '12345678';

    expect(() => {
      User.create({
        email: anInvalidEmail,
        password: aPassword,
      });
    }).toThrow(ValidatorDomainException);
  });

  it('should trow an error when password is less than 8 characters', () => {
    const anEmail = 'john@doe.com.br';
    const aPassword = '1234567';

    expect(() => {
      User.create({
        email: anEmail,
        password: aPassword,
      });
    }).toThrow(ValidatorDomainException);
  });

  describe('comparePassword', () => {
    it('should return true when passwords match', () => {
      const anEmail = 'john@doe.com.br';
      const aPassword = '12345678';

      const anUser = User.create({
        email: anEmail,
        password: aPassword,
      });

      expect(anUser.comparePassword(aPassword)).toBe(true);
    });

    it("should return false when password don't match", () => {
      const anEmail = 'john@doe.com.br';
      const aPassword = '12345678';

      const anUser = User.create({
        email: anEmail,
        password: aPassword,
      });

      expect(anUser.comparePassword('1234567')).toBe(false);
    });
  });
});
