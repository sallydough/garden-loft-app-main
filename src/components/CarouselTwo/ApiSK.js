import { register } from '@videosdk.live/react-native-sdk';
register();

//Please go into .env file and copy and paste TOKEN into this line below:
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI1NjRhMzM3OS04YzA1LTRkM2ItODIxNi1kNzU1NDRlYTU0MTkiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxMjk1NDg0MSwiZXhwIjoxNzI4NTA2ODQxfQ.dLo_1mf5SWhP9ou11weP-FvZjm9cWicwuyqmopqp268';
// API call to create meeting
export const createMeeting = async ({token}) => {
  const res = await fetch('https://api.videosdk.live/v1/meetings', {
    method: 'POST',
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({region: 'sg001'}),
  });

  const {meetingId} = await res.json();
  return meetingId;
};
