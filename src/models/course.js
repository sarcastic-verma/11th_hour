export default class Course {
    constructor(
        blackListed,
        id,
        ratings,
        title,
        subject,
        instructorName,
        price,
        instructorId,
        courseThumbnail,
        lectures,
        resources,
        date,
        collegeId,
        enrolledUsers,
        description) {
        this.price = price;
        this.instructorId = instructorId;
        this.resources = resources;
        this.date = date;
        this.collegeId = collegeId;
        this.enrolledUsers = enrolledUsers;
        this.description = description;
        this.lectures = lectures;
        this.id = id;
        this.courseThumbnail = courseThumbnail;
        this.ratings = ratings;
        this.title = title;
        this.blackListed = blackListed;
        this.subject = subject;
        this.instructorName = instructorName;
    }

    static fromDocumentSnapshot(snapshot) {
        return new Course(
            snapshot['blackListed'],
            snapshot.documentId,
            snapshot['ratings'],
            snapshot['title'],
            snapshot['subject'],
            snapshot['instructorName'],
            snapshot['price'],
            snapshot['instructorId'],
            snapshot['courseThumbnail'],
            snapshot['lectures'],
            snapshot['resources'],
            snapshot['date'],
            snapshot['collegeId'],
            snapshot['enrolledUsers'],
            snapshot['description']
        );
    }
}