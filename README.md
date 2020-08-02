
A simple interactive art gallery app using React, Material UI and Firebase.

live site : www.twilightpark.art

In addition the the major UI components that present the art gallery, catalog
and instructions, the pacakge has some compenents that might be reused by
others.

Firebase authentication work flows and some simple Firebase doc display and
editing components:

* DocCollection - Render props component that provides a set of loaded Firebase collections.
* DocConfig - Context.Provider whose value is a Firebase document.  Displays a spinner until the doc is available.
* DocEdit - Context.Provider whos value is a Firebase document.  Works together with other components to edit a Firebase doc.
	* DocField - Edit a string field in a Firebase doc.
	* DocCheckbox - Edit a boolean field in a Firebase doc.
	* DocImage - drag and drop or browse image uploader.  The image is uploaded to storage and a Firebase storage URL is written to a doc field.

* ScaledImage - Display an image scaled up or down to fit the specified size.

* Sortable - A sortable and searchable data driven table.

* UserData - Render props component that provides a access to Firebase user authentication via a a set of Firebase functions.
	* Add user
	* Delete user
	* Set boolean custom claims on user.
* Users - A table component using UserData to provide UI access to Add/Delete/Set claims on user.

Firebase functions:

Functions provide authentication checking.  A single 'super' user uid is hard coded in the functions source.  This
bootstraps the use of authentication claims.  

Functions for super user or users with 'adm' (Administrator) claim:

* createUser - Create a new Firebase user given an email address.
* deleteUser - Delete a Firebase user by uid.
* getUsers - Get all Firebase users (up to 1000).
* setClaims - Set the custom claims on the users token by uid and claims object.

User only functions:

* setTOS - Set the tos claim indicating that the use has read the terms of service.  Only the user can set/reset this claim.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
