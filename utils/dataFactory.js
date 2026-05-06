const { faker } = require('@faker-js/faker');
require('dotenv').config();

class DataFactory {
  static validUser() {
    const username = faker.internet.userName().toLowerCase() + faker.string.alphanumeric(4);
    return {
      username,
      email: `${username}@yopmail.com`,
      password: 'ValidPass123!',
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      phone_number: faker.phone.number('+234##########')
    };
  }

  static userWithInvalidEmailDomain() {
    const user = this.validUser();
    user.email = `test@${process.env.INVALID_EMAIL_DOMAIN}`;
    return user;
  }

  static userWithSpecialCharEmail() {
    const user = this.validUser();
    user.email = `test#user@yopmail.com`;
    return user;
  }

  static userWithShortPassword() {
    const user = this.validUser();
    user.password = '123456';
    return user;
  }

  static userWithExistingEmail() {
    const user = this.validUser();
    user.email = process.env.ALREADY_REGISTERED_EMAIL;
    return user;
  }

  static userWithSpacedEmail() {
    const user = this.validUser();
    user.email = `  ${user.email}  `;
    return user;
  }

  static validContact() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      phone_number: faker.phone.number('+234##########'), // < 20 chars
      message: faker.lorem.sentence()
    };
  }

  static validOrganisation() {
    const name = faker.company.name();
    return {
      name,
      description: faker.company.catchPhrase(),
      email: `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}@yopmail.com`,
      type: faker.helpers.arrayElement(['tech', 'education', 'finance']),
      location: faker.location.city(),
      country: faker.location.country(),
      logo_url: faker.image.url()
    };
  }
}

module.exports = DataFactory;