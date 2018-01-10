
app.get('/events', async (req, res, next) => {
  events = await Event.findAll()
  res.json(events.map(event => {
    return {
      ...event,
      guestIds: (await event.guests.findAll()).map(guest => guest.id)
    }
  })
})

GET /events
[{
  title: "My Birthday",
  guestIds: [1,2,3,4]
}, {
  title: "My Birthday",
  guestIds: [1,2,3,4]
}]

SIDELOADING
GET /events
{
  events:
    [{
      title: "My Birthday",
      guestIds: [1,2,3,4]
    }, {
      title: "My Birthday",
      guestIds: [1,2,3,4]
    }]
  ,
  users: {
    1: {},
    2: {},
    3: {},
    4: {},
  }
}


state = {
  users: {
    1: {
      name: "Collin The Great",
    },
    2: {
      name: "Quinn"
    }
  }
  me: {
    id: 1
  },

  friends: [{
    id: 1,
  },{
    id: 2,
  }],

  invitations: [{
    name: "Quinn's Birthday",
    whoCreatedTheEvent: {
      id: 2
    },
    guests: [{
      id: 2
    }]
  }]
}
