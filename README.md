# Web Development Project 6 - Data Dashboard Part 2

Submitted by: **Jehu Emilcar**

This web app: 

A React data dashboard built around the Jujutsu Kaisen universe, pulling live character data from the [JJK API](https://api.jujutsukaisenapi.site/api/v1). Features a dark cinematic UI with character filtering, data visualizations, and detailed character profiles.


Time spent: **3** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on an item in the dashboard list navigates to a detail view for that item
  - Detail view includes extra information about the item not included in the dashboard view
  - The same sidebar is displayed in detail view as in dashboard view
  - *To ensure an accurate grade, your sidebar **must** be viewable when showing the details view in your recording.*
- [x] **Each detail view of an item has a direct, unique URL link to that item’s detail view page**
  -  *To ensure an accurate grade, the URL/address bar of your web browser **must** be viewable in your recording.*
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - At least two charts should be incorporated into the dashboard view of the site
  - Each chart should describe a different aspect of the dataset


The following **optional** features are implemented:

- [ ] The site’s customized dashboard contains more content that explains what is interesting about the data 
  - e.g., an additional description, graph annotation, suggestion for which filters to use, or an additional page that explains more about the data
- [ ] The site allows users to toggle between different data visualizations
  - User should be able to use some mechanism to toggle between displaying and hiding visualizations 

  
The following **additional** features are implemented:

* [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented user stories: https://www.loom.com/share/0806b8dd24a441e98d0010ce76830970

# Gif

![Kapture 2026-04-12 at 21 35 43](https://github.com/user-attachments/assets/bf06c415-b8eb-44a5-b84a-dcbe2a752134)


## Notes

One of the main challenges was migrating the Part 1 project into a new GitHub repository without losing the existing git history. The remote origin had to be manually removed and reassigned to the new repo before pushing.

Setting up React Router required restructuring App.jsx to separate the dashboard logic into its own component, so that the sidebar and routes could share the same layout wrapper without re-fetching data on navigation.

Integrating Recharts was straightforward, but building the chart data required reducing the raw character array into grouped objects by grade and status before passing it to the chart components.

The JJK API does not return a description field for most characters, so the detail view was designed to surface all other available data fields such as aliases, affiliation, domain expansion, and the full cursed techniques list to ensure the detail page felt meaningfully different from the dashboard.

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
