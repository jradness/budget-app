const MOCK_USERS = [
  {
    id: 1,
    username: 'jradness',
    config: {
      payPeriod: 'bi-weekly', // bi-monthly | bi-weekly,
      payStartDate: '2024-01-04T00:00:00-06:00',
      payEndDate: '2024-12-19T00:00:00-06:00'
    },
    bills: [
      {name: "Mortgage", dueDate: 1, amount: 2580.71},
      {name: "Audible", dueDate: 1, amount: 16.11},
      {name: "Medium",dueDate: 1,amount: 5},
      {name: "iCloud (J)",dueDate: 1,amount: 0.99},
      {name: "Kids Lunch(1)",dueDate: 1,amount: 45},
      {name: "Prodigy(1)",dueDate: 3,amount: 10.75},
      {name: "Amazon Music",dueDate: 3,amount: 9.99},
      {name: "QuickSilv(2371)",dueDate: 3,amount: 142},
      {name: "Gymnastics",dueDate: 5,  amount: 150},
      {name: "Transfer to Savings",dueDate: 5,amount: 25},
      {name: "Prodigy(2)",dueDate: 7,amount: 10.75},
      {name: "iCloud(A)",dueDate: 7,amount: 2.99},
      {name: "Journeys(6299)",dueDate: 7,amount: 50},
      {name: "Amazon Prime",dueDate: 8,amount: 7.53},
      {name: "Hulu",dueDate: 8,amount: 16.23},
      {name: "Home Depot CC",dueDate: 11,amount: 92},
      {name: "TXU Energy",dueDate: 11,amount: 500},
      {name: "Rocket Money",dueDate: 12,amount: 5},
      {name: "Chase CC",dueDate: 12,amount: 172},
      {name: "Kindle Ulm",dueDate: 13,amount: 12.92},
      {name: "Verizon",dueDate: 14,amount: 206.49},
      {name: "Kids Lunch(2)",dueDate: 15,amount: 45},
      {name: "Tractor Supply Co",dueDate: 15,amount: 58},
      {name: "Affirm: Pool",dueDate: 16,amount: 159.31},
      {name: "Trash",dueDate: 16,amount: 40},
      {name: "Btel",dueDate: 18,amount: 102.95},
      {name: "PlanetFitness(A)",dueDate: 18,amount: 27.11},
      {name: "Cabelas(1677)",dueDate: 17,amount: 75},
      {name: "Urban Air",dueDate: 20,amount: 82.19},
      {name: "Affirm: Xmas",dueDate: 21,amount: 52.16},
      {name: "AppleTV",dueDate: 23,amount: 6.45},
      {name: "Amazon Prime",dueDate: 23,amount: 7.53},
      {name: "PlanetFitness(J)",dueDate: 25,amount: 10.83},
      {name: "Doordash",dueDate: 25,amount: 9.99},
      {name: "TKD",dueDate: 25,amount: 264},
      {name: "Prime Video",dueDate: 25,amount: 6.45},
      {name: "Prime Store Card",dueDate: 25,amount: 100},
      {name: "HP InstaInk",dueDate: 27,amount: 20.46},
      {name: "Geico Ins",dueDate: 27,amount: 56.61},
      {name: "Geico Ins",dueDate: 27,amount: 155.59},
      {name: "ChatGPT Sub",dueDate: 28,amount: 21.28},
      {name: "Netflix",dueDate: 28,amount: 16.67},
      {name: "CareCredit",dueDate: 28,amount: 67}
    ]
  }
];

export default MOCK_USERS;
