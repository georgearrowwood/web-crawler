# WebCrawler

## Some desription of its behaviour and algorythm

* Starts with given domain and uri path. Fetches all links on page, fecthes all images on a page, then start parsing and getting all links and images from pages links that it found on previous and so on.
* Loading each page takes time, and there can be a lot of pages on one domain, and thats why I added an option to limit maximum number of parsed pages for testing purposes.
* Algoritm is done that way that it never looks up for same page link more than once.
* Doesn't store images more than once.
* Doesnt do any lookup in lists, and they can be very long, uses hash table instead.
* Saves parsed data of links and images in json file in the end of parsing.
* it reads all links in batches, wich is configurable.

## Execution

works as a script, to run in command line

```
node . wipro.com /
```

last two parameters are compulsory: domain name and start path.

after successful execution, file out.json will be created in a root directory

## Toolset
* Testing is done with Jest
* To parse HTML Cheerio library is used
* To fetch html axios is used (at first i used puppeteer, which is better for this task because it can render javascript as a headless browser, but was extremely slow so i have decided to use axios instead)

## Specifics of implementation

Data reader, HTML parser and Exporter are implemented as separate modules, using factory pattern. They are not coupled
with the main class but passed as dependency injection objects. This way it will be really easy to write tests and
mock any object if necessary. Also this way of implementation allows to switch to another library if desired, with
minimum efforts and minimum rewriting. Current implementation exercises abstraction from actual tool or library that is used. This ofcourse can be improved by having Typescript for example and having interfaces, to lock implementation, but this is out of time scope for this task. Also much more tests could be written.