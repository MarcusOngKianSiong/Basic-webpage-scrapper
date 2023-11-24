#Basic web scrapping tool#

**Problem:**
Extracting all 87 events from a webpage manually is too time consuming. I need a faster and reusable solution.


**Components:**
1. Execution
2. Pattern analysis


**Usage Steps:**
1. Download the HTML of the webpage
2. Figure out a pattern around the data of interest
    *e.g. all names are held in a bold tag, and there is only one bold tag in the entire html page.*
3. Input the pattern as a regex into the parameters of the init.js file
4. Run the init file
5. Look at output.txt in output folder to view scrapped data


**Assumptions:**
1. The set of regex represents a single row of data
2. Every single regex column in a row has a data to it.
3. You need two different regex to extract the data 
    - Identify the line
    - Identify the area within the line


**Improvements:**
    1. Execution
        - Identifying the line is done by identifying the line above it, then look down one index. 
            e.g. 
                Condition -> // sourceOrg: `(.+)<div class="mb-3" style="background-color:LightSalmon;border-radius:10px;text-align:center">$`,
                **HTML** -> 
                    <div class="mb-3" style="background-color:LightSalmon;border-radius:10px;text-align:center">
                    <b>Google</b> </div>
        - What if a single cell data has a comma?
            - Clash with the way the data is structured. 
                - Comma separated data, -> VERSUS -> comma in data
    2. Pattern analysis
        Definite:
        Maybe:
            - A way to check if your regex is correct on a small scale

**Concerns:**
    1. Current assumption: Every single regex specified have a match on each iteration. 
        - Problem: What if only some has it?

