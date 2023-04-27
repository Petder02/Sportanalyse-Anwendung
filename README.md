# Sportanalyse-Anwendung für die Auswertung von Sportdaten.
## About
Created by: Fatih Gurbuz, Gabriel Kwock, Justin Kocur, Nhien Phan, Peter Schlueter, and Vikranth Mallikarjun

#### Purpose:

Football, baseball, and basketball are three of the most popular sports in the USA with millions of followers for each of them. Given the immense popularity of these sports, there is a huge demand for fans of each team to keep track of the information regarding their team and players, many of which would also love to compare their team to others. Our application would allow the user to retrieve the statistics of their favorite teams (including performance information of  each individual member of the team). Our application can also perform comparative analysis between teams to predict what competitive advantages one team has over another (both user-specified) in the case of a head-to-head match - a feature which would be enjoyed by many sports fans, sports betters, and fantasy players. For sports players in lower-level leagues (e.g., high school and college level sports), our application would allow them to customize their input data of their own team and use it to compare with professional teams. We expect this would serve as a form of benchmark suggestions for high school and college teams to make improvements in both their training and planning.


## How to Use the Application
To use the application, open this [link](https://gleaming-conkies-bef6e0.netlify.app/).

1. When you've clicked the link above, it'll take you to the home page of the application.
2. Click the sport you want to analyze (American Football, Basketball, and Baseball).
3. Check the box to insert as many players* (or teams) that you want to compare. (You may search for the player's name, team, position, season, or various stats)
4. Click "Generate CSV from Selected Data" (This will download a CSV onto your local device)
5. Below the player data, there is a section called "1. Load your data" and upload the CSV generated in step 4. 
6. Once the data has been uploaded, you can select the chart type (e.g. bar graph, line chart, etc.)
7. Next, you may select the variables for each section. Make sure to fill the mandatory sections with suitable data (ex. add number data to sections where it requires numbers)
8. Finally, you may customize the chart's characteristics to your desire. You may save and download this chart.

*Note: Player's data is divided by seasons, so if you want to compare an athlete's stats over the years, you'll need to select multiple years for the same athelete.


## Usage

yarn install

yarn start

### Requirements

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) (it could be used through the interface of [GitHub Desktop](https://desktop.github.com/))
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started/install)