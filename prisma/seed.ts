import { PrismaClient, Prisma, Role } from '@prisma/client';
import { create } from 'domain';

const prisma = new PrismaClient();
const admin: Prisma.UserCreateManyInput = {
  email: 'admin@teste.com',
  password: 'senha123',
  first_name: 'admin',
  last_name: 'teste',
  roles: Role.ADMIN,
  deleted_at: null
};

const user: Prisma.UserCreateManyInput = {
  email: 'user@teste.com',
  password: 'senha123',
  first_name: 'user',
  last_name: 'teste',
  roles: Role.USER,
  deleted_at: null
};

const adminCustomer: Prisma.CustomerCreateManyInput = {
  user_id: admin.id,
  identification: '12345678910',
  identification_type: 'CPF'
};

const userCustomer: Prisma.CustomerCreateManyInput = {
  user_id: user.id,
  identification: '12345678910',
  identification_type: 'CNPJ'
};

const adminCustomerAddress: Prisma.CustomerAddressCreateManyInput = {
  description: 'casa',
  first_name: 'admin',
  last_name: 'sem sobrenome',
  company: 'infnet',
  street: 'rua dos bobos',
  number: 0,
  neighboorhood: 'bairro legal',
  postcode: '14411414',
  city: 'Rio de Janeiro',
  state: 'RJ',
  country: 'Brasil',
  customer_id: adminCustomer.id
};

const userCustomerAddress: Prisma.CustomerAddressCreateManyInput = {
  description: 'trabalho',
  first_name: 'user',
  last_name: 'usuario',
  street: 'rua dos loucos',
  number: 100,
  complement: 'apt 101',
  neighboorhood: 'bairro ruim',
  postcode: '1241242142',
  city: 'Sao Paulo',
  state: 'SP',
  country: 'Brasil',
  customer_id: userCustomer.id
};

const product1: Prisma.ProductCreateManyInput = {
  name: 'Apple Watch',
  description: 'Reloginho da Maça',
  slug: 'apple-watch',
  sku: 'aw43',
  price: 1000,
  weight_unit: 'G',
  weight: 100,
  length_unit: 'MM',
  length: 10,
  width: 10,
  height: 10,
  minimum_amount: 1
};

const product2: Prisma.ProductCreateManyInput = {
  name: 'Garmin Watch',
  description: 'Reloginho brabo',
  slug: 'garmin-watch',
  sku: 'ga13',
  price: 1500,
  weight_unit: 'G',
  weight: 100,
  length_unit: 'MM',
  length: 10,
  width: 10,
  height: 10,
  minimum_amount: 1
};

const productCategory1: Prisma.ProductCategoryCreateInput = {
  name: 'Smart Watches',
  description: 'Relogios Techs',
  slug: 'smart-watch',
  products: {
    create: [product1, product2]
  }
};

const product3: Prisma.ProductCreateManyInput = {
  name: 'Macbook pro',
  description: 'Notebookzinho da Maça',
  slug: 'macbook-pro',
  sku: 'mb10',
  price: 10000,
  weight_unit: 'KG',
  weight: 1000,
  length_unit: 'CM',
  length: 30,
  width: 30,
  height: 10,
  minimum_amount: 1
};

const product4: Prisma.ProductCreateManyInput = {
  name: 'Dell Latitude',
  description: 'Notebook dellzinho',
  slug: 'dell-latitude',
  sku: 'dl04',
  price: 5000,
  weight_unit: 'KG',
  weight: 1500,
  length_unit: 'CM',
  length: 35,
  width: 31,
  height: 15,
  minimum_amount: 1
};

const productCategory2: Prisma.ProductCategoryCreateInput = {
  name: 'Notebooks',
  description: 'Computadores Portáteis',
  slug: 'notebooks',
  products: {
    create: [product3, product4]
  }
};

const order1: Prisma.OrderCreateInput = {
  comment: 'entregar na casa da frente',
  customer: {
    connect: adminCustomer
  },
  customer_address: {
    connect: adminCustomerAddress
  },
  products: {
    connect: [product1, product2, product4]
  }
};

const order2: Prisma.OrderCreateInput = {
  comment: 'entregar na casa da frente',
  customer: {
    connect: adminCustomer
  },
  customer_address: {
    connect: adminCustomerAddress
  },
  products: {
    connect: [product1]
  }
};

const order3: Prisma.OrderCreateInput = {
  comment: 'entregar na casa da frente',
  customer: {
    connect: adminCustomer
  },
  customer_address: {
    connect: adminCustomerAddress
  },
  products: {
    connect: [product4, product2]
  }
};

const order4: Prisma.OrderCreateInput = {
  comment: 'entregar na casa da frente',
  customer: {
    connect: userCustomer
  },
  customer_address: {
    connect: userCustomerAddress
  },
  products: {
    connect: [product1, product2, product3, product4]
  }
};

const order5: Prisma.OrderCreateInput = {
  comment: 'entregar na casa da frente',
  customer: {
    connect: userCustomer
  },
  customer_address: {
    connect: userCustomerAddress
  },
  products: {
    connect: [product3]
  }
};

const order6: Prisma.OrderCreateInput = {
  comment: 'entregar na casa da frente',
  customer: {
    connect: adminCustomer
  },
  customer_address: {
    connect: userCustomerAddress
  },
  products: {
    connect: [product1, product2]
  }
};

prisma.user.createMany({
  data: [user, admin]
});

prisma.customer.createMany({
  data: [adminCustomer, userCustomer]
});

prisma.customerAddress.createMany({
  data: [adminCustomerAddress, userCustomerAddress]
});

prisma.productCategory.createMany({
  data: [productCategory1, productCategory2]
});

prisma.order.create({
  data: order1
});
prisma.order.create({
  data: order2
});
prisma.order.create({
  data: order3
});
prisma.order.create({
  data: order4
});
prisma.order.create({
  data: order5
});
prisma.order.create({
  data: order6
});
