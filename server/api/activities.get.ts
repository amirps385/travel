export default defineEventHandler(() => {
  // In future: fetch from MongoDB
  return [
    {
      id: 'A1',
      name: 'Morning game drive',
      type: 'Safari',
      location: 'Serengeti',
      duration: 'Half day',
      code: 'ACT-SAF-AM'
    },
    {
      id: 'A2',
      name: 'Full-day game drive',
      type: 'Safari',
      location: 'Serengeti',
      duration: 'Full day',
      code: 'ACT-SAF-FD'
    },
    {
      id: 'A3',
      name: 'Stone Town walking tour',
      type: 'City tour',
      location: 'Zanzibar',
      duration: 'Half day',
      code: 'ACT-CTY-ST'
    },
    {
      id: 'A4',
      name: 'Prison Island + snorkeling',
      type: 'Excursion',
      location: 'Zanzibar',
      duration: 'Half day',
      code: 'ACT-SEA-PI'
    },
    {
      id: 'A5',
      name: 'Kilimanjaro day hike',
      type: 'Trek',
      location: 'Kilimanjaro',
      duration: 'Full day',
      code: 'ACT-TRK-KD'
    }
  ]
})
