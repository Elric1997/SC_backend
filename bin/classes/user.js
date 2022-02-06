class User {
    constructor(firstName, lastName, mailAddress, passwort) {
        //this.avatar = avatar;
        //this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mailAddress = mailAddress;
        this.passwort = passwort;
        //this.ID = "this.id();"
        this.registrationDate = Date.now();
        this.lastLogin = 0;
        this.userPhone = null;
        this.twoAuth = false;
        this.authyId = "";
        this.userPermission = [];
        this.userRole = [];
        this.isVerified = {};
        this.verifyToken = "";
        this.darkmode = false;
    }

}

module.exports = User;
