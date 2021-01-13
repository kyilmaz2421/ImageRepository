# Shopify Image Repository

Hosted at https://shopify-image-repository.herokuapp.com/

NOTE: The database is hosted using MongoDB atlas free tier and therefore is slightly slow in sending large image files.


# Introduction

A fully functioning image repository that uses MongoDB for image storage. It is integrated with a simple front end to highlight the abilities of the backend and is currently hosted in Heroku for easy usage.


# Features

## ADD

The ability to upload and post any image with a title and an optional description. File validation was added to the backend as well limiting file size to 2 mb and allowing only .png, .jpg, .jpeg, .gif files.


## DELETE

Removes the image from database and deletes its files.


## EDIT 

The ability to change the title and the option to add, remove, or change the description of a specific post.


## SEARCH & GET

Based on the inputted search string the system does a regex substring match on the titles and returns the relevant images posted.

By default, upon landing on the front page there is no specific search query made and only 10 images are sent at a time. The limit of images sent can be changed through a url query and the backend will handle this.

# Improvements & Upgrades

- Allow upload of albums (multiple simultaneous image uploads). This would mean adding functionality to add/remove/order images in albums as well as a view page for scrolling the album content
- Expand the file types allowed for upload (perhaps even short videos). This would require tighter file size validation and perhaps file manipulation on the backend such as changing the resolution for efficient storage of large files.
- Allow account creation enabling users to upload content to their profiles adding Instagram like functionalities such as sharing and commenting on content. This would require something like adding a "User" and "Comment" object in the database that linked to the specific content in addition to session security using HTTP-only cookies.

