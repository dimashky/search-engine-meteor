# Simple Search Engine
Simple Search engine for .docx files written in meteor and Vue.

This project was a homework in my university [Syrian Virtual University](https://svuis.svuonline.org/SVUIS/index.php "Syrian Virtual University Homepage") in Advanced Information Retrieval Course.

The corpos uploaded within the repo inside `storage/docs` directory

## Prerequest
Make sure you have installed meteor in your machine [here](https://www.meteor.com/developers/install).

## How to run
Install the packages first:
```
npm install
```
Run meteor
```
npm run start
```

## Indexing 
To index the corpus you can use `meteor shell` (see the [docs](https://docs.meteor.com/commandline.html#meteorshell))
```
meteor sheel
```
Then call 
```
Meteor.call("createIndices")
```
