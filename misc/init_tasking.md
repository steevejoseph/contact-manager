> User must be able to sign up.

1. User shown sign-up page (form)
2. After user enters info, form is submitted to '/signup'
3. Backend pulls info from request body of form.
4. User added to DB.
5. User redirected to home page.
6. User's info dynamically loaded into homepage.

> User must be able to be logged in.

1. User shown sign-in page (form).
2. After user enters info, form is submitted to '/signin'
3. Backend pulls username/email + password from request body of form.
4. Username + pass searched for in DB.
5. If success:
   1. User re-directed to homepage.
   2. User's info dynamically loaded into homepage.

   else:
   1. Error message displayed, e.g, "user/pass not found"
   2. User redirected to sign-in again.



> User must be able to add Contacts.

1. User shown form for Contact info.
2. After user enters contact info, a form is submitted.
3. Backend pulls Contact info from request body of form.
4. If success:
   1. Contact added to DB
   2. Contact pushed to matching User's Contact array.
   3. User redirected to homepage.
   4. User's info dynamically loaded from DB.

   <br>else if Contact already in DB:
   1. User alerted that Contact is already in DB
       * (which params to check? Phone? B-day?)

   else:
   1. User shown error message.
   2. User shown Add Contact form again.


> User must be able to search for Contacts. (AJAX?)

1. User enters search criteria.
2. DB lookup.
  * Lookup by {firstName, phone, etc}
3. If Contact found, load 'individual' view for contact.
   * could be just pop-up
   * could be separate page.
   * could just reload homepage with only that Contact displayed in it.


> User must be able to delete Contacts.

1. User in Contact's 'individual' view
2. User presses delete contact  button.
3. (Optional) confirmation alert shown
4. If sure:
    1. Remove Contact from User's Contact array.
    2. Lookup Contact in DB.
    3. Remove specified contact from DB.

    Else:
    1. Do nothing.
