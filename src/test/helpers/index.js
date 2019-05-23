const fake = require('faker');

const data = {
  firstname: fake.name.firstName(),
  lastname: fake.name.lastName(),
  email: fake.internet.email(),
  phone: fake.phone.phoneNumber(),
  mobile: fake.phone.phoneNumber(),
  company: fake.company.companyName(),
  title: fake.name.title()
};

module.exports = data;
