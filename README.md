# Cloud Cabinet

## Table of Contents

- [Introduction](#introduction)
- [Instruction and Installation Setup](#instruction-and-installation-setup)
- [Application Functionality](#application-functionality)
- [Feature list](#feature-list)



## Introduction

*   University Name		: [San Jose State University](http://www.sjsu.edu/).
*   Course				: [Cloud Technologies](http://info.sjsu.edu/web-dbgen/catalog/courses/CMPE281.html).
*   Professor				: [Sanjay Garje](https://www.linkedin.com/in/sanjaygarje/).
*   ISA					: [Divyankitha Urs](https://www.linkedin.com/in/divyankithaurs/).
*   Student				: [Ashwini Shankar Narayan](www.linkedin.com/in/ashwinisnv/).

## Instruction and Installation Setup

- The Package.json file keeps track of the environment by tracking dependencies and other key information.
- The Index.html is the frontend of the application.
- The apps.js contains all the server side logic.  

- Node.js is required to run this code.
- To work with this code,
		- Open Terminal and navigate to the folder with this code.
		- run "npm install" in the terminal to install all the dependencies.
		- run "node app.js" to launch the application.
		- On your browser, in the URL, type "localhost:8081/" to see the webpage.

				npm install
				node app.js
	[localhost:8081/](localhost:8081/)
	
- Any changes to the app.js or the index.html requires to run the application again.


## Application Functionality

- Cloud Cabinet is a three-tier web application and can be accessed on public internet via
[http://www.ashwinisjsucloud.com/](http://www.ashwinisjsucloud.com/)

- Cloud Cabinet application is the easy way to manage and backup your files.
- Users can sign up and login into the application.
- The application provides the following functionalities:

	- Upload - To upload new files to AWS S3 bucket,
	- Delete -  To delete already uploaded files from AWS S3 bucket,
	- Update - To update the already existing files and
	- List - Display your files that are uploaded on AWS S3.

- The application uses AWS RDS (Single AZ) with MySQL as the database engine to retrieve and manage your file records. The user data and file data is stored in the database and the application tracks the following fields:
	
	- User&#39;s first name.
	- User&#39;s last name.
	- File name.
	- File description.
	- File Upload Time.
	- File Update Time.
	- File download link (Cloudfront link).

- Security is the biggest concern for any customer. The application is built upon AWS cloud (services like S3, RDS. etc.) security
- The &#39;Cloud Cabinet&#39; web app is deployed on AWS Elastic Beanstalk leveraging major features of load balancing, auto scaling and health monitoring.
- All the objects in AWS S3 are stored in US East(Ohio) region and from the &#39;Disaster recovery&#39; perspective, all objects are replicated to EU(London) region.

  Pre-requisites:

- Create an Amazon Cognito Identity pool ID to grant access for users to upload, delete and update to the S3 bucket. This ID is used in the source code of the application to list, change, delete and upload objects into S3 bucket.
- Create an IAM role to grant permission to read and write to the Amazon S3 bucket.
- Perform CORS configuration to the S3 bucket.
- In the application source code add MySQL hostname and credentials to access database records.

## Technologies used

- **Client-side:** JavaScript, HTML, Bootstrap, CSS, AWS SDK for JavaScript.
- **Server-side:** Node.js, Socket.IO, Elastic Beanstalk deployment on Nginx server.
- **Database:** MySQL database engine running on Amazon RDS instance.

**Front-end** **UI (Client-side) :**

- Cloud cabinet application is accessible to the users via front end UI to manage their files on S3.
- **HTML** is used to define the content of the application.
- **CSS** structures the layout of the web page.
- The application invokes various **JavaScript** functions to leverage the basic CRUD operation (Create, Read, Update and Delete).
- The application uses **AWS** **SDK for JavaScript** to interact with Amazon S3 bucket. Following are the AWS specific methods used in the application to enable access to S3:

	- listObjects
	- putObject
	- Upload
	- deleteObject
	- deleteObjects
	- headObject

- **Bootstrap** is the front-end framework used throughout the application along with CSS, HTML and JavaScript to make the UI more appealing and responsive.

**Server side:**

- **Node.js** is used as the server framework for client-side JavaScript enabling us to communicate with the database and invoke the database records. It makes use of event-driven functionality to listen and provide data to the front-end JavaScript whenever called for.
- **Socket.IO** is the library for JavaScript that facilitates real-time and bi-directional communication between clients and servers. This runs on both client-side JavaScript library and on server side library for Node.js. Socket.IO uses polling as a fallback option to communicate data to and fro and uses Websocket protocol.
- The entire Cloud Cabinet application is deployed and scaled up using **Elastic Beanstalk(EB) on Nginx server**. EB takes care of load balancing, capacity provisioning, auto-scaling and health monitoring of the application.

**Database:**

- **MySQL database engine** is used to store the data records required for the application. This runs on **Amazon RDS** (Relational Database Service) instance.
- The database contains two tables – Users and Files.

- &#39;Users&#39; table manages the application user&#39;s data like username, passwords, first name and last name.
- &#39;Files&#39; table manages the files on S3 and tracks thefile name, file description, creation time, update time and also provides the user with a download link for each file.

## Feature list

Cloud Cabinet provide a place web UI on browser that leverages the users stores their files in AWS S3 and provides easily managed way to organize the uploaded files. The application offers the users with the following features:

- **Sign up:** New users can sign up into the application to upload and manage their files in the application. Sign up performs the following tasks:

- It adds a new user and the user can start uploading files.
- If new user chooses an already existing username the application throws an error to choose a different one.
- The user is asked to enter password twice to reconfirm and if these two do not match, an error is thrown saying passwords mismatch.

- **Login:**  Users who have already signed up can enter their username and password and get access to manage their files. It throws an error if username and password is not matching.

Note: Username is not case sensitive and password is case sensitive.


![Alt text](img1.jpg?raw=true)


Fig 1. Login and Signup Page for Cloud Cabinet application

- **Upload:** Once the user is authenticated successfully he is taken to the main page where he can upload the files. Here, user have to choose/browse the file he wishes to upload to cloud and then enter a file description and clicks on &#39;Upload&#39; button. If upload is successful, the application displays a successfully uploaded message.

**Note:** User can upload files of size less than 10MB only.

- **Delete:** The user can delete already uploaded files by clicking on the delete button just locate beside each file.

- **Update:** The user can update already uploaded files by just choosing the same file name as the existing one. The &#39;File Updated Time&#39; gets updated on updating an old file and shows recently modified time.

- **View/Display:** The user can view a list of all the uploaded files once he login into the application.

The list contains the below fields for each of the uploaded file:

	- First name
	- Last name
	- File name
	- File Description
	- Creation time
	- Update time
	- AWS Cloudfront download link per file
	- Delete option per file.

	
	
![Alt text](img2.jpg?raw=true)

 
                                         Fig 2. Main page of Cloud Cabinet application for CRUD operations

