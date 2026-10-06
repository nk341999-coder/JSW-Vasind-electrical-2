JSW VASIND ELECTRICAL DIC-II — FIREBASE READY PACKAGE
=========================================================

What this package does
----------------------
• JSW Vasind Electrical DIC-II MIS
• Units: CGL-2, PF-1, PF-2, CRS-1, CRS-2, CTL-3, M-3, PKL, HRS, ARP
• Years: 2026–2035
• 12 months for every year
• Delay, Stoppage, Diversion, Power Consumption, Store Consumption
• Shared Cloud Firestore data: when one user saves, other users can see the update
• Save date/time and save history in the app
• Firebase Hosting ready

IMPORTANT
---------
You must create/use YOUR OWN Firebase project. I cannot create or publish into your Google account from this chat.

SETUP (easiest method)
----------------------

1. Open Firebase Console:
   https://console.firebase.google.com/

2. Create a Firebase project, e.g.:
   JSW-Vasind-Electrical-MIS

3. In the project, click the Web icon (</>) and register a Web App.
   Firebase will show a firebaseConfig object.

4. Open:
   firebase-config.js

   Replace the PASTE_... values with the config Firebase gives you.

5. In Firebase Console -> Build -> Firestore Database:
   Create database.
   For the first setup, choose a suitable location and start the database.

6. In Firestore Rules, paste the contents of:
   firestore.rules

   NOTE: These rules make the MIS database publicly readable/writable.
   That is convenient for a shared internal demo, but NOT recommended for
   sensitive/production data. For production, add Firebase Authentication
   and restrict write access.

7. Install Firebase CLI on PC, or use Firebase Cloud Shell.
   Then from this folder run:

      firebase login
      firebase init hosting

   Choose the Firebase project you created.
   Public directory: .

   If asked about single-page app, choose Yes.

8. Deploy:

      firebase deploy --only hosting

9. Firebase will give you a public address such as:

      https://YOUR-PROJECT-ID.web.app

   Send that link to anyone who needs to check the MIS.

HOW SHARED DATA WORKS
---------------------
Each Unit + Year is stored as one Firestore document, for example:

   misData/CGL-2_2026
   misData/CGL-2_2027
   ...
   misData/ARP_2035

When a user saves, the document is updated with:
• rows (12-month data)
• updatedAt (Firebase server timestamp)
• updatedBy

The open page listens for changes in real time.

DATE/TIME
---------
The app also keeps local save history. Cloud saves include Firebase's server
timestamp, so the cloud record has a server-side update time.

SECURITY
--------
The included Firestore rules are intentionally simple for easy setup:
allow read/write if true.

Do NOT use these rules for confidential/critical production data.
For a proper company deployment, use Firebase Authentication and rules that
allow only authorized users to write.

NO SERVICE ACCOUNT KEY
----------------------
Never put a Firebase service-account/private-key JSON into this web app.
The Web App config is intended for browser use; service-account private keys
must remain secret.
