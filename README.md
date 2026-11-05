# NovPets - Pet Health Records

## Run the App!

This is a React (TypeScript) project ran on Vite.
The node version is `v24.22.2` and npm is `11.19.1`.

First, run the following command:

```shell
npm install
```

then run:

```shell
npm run dev
```

The program will start and be live at `http://localhost:5176/`

Note that if port `5176` is unavailable, Vite will automatically choose the next available port.

## About the App

**NovPets** is a hypothetical pet-focused spin-off of [Novellia](https://novellia.com), a game-changing unified health information and records platform.

I decided to code it in React + TypeScript as this is the stack I'm most familiar with. 
My goal when making the app was to not only follow the exercise prompt, but also do research
into Novellia to try and make an app that looked like an actual MVP that a Novellia engineer would make.

### Loom Video

Please watch the following video for an overview:

### Feature Overview

The app features the following pages:
- Overview
  - You can add, edit, and delete pets.
  - You can add a record to a pet directly from this page.
    - You can add records manually, either to your personal library, or tied to an external data source.
  - You can view just one pet's records by clicking on their pet card.
  - You can sync records.
    - Using mocked data and randomly generated records to mimic an API.
- Veterinary Records
  - You can add, edit, and delete records, as well as view record details by clicking on the record card.
  - You can add records manually, either to your personal library, or tied to an external data source.
  - You can search records by their name (type) or the pet's name.
  - You can filter records by one or more pets by clicking their badges.
  - You can sync records.
- Data Sources
  - You can add, edit, and delete data sources.
    - You can see your personal records as a data source. You cannot delete it.
  - You can view all records for a single data source by clicking on its card.

## Plan-of-Attack

### Review the Prompt

First was reviewing the prompt; it being open-ended in terms of what the application will look like,
I already knew that my first step would be to go Novellia's site and look at the design language.

### Review Novellia.com and Brainstorm

After digesting the prompt, I went to Novellia's site.
I particularly focused on the user paths presented on https://novellia.com/how-it-works and https://novellia.com/app-features.

I especially focused on how UI elements were laid out and how colors were used; as well as the font.

Once I had done my initial review, I had a fairly good idea of the design language Novellia used; at least on its landing pages.

I didn't want to do a complete copy, so I did not delve too deeply into the application after my initial review, beyond getting some font, colors, and border-radius values.

From here, I landed on the basic structure of pages with interactable tiles (or cards/boxes).

I also took note of the prominence of Data Sources, which I decided to implement as my extra feature.

### Plan Out a Structure

This is the app structure I came up with (note this is a repeat of "Feature Overview" above):

- Overview
  - You can add, edit, and delete pets.
    - You can see all pets and their amount of records just from here.
  - You can add a record to a pet directly from this page.
    - You can add records manually, either to your personal library, or tied to an external data source.
  - You can view just one pet's records by clicking on their pet card.
  - You can sync records.
    - Using mocked data and randomly generated records to mimic an API.
- Veterinary Records
  - You can add, edit, and delete records, as well as view record details by clicking on the record card.
  - You can add records manually, either to your personal library, or tied to an external data source.
  - You can search records by their name (type) or the pet's name.
  - You can filter records by one or more pets by clicking their badges.
  - You can sync records.
- Data Sources
  - You can add, edit, and delete data sources.
    - You can see your personal records as a data source. You cannot delete it.
  - You can view all records for a single data source by clicking on its card.

This structure also gave me clear initial types (`Pet`, `VeterinaryRecord`, and `DataSource`).

### Code with the Future In Mind

Whenever I'm coding anything, I first and foremost want to make it easily extendable.

My goal is to generalize as much as is reasonable. 
It comes with a higher upfront workload, but as the app develops, it pays off as new pages, components, and flows
are much easier to make from the initial building blocks.

For this project, that meant (as examples):
- Creating a mock service that could easily be swapped out with an API.
- Ensuring UI elements are easily reproducible and can be easily combined with on another.
- Carefully structuring out core types like `Pet`, `VeterinaryRecord`, and `DataSource` to ensure they can be used and extended without major code overhauls.
- Creating a centralized copy service to help keep track of and quickly edit displayed text.

#### Persistence

I decided to use `localStorage` in tandem with a service (`DataService`) that blackboxes it.
This is so, in theory, `localStorage` calls could easily be swapped out with actual API calls.
This limits future API source changes to just a single file, rather than across the application.

### Manage Time, Make Decisions, Cut Features

As I began coding, I knew some ideas, features, and even fixes would need to be sidelined to keep this to an MVP.

Some decisions made:
- Not using a tool like ReactRouter
  - Why: I opted to not use this because Navigation in the app is very simple. A tool like ReactRouter is very good and in a real-world MVP should absolutely be used.
- Not splitting out CSS into files or using a framework.
  - Why: It's better for organization however for an MVP, and take-home, a single file is much faster to work with.
- Not fixing most form validation issues
  - Why: I implemented very basic validation (checking a field isn't empty); more complex validation falls into a nice-to-have (so outside the scope of this MVP).
  - Example: The app does not check if a pet or data source with the same name exists (though these would have different ids).
- No Data Sources Summary or All Pets Summary
  - Context: I saw on Novellia that pages like these say the total number of records and sources in the top right corner.
  - Why: Easy to implement, but among many 'easy to implement' features, that when added together, would take too long for a take home exercise. So, I cut this along with other 'easy' tasks.
- Adding records to Data Sources directly on the Data Sources page
  - Why: Data Sources was an extra for me, and with the time I had allotted, this specific feature would have taken more time than I had to spare.

#### Personal Biggest Miss

Feature wise, I ended up coding how records handle information in a clunky way.
While they can handle multiple fields and thus show more than a simple paragraph; in the code itself I flattened these out and left a TODO on improving it.

The View Record Modal especially I feel needs a bit of design tweaking.

I also missed adding an edit and delete action to the View Record Modal. These actions can only be done from the card.

### Using Mocked Data

I knew early on I would need some way to easily generate records to visually test with. 
So I created `mockAppData.ts` to handle generating records, and in tandem with the API stand-in service (`DataService`), used them to mimic "syncing" records.

This made testing the app considerably faster!

Note: This button is not shown unless the user has at least one pet.

## Extra Feature: Data Sources

My extra feature is actually a feature present on Novellia, but was not asked for in the prompt.

**Data Sources** are fairly prominent as part of Novellia's main application, so I thought it would be good to implement them 
here as well. They provide structure for where records come from (rather than just a field on an individual record), and enable an easy
way to sync records and potentially pull in new ones.

I implemented:
- DataSource API (add, edit, delete, sync)
- Data Sources Page
- Data Source information on records.
- Go to Veterinary Records page and automatically filter for one Data Source from the Data Sources page.

## Tiny Extra: Logo <img height="40" width="40" src="/src/assets/logo.svg"/>

I made a logo <img height="30" width="30" src="/src/assets/logo.svg"/> for the site based of Novellia's logo!
I made this in a Vector Art program called Inkscape.

## Some Ideas for Improvement

- Use React Router
- Organize CSS into different files, or use a framework like Sass or Styled Component.
- Better Form Validation
- Are You Sure? Modal before deleting a record, pet, or data source.
- Adding records directly to a Data Source on the Data Source page.
- Improve modal for viewing records.

#### Authentication

Per the exercise prompt, I did not build anything to handle authentication.

However, the app is set up to assume a user with a specific ID is using it and all application information comes from the user object.

So, when adding in authentication, this app will need to talk with a service utilizing OAuth providing the
user's credentials and token; information that can easily be built into the existing User concept. 

Given this is a medical application, more stringent authentication is needed.

For example: initial user-sign up would require "3D" verification, e.g. a service like ID.me or similar.


## How I Used AI

I used AI in an assistive capacity, similar to my professional workflow.

"Assistive" to me means: using AI as a fast searching mechanism for language concepts and hard-to-find technical details.
It also can mean asking AI about a bug and seeing if its proposed solutions can resolve them.
Essentially, like a helpful and knowledgeable assistant I can ask questions to.

I used Google Gemini to get quick answers on CSS quirks, clarify hard to determine TypeScript types,
and to help create a utility function (`toTitleCase()`), which I marked as AI-modified in the code.

I did not use AI for any ideas on code structure, data flows, or design. 
Nor did I have any UI elements generated with AI.
Lastly, aside from the aforementioned utility function, all code was written by me.

# Thank You 😊!
