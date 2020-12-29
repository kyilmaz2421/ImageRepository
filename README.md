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

## SEARCH

Based on the inputted search string the system does a regex substring match on the titles and returns the relevant images posted.
