const { faker } = require('@faker-js/faker');

class DataFactory {
  static createUser() {
    const username = faker.internet.username().toLowerCase() + faker.string.alphanumeric(4);
    return {
      username,
      email: `${username}@yopmail.com`,
      password: 'password123',
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      phone_number: faker.phone.number('+234##########')
    };
  }

  static createOrganisation() {
    const name = faker.company.name();
    return {
      name,
      description: faker.company.catchPhrase(),
      email: `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}@yopmail.com`,
      type: faker.helpers.arrayElement(['tech', 'education', 'finance', 'health']),
      location: faker.location.city(),
      country: faker.location.country(),
      logo_url: faker.image.urlLoremFlickr({ category: 'business' })
    };
  }

  static createChannel(organisation_id) {
    const name = faker.word.words({ count: { min: 1, max: 3 } }).replace(/\s+/g, '-').toLowerCase();
    return {
      name,
      description: faker.lorem.sentence(),
      organisation_id,
      username: `${name}-${faker.string.alphanumeric(5)}`,
      is_private: faker.datatype.boolean(),
      topic: faker.word.words(3)
    };
  }

  static createContact() {
    return {
      name: faker.person.fullName(),
      email: `${faker.internet.userName().toLowerCase()}@yopmail.com`,
      phone_number: faker.phone.number('+234##########'),
      message: faker.lorem.paragraph()
    };
  }

  static createBlog(category_id) {
    return {
      content: faker.lorem.paragraphs(3),
      category_id
    };
  }
}

module.exports = DataFactory;