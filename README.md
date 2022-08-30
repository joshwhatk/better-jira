# Better JIRA

Ever wished that large Kanban boards could not be squished? Now you can set your own custom Column width for all of your cards on all of your boards.

To install, visit this link: [Chrome Web Store](https://chrome.google.com/webstore/detail/better-jira/adjlkmhgnjccbagimdppnminndehkmgl).

## Planned features:

- [x] Resizeable Detail view (via drag)
- [x] Adding a standup view to give more space
- [x] Adding a toggle to turn the extension off from within it’s menu
- [ ] Adding an intuitive interface for inputing large numbers of tickets
- [ ] Add a "Create and Open" button
- [ ] Add a new Card design that allows hovering for more detail, bigger image, etc. (perhaps paired with standup mode)
- [ ] Icon change when active/enabled
- [ ] Add card overview when on a specific card in Standup Mode.
- [x] Standup Variant (access to the filters and assignee drop downs) [add a visual element for displaying filters, remember status]
- [x] Open Github Links in a New Tab
- [x] Firefox Plugin
- [ ] Safari Plugin

## Running the code locally

> **NOTE**: You will need `node` and `yarn` set up on your computer.

Type `yarn run` into your terminal from the root of this project. It will output the available commands.

### To build the code:

You will need node version 10.9.0 and yarn installed. In the root of the project, run:

```
yarn
yarn prod
```

The source code is in the `src` directory, and the distributed code is in the the `dist` directory.
