export default class Course {
    constructor(id,
                ratings,
                title,
                blackListed,
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
}