# AGROW : Support application for Farmers
## Team Name - GREP Tribe

1. [Short description](#short-description)
1. [Demo video](#demo-video)
1. [AGROW UI Architecture](#agrow-ui-architecture)
2. [AGROW Whatsapp Bot Architecture](#agrow-whatsapp-bot-architecture)
3. [Long description](#long-description)
4. [Project roadmap](#project-roadmap)
5. [Getting started](#getting-started)
6. [Built with](#built-with)
7. [Versioning](#versioning)
8. [Contributors](#contributors)

## Short description

We propose AGROW as a solution which is a multiplatform enabled application that enables farmers to plan their yield in an efficient and cost effective manner while maximizing earnings. It is a multilingual application, available in all regional languages in India. An easy to use application, which is accessible via a Chabot and on computer browsers. It eliminates the need of downloading another app and significantly saves time by excluding call-waiting times. 

It sources most recent data from Open Government data platforms thus
Improving query resolution. AGROW considers geographical mapping and provides seasonal crop recommendations based on current market trends and prices. This in turn enables crop diversification. It will eventually be a centralized data source, which enables analytical and statistical conclusions. 

AGROW would also support some key suitability goals like No Poverty and Decent Economic Growth 

### What's the problem?

Currently there are 150 million farmers in India and Agriculture is the primary occupation of 58% of the population. However, farmers are struggling for a decent economic growth. They have very limited guidance available on several aspects like crop diversification, modern farming techniques. 

### How can technology help?

Technology can help bridge the gap between farmers and increase collaboration between them. Along with this, long waiting time for responses for Kisan Call Center can be reduced using the whatsapp bot as most of the generalised questions can be answered using the previously collected calls data.

### The idea

![AGrow Logo](https://github.com/bmk15897/agrow/blob/main/Documentation/AGrowLogo.jpeg)

## Demo video

[![Watch the video](someUrl)](someUrl)

## AGROW UI Architecture

![AGrow UI Application](https://github.com/bmk15897/agrow/blob/main/agrowFrontend/AGrowAngularUIArchitecture.png)

## AGROW Whatsapp Bot Architecture

![AGrow Whatsapp Bot](https://github.com/bmk15897/agrow/blob/main/agrowWhatsappBot/AGrowWhatsappBotArchitectureWithDescription.png)

## Long description

#### Profiles 

There are two User Profiles – Farmers and Admin. The Farmers can register through the mandatory phone OTP verification step (we are yet to implement this in real-time). Registration can also be done using our WhatsApp bot. All users will provide direct input into the system –Profile Information like basic details, locality, area of land, etc.
Farmers looking for aggregated statistics on crops can look at the visualizations provided by our application and take an informed decision for the crop to be sown. They can enter their crop details which will in turn help other farmers using the application. They can also view/update their previous crop entries as per their need. There will be complete anonymity between farmers. 
Admin can manage the users of the application.

#### Languages

Currently whatsapp bot is available in English and few of the regional languages. Meanwhile the Angular UI is available in English.

#### Sustainability

The application will be free cost for the farmers for the first 6 months (from the date of registration) so we can build a customer base. Post which we plan to charge a subscription fee for them on a half-yearly/yearly basis.

#### Go Live Approach

We will conduct awareness campaigns and training sessions across India. In order to build a database we will explore options of existing databases that contain information about farmers. Once we have data of at least 20K farmers per state we will target to roll out the application to  farmers.

## Project roadmap

![AGrow Logo](https://github.com/bmk15897/agrow/blob/main/Documentation/AGROWRoadmap.png)

## Getting started

* [AGROW UI installion steps](https://github.com/bmk15897/agrow/blob/main/agrowFrontend/README.md)
* [AGROW Whatsapp Bot installion steps](https://github.com/bmk15897/agrow/blob/main/agrowWhatsappBot/README.md)
* [AGROW Backend installion steps](https://github.com/bmk15897/agrow/blob/main/agrowBackend/README.md)


## Built with

* [IBM Cloudant](https://cloud.ibm.com/catalog/services/cloudant) - IBM Cloudant is a fully managed JSON document database that offers independent serverless scaling of provisioned throughput capacity and storage
* [IBM Watson](https://www.ibm.com/in-en/watson) - Language detection and translation tool used
* [Angular](https://angular.io/) - The web application frontend framework used
* [Flask](https://flask.palletsprojects.com/) - The Python web framework used

* [Twilio](https://www.twilio.com/) - Send and receive WhatsApp messages api used
* [Dialogflow](https://cloud.google.com/dialogflow) - The natural language understanding platform used
* [ngrok](https://ngrok.com/) - Used to expose web server
* [Data Gov Api](https://data.gov.in/) - Government Api used


* [Git](https://git-scm.com/) - The distributed version control system used


## Versioning

We used [Git](https://git-scm.com/) for versioning.

## Contributors

* **Minu Raju** - *Business Analyst*
* **Shreya Joshi** - *Developer*
* **Mehul Solanki** - *Developer*
* **Aditya Kumbhar** - *Developer*
* **Bharati Kulkarni** - *Idea initiator and Developer*

<a href="https://github.com/bmk15897/agrow/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=bmk15897/agrow" />
</a>

