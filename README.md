# Web Development Project 5 - Data Dashboard Part 1

Submitted by: Jehu Emilcar

This web app: **insert description**

Time spent: 2 hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard should display at least 10 unique items, one per row
  - The dashboard includes at least two features in each row
- [x] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data** 
  - The app dashboard includes at least three summary statistics about the data, such as:
    - *insert details here*
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query
  - The list of results dynamically updates as the user types into the search bar
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a **different attribute** than the search bar 
  - The filter **correctly** filters items in the list, only displaying items matching the filter attribute in the dashboard
  - The dashboard list dynamically updates as the user adjusts the filter

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously
- [x] Filters use different input types
  - e.g., as a text input, a dropdown or radio selection, and/or a slider
- [x] The user can enter specific bounds for filter values

The following **additional** features are implemented:

* [x] List anything else that you added to improve the site's functionality:

- Background image from Jujutsu Kaisen artwork for immersive cinematic atmosphere
- Character profile images displayed as circular avatars in the table
- Domain Expansion data shown alongside each character (name + 🌀 icon)
- Full cursed techniques list per character (up to 3 shown with ... indicator)
- Character aliases displayed in italics next to each name
- 4 summary stat cards (Total Characters, Special Grades, Domain Expansions, Still Alive)
- Three filters working simultaneously (name search + grade dropdown + status radio buttons)
- Grade badges color-coded by rank (Special Grade = red, Grade 1 = purple, etc.)
- Deceased characters highlighted in red in the status column
- Custom Orbitron sci-fi font for the header
- Student name and ID displayed in the header

## Video Walkthrough

https://www.loom.com/share/6dd0eac20a9f4942b7bbb3c2d49f0667

# Gif



## Notes

One of the main challenges was determining the correct API base URL. 
The documentation site used a different URL than the actual API endpoint, 
which caused fetch errors early on. The working base URL turned out to be 
https://api.jujutsukaisenapi.site instead of https://jujutsukaisenapi.site.

Another challenge was that the API returns relational data using IDs 
(e.g. gradeId, statusId), but the expanded response actually included 
full objects with names, which simplified the data mapping significantly.

Implementing three simultaneous filters (search, grade dropdown, and 
status radio buttons) required careful chaining of .filter() methods 
to ensure all conditions applied together correctly.

## License

    Copyright [2026] [Jehu Emilcar]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
