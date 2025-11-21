export default defineEventHandler(() => {
  // In future: fetch from MongoDB
  return [
    {
      id: 'H1',
      name: 'Serengeti View Lodge',
      location: 'Serengeti National Park',
      category: 'Safari lodge',
      minBudget: 180,
      maxBudget: 260
    },
    {
      id: 'H2',
      name: 'Zanzibar Beach Resort',
      location: 'Zanzibar',
      category: 'Beach resort',
      minBudget: 220,
      maxBudget: 320
    },
    {
      id: 'H3',
      name: 'Arusha City Hotel',
      location: 'Arusha',
      category: 'City hotel',
      minBudget: 90,
      maxBudget: 140
    }
  ]
})
