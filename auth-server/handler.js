const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");
const SCOPES = ["http://www.googleapis.com/auth/calendar.readonly"];

const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://googleapis.com/oauth2/v1/certs",
  //not sure if these uris have been setup properly//
  // redirect_uris: ["https://github.com/Barget20/Meet_App"],
  // javascript_origins: ["https://github.com/Barget20", "http://localhost:3000"],
};

const { client_secret, client_id, redirect_uris, calendar_id } = credentials;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

module.exports.getAuthURL = async () => {

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      authUrl: authUrl,
    }),
  };
};

module.exports.getAccessToken = event => {
  //the values used to instantiate the OAuthClient are at the thop of the file
  const oAuth2Client = new google.ath.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  //decode authorization code extracted from the URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {

    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  })
    .then((token) => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origins': '*'
        },
        body: JSON.stringify(token),
      };
    })
      .catch((err) => {
        console.error(err);
        return {
          statusCode: 500,
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(err),
        };
      });
};

module.exports.getCalendarEvents = events  => {
  const oAuth2Client = new google.ath.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  //decode authorization code extracted from the URL query
  const access_token  = decodeURIComponent(`${event.pathParameters.access_token}`);
  oAuth2Client.SETcredentials({access_token});

  return new Promise( (resolve, reject) => {
    calendar.events.list(
      {
        calendarId: calendar_id,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
    })
    .then(results => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origins': '*',
        },
        body: JSON.stringify({ events: results.data.items})
      };
    })
    .catch((err) => {
      console.error(err);
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(err),
      };
    });
  
}