# 10x-nerd-buddy
This is a thing that studies for US. 

NERD BUDDY scours the internet for resources related to what YOU want to study

We give NERD BUDDY a study topic (a prompt) that is used to build a study guide with resources that go IN-DEPTH about our study topic

Example Study Topic:
```
Debt Consolidation
- The history of debt
- Debt in America
- Why is debt important?
```

NERD BUDDY output (in a markdown file)
```
A list of resources to study (links to the pdfs and webpages) - summaries of each resource
- Resource 1: scholar.google.com/asdnadsjajdns 
Summary of Resource 1:
- ....
- .....

A study guide that tells me which resource is the most relevant and in order of which resources I should read and a structured guide.

Study Guide
....
```

# How this was built
This was built with [bun](bun.sh) (you could easily run with node) and llama2 (hitting the [runpod.io](runpod.io) API)

This was built during this [livestream](https://youtube.com/live/Z2CSFyZ1zVw)

# How to run the project
1) First clone the repo
```
$ git clone git@github.io:jawerty/10x-nerd-buddy.git
```

2) Install the node modules
```
$ bun install
or
$ npm install
```

3) Set up a [runpod.io](runpod.io) API_KEY in a `.env` see `.envExample` for an example

4) Run the script
```
$ bun 10x-nerd-buddy.js
```

# Thank you


