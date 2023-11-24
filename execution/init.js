const path = require('path')

require('./settings.js')
require('./globalUtilities.js')
require('./scrappingOperations.js')

// MODIFY PROGRAM PARAMETERS
regexPattern = {
    // Write your regexes that defines the line that stores your regex
    title: `^(.+)h5 class="card-title"(.+)$`,
    link: `^(.+)data-bs-link="https://(.+)$`,
    date: `(.+)Register by: (.*)`
};
dataExtractionRegex = {
    // Write the specific regex that the data is between here. 
    title: `.*>(.*)</.*`,
    link: `.*data-bs-link="(.*)">.*`,
    date: `.*Register by: (.*)</.*`
};
filePath = path.join(__dirname,"..","html_location","testHTML.html");



scrap()
