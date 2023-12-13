import assert from 'assert';
import { User } from './User.js';

function getUser() {
  return new User('test', 'test@gmail.com', 'testing');
}

describe('User', function () {
  describe('validate()', function () {
    it('try to create a user with incorrect size name', function () {
      const user = getUser();
      user.name = '22';

      assert.throws(() => user.validate(), Error);
    });

    it('try to create a user with incorrect password', function () {
      const user = getUser();
      user.password = '22';

      assert.throws(() => user.validate(), Error);
    });

    it('try to create a user with incorrect email', function () {
      const user = getUser();
      user.email = '22';

      assert.throws(() => user.validate(), Error);
    });

    it('create a user', function () {
      const user = getUser();

      assert.doesNotThrow(() => user.validate(), Error);
    });
  });
});
