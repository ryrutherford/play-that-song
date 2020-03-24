# play-that-song

## About the Website

### How it was created
- The website was built using ReactJS with Redux as the central state manager, Firebase as the host, authentication manager, and cloud function manager, and Firestore as the database.

### How to use it
1. Navigate to https://play-that-song-fac18.firebaseapp.com/ and create an account using your email and password at the Sign Up link
2. After signing up and signing in click the "New Session" button under the Sessions heading. This will automatically generate a new session with a unique ID for you. The new session will appear under the "Active Sessions" heading
3. Navigate to your new session by clicking on the link titled "Session ID: {Your New Session ID}"
4. Click on the "Create Song Request" button in the middle of the page
5. Search for a song you would like to request, when it appears click "Request Song"
6. You have requested your first song! Your request can be undone by clicking on the "Undo Request" button that appears beneath your new request. You can open the song in Spotify by clicking on the song title
7. To allow other users to make requests share the code or link to your session with them. You can also join other users sessions by entering their code in the "Join Session" fields on the Sessions page

### Example Song Request Session
- After creating your account, go to https://play-that-song-fac18.firebaseapp.com/activeSession/136661
- This is an example of an active session with multiple song requests by different people
- Note how the song requests are ordered based on the number of requests they've received
- Feel free to add a song to this session!
