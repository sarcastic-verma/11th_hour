export default class User {
    constructor(name,
                email,
                profilePicURL,
                phone,
                collegeId,
                userId,
                transactionIds,
                cart,
                recentCoursesIds,
                myCourses,
                myUploadedCourses,
                wishlist) {
        this.email = email;
        this.profilePicURL = profilePicURL;
        this.name = name;
        this.phone = phone;
        this.collegeId = collegeId;
        this.userId = userId;
        this.transactionIds = transactionIds;
        this.cart = cart;
        this.recentCoursesIds = recentCoursesIds;
        this.myCourses = myCourses;
        this.myUploadedCourses = myUploadedCourses;
        this.wishlist = wishlist;
    }

    static fromDocumentSnapshot(snapshot) {
        return new User(
            snapshot['name'],
            snapshot['email'],
            snapshot['profilePicURL'],
            snapshot['phone'],
            snapshot['collegeId'],
            snapshot.documentId,
            snapshot['transactionIds'],
            snapshot['cart'],
            snapshot['recentCoursesIds'],
            snapshot['myCourses'],
            snapshot['myUploadedCourses'],
            snapshot['wishlist']
        );
    }
}