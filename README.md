# Hococo Posts Exercise

## What's Implemented ✅

### Core Requirements

- **✅ Posts List Display**
- **✅ Pagination (20 items per chunk)**
- **✅ Infinite Scrolling**: Implemented with Quasar's `QInfiniteScroll` component
- **✅ Add Post Functionality**: Modal dialog with form validation
- **✅ Edit Post Functionality**: Modal dialog pre-populated with existing post data
- **✅ Error Handling**: API error notifications

## What's NOT Implemented ❌

* **Search functionality** - For search functionality, I would use the `/posts/search` endpoint and add a query method
  parameter. I think it makes sense to save the search query in the actual page URL so users can share links to the
  search results. I would update the route query parameter and local variable, reset the infinite scroll index, and
  trigger it to reload. When the page is initially loaded, check if there is a search query in the URL. Similar approach
  would work with sort order and pagination.

* **Display tags** - I would add router links for each tag in post.tags to allow filtering by clicking on tags

* **Display post stats** - I would add icons with counter for views/likes/dislikes in the post cards

* **Sort options and filters** - Similar to search, I would use URL query parameters to maintain state and allow sharing
  of filtered/sorted results

## Setup

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Run Development Server

```bash
quasar dev
# or
npm run dev
```

## Environment Variables

- `VITE_API_BASE_URL`: API base URL (defaults to https://dummyjson.com)
