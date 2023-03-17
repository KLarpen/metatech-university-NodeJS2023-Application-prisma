'use strict';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  log: [/* 'query', 'info', */ 'warn', 'error'],
});

async function main() {
  await prisma.role.createMany({
    data: [
      { name: 'admin' },
      { name: 'support' },
      { name: 'moderator' },
      { name: 'member' },
    ],
    skipDuplicates: true,
  });

  // Examples login/password
  // admin/123456
  // marcus/marcus
  // user/nopassword
  // iskandar/zulqarnayn

  const mainAccount = await prisma.account.upsert({
    where: { login: 'marcus' },
    update: {},
    create: {
      login: 'marcus',
      password:
        // eslint-disable-next-line max-len
        'dpHw0OUNBz76nuqrXZbeYQ==:wpvUVgi8Yp9rJ0yZyBWecaWP2EL/ahpxZY74KOVfhAYbAZSq6mWqjsQwtCvIPcSKZqUVpVb13JcSciB2fA+6Tg==',
    },
  });

  await prisma.account.createMany({
    data: [
      {
        login: 'admin',
        password:
          // eslint-disable-next-line max-len
          'ypMEd9FwvtlOjcvH94iICQ==:V6LnSOVwXzENxeLCJk59Toadea7oaA1IxYulAOtKkL9tBxjEPOw085vYalEdLDoe8xbrXQlhh7QRGzrSe8Bthw==',
      },
      {
        login: 'user',
        password:
          // eslint-disable-next-line max-len
          'r8zb8AdrlPSh5wNy6hqOxg==:HyO5rvOFLtwzU+OZ9qFi3ADXlVccDJWGSfUS8mVq43spJ6sxyliUdW3i53hOPdkFAtDn3EAQMttOlIoJap1lTQ==',
      },
      {
        login: 'iskandar',
        password:
          // eslint-disable-next-line max-len
          'aqX1O4bKXiwC/Jh2EKNIYw==:bpE4TARNg09vb2Libn1c00YRxcvoklB9zVSbD733LwQQFUuAm7WHP85PbZXwEbbeOVPIFHgflR4cvEmvYkr76g==',
      },
    ],
    skipDuplicates: true,
  });

  await prisma.role.update({
    where: { name: 'admin' },
    data: {
      accounts: {
        connect: [{ login: 'admin' }, { accountId: mainAccount.accountId }],
      },
    },
  });
  await prisma.role.update({
    where: { name: 'support' },
    data: { accounts: { connect: [{ accountId: mainAccount.accountId }] } },
  });
  await prisma.role.update({
    where: { name: 'moderator' },
    data: { accounts: { connect: [{ login: 'iskandar' }] } },
  });
  await prisma.role.update({
    where: { name: 'member' },
    data: { accounts: { connect: [{ login: 'user' }] } },
  });

  const firstArea = await prisma.area.upsert({
    where: { name: 'Metarhia' },
    update: { ownerId: mainAccount.accountId },
    create: { name: 'Metarhia', ownerId: mainAccount.accountId },
  });

  const secondArea = await prisma.area.upsert({
    where: { name: 'Metaeducation' },
    update: { ownerId: mainAccount.accountId },
    create: { name: 'Metaeducation', ownerId: mainAccount.accountId },
  });

  for (const area of [firstArea, secondArea]) {
    await prisma.area.update({
      where: { areaId: area.areaId },
      data: {
        members: {
          connect: [
            { login: 'admin' },
            { accountId: mainAccount.accountId },
            { login: 'user' },
            { login: 'iskandar' },
          ],
        },
      },
    });
  }

  // EV Parking Domain
  await prisma.portType.createMany({
    data: [
      { socket: 'Schuko Type F', current: 'AC' },
      { socket: 'Type 1 (J1772)', current: 'AC' },
      { socket: 'Type 2 Mennekes', current: 'AC' },
      { socket: 'GB/T', current: 'AC' },
      { socket: 'CCS Type 1', current: 'DC' },
      { socket: 'CCS Type 2', current: 'DC' },
      { socket: 'Tesla', current: 'DC' },
      { socket: 'GB/T', current: 'DC' },
      { socket: 'CHAdeMO', current: 'DC' },
    ],
    skipDuplicates: true,
  });

  await prisma.vehicle.upsert({
    where: { model: 'Nissan LEAF 2015' },
    update: {},
    create: {
      model: 'Nissan LEAF 2015',
      kind: 'CAR',
      portType: {
        connect: {
          socketCurrentPair: { socket: 'Type 1 (J1772)', current: 'AC' },
        },
      },
    },
  });
  const ev = await prisma.vehicle.upsert({
    where: { model: 'Hyundai IONIQ 5 Standard Range 2WD' },
    update: {},
    create: {
      model: 'Hyundai IONIQ 5 Standard Range 2WD',
      kind: 'CAR',
      portType: {
        connect: {
          socketCurrentPair: { socket: 'Type 2 Mennekes', current: 'AC' },
        },
      },
    },
  });
  await prisma.vehicle.upsert({
    where: { model: 'BYD ATTO 3' },
    update: {},
    create: {
      model: 'BYD ATTO 3',
      kind: 'CAR',
      portType: {
        connect: {
          socketCurrentPair: { socket: 'CCS Type 2', current: 'DC' },
        },
      },
    },
  });

  let customerId = '';
  let billingSettingsId = '';
  const userAccount = await prisma.account.findUnique({
    where: { login: 'user' },
    select: { accountId: true },
  });
  if (userAccount?.accountId) {
    const customer = await prisma.client.upsert({
      where: { accountId: userAccount.accountId },
      update: {},
      create: {
        accountId: userAccount.accountId,
        firstName: 'Тест',
        lastName: 'Тестенко',
        phones: [
          { type: 'main', value: '+380961112233' },
          { type: 'work', value: '+380504445566' },
        ],
        vehicleId: ev.vehicleId,
        billingSettings: {
          create: {
            cardNo: '0000-0000-0000-1234',
            main: true,
          },
        },
      },
      include: {
        billingSettings: true,
      },
    });
    customerId = customer.clientId;
    billingSettingsId = customer.billingSettings
      ? customer.billingSettings[0].billingSettingsId
      : '';
  }

  const parking = await prisma.parking.upsert({
    where: { parkingId: 'd5103a5d-f720-46b5-84fa-32fd9358a5a7' },
    update: {},
    create: {
      parkingId: 'd5103a5d-f720-46b5-84fa-32fd9358a5a7',
      name: 'First Point',
      address: {
        country: 'Ukraine',
        city: 'Kyiv',
        streetAddress: 'vulytsia Vyprobna, 25',
      },
      location: { latitude: 50.50535659577922, longitude: 30.414988747484568 },
      spots: {
        createMany: {
          data: [
            {
              floor: 1,
              place: 1,
              cost: 12,
              suitableFor: ['CAR', 'VAN', 'MOTORCYCLE'],
              available: false,
            },
            {
              floor: 1,
              place: 2,
              cost: 12,
              suitableFor: ['CAR', 'VAN', 'MOTORCYCLE'],
              available: true,
            },
            {
              floor: 1,
              place: 3,
              cost: 12,
              suitableFor: ['CAR', 'VAN', 'MOTORCYCLE'],
              available: true,
            },
            {
              floor: 1,
              place: 4,
              cost: 12,
              suitableFor: ['CAR', 'VAN', 'MOTORCYCLE'],
              available: true,
            },
          ],
        },
      },
    },
    include: {
      spots: true,
    },
  });

  const { spots } = parking;
  const electricCharger = await prisma.electricCharger.upsert({
    where: { electricChargerId: '8e589ae8-e5bf-4ce1-a919-cfcea2afcf4b' },
    update: {},
    create: {
      electricChargerId: '8e589ae8-e5bf-4ce1-a919-cfcea2afcf4b',
      model: 'ABB Multiport EV charging station',
      parkingId: parking.parkingId,
      ports: {
        createMany: {
          data: [
            {
              portTypeId: 6,
              cost: 95,
              power: 50000,
              available: true,
            },
            {
              portTypeId: 3,
              cost: 50,
              power: 22000,
              available: false,
            },
            {
              portTypeId: 3,
              cost: 50,
              power: 22000,
              available: true,
            },
            {
              portTypeId: 6,
              cost: 95,
              power: 50000,
              available: true,
            },
          ],
        },
      },
      spots: {
        connect: spots.map(({ spotId }) => ({ spotId })),
      },
    },
    include: { ports: true },
  });
  const { ports } = electricCharger;
  await prisma.spot.update({
    where: { spotId: spots[0].spotId },
    data: {
      ports: {
        connect: [
          { chargingPortId: ports[0].chargingPortId },
          { chargingPortId: ports[1].chargingPortId },
        ],
      },
    },
  });
  await prisma.spot.update({
    where: { spotId: spots[1].spotId },
    data: {
      ports: {
        connect: [
          { chargingPortId: ports[0].chargingPortId },
          { chargingPortId: ports[1].chargingPortId },
        ],
      },
    },
  });
  await prisma.spot.update({
    where: { spotId: spots[2].spotId },
    data: {
      ports: {
        connect: [
          { chargingPortId: ports[2].chargingPortId },
          { chargingPortId: ports[3].chargingPortId },
        ],
      },
    },
  });
  await prisma.spot.update({
    where: { spotId: spots[3].spotId },
    data: {
      ports: {
        connect: [
          { chargingPortId: ports[2].chargingPortId },
          { chargingPortId: ports[3].chargingPortId },
        ],
      },
    },
  });

  await prisma.rent.createMany({
    data: [
      {
        rentId: '6541c5aa-e813-4f05-a68d-1932d880e30a',
        spotId: spots[3].spotId,
        chargingPortId: ports[2].chargingPortId,
        clientId: customerId,
        started: '2023-01-12T15:35:00.000Z',
        finished: '2023-01-12T18:35:00.000Z',
        freezedCostRates: { spot: 10, port: 45 },
        totalPrice: 165,
      },
      {
        rentId: 'c9268e2a-6de0-4571-a3eb-022ed270c473',
        spotId: spots[0].spotId,
        chargingPortId: ports[1].chargingPortId,
        clientId: customerId,
        started: '2023-01-14T08:15:00.000Z',
        freezedCostRates: { spot: 12, port: 50 },
      },
    ],
    skipDuplicates: true,
  });

  await prisma.payment.upsert({
    where: { paymentId: '1090d5d5-e0c2-4880-9556-636270d7d6c8' },
    update: {},
    create: {
      paymentId: '1090d5d5-e0c2-4880-9556-636270d7d6c8',
      rentId: '6541c5aa-e813-4f05-a68d-1932d880e30a',
      billingSettingsId,
      amount: 165,
      when: '2023-01-12T18:36:00.000Z',
    },
  });

  // console.dir({
  //   ev,
  //   customerId,
  //   billingSettingsId,
  //   parking,
  //   spots,
  //   ports,
  //   finishedRent,
  // });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
