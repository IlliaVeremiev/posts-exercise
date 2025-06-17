// This is just an example,
// so you can safely delete all default props below

export default {
  posts: {
    pageTitle: 'Posts',
    addPostButton: 'Add post',
    createPostDialog: {
      title: 'Create New Post',
      titleLabel: 'Title',
      bodyLabel: 'Body',
      tagsLabel: 'Tags',
      userIdLabel: 'User ID',
      tagsHint: 'Type to add new tag',
      createButton: 'Create Post',
      cancelButton: 'Cancel',
      userOption: 'User {id}',
      validation: {
        titleRequired: 'Title is required',
        titleMinLength: 'Title must be at least 3 characters long',
        bodyRequired: 'Body is required',
        bodyMinLength: 'Body must be at least 3 characters long',
        userIdRequired: 'User ID is required'
      }
    },
    editPostDialog: {
      title: 'Edit Post',
      titleLabel: 'Title',
      bodyLabel: 'Body',
      tagsLabel: 'Tags',
      tagsHint: 'Type to add new tag',
      saveButton: 'Save Post',
      cancelButton: 'Cancel',
      validation: {
        titleRequired: 'Title is required',
        titleMinLength: 'Title must be at least 3 characters long',
        bodyRequired: 'Body is required',
        bodyMinLength: 'Body must be at least 3 characters long'
      }
    }
  }
};
